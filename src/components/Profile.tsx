//@ts-nocheck
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabaseClient";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
import { weekNumber } from "weeknumber";
import WeekPicker from "./WeekPicker";
import UniversalWeekPicker from "./UniversalWeekPicker";
import WeekPlanForm from "./WeekPlanForm";
import LoadingIndicator from "./LoadingIndicator";
import Star from "./Star";
import FavoritePerson from "./FavoritePerson";
import StandardWeek from "./Std-week/StandardWeek";
import AttendancePicker from "./AttendancePicker";

export type userType = {
    id: number;
    created_at: string;
    name: string;
    img_ref: string;
};

export type formType = {
    fk_user: number;
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    week: number;
    year: number;
};

export default function Profile({
    selectedAtt,
    setSelectedAtt,
    setRefetchAttendees,
    favoritePerson,
    setFavoritePerson,
    weekFromBoard,
}) {
    const date = new Date();
    const mobileView = window.innerWidth < 850; //If the screen is mobile sized, we adjust som font sizing acordingly
    const [userDetails, setUserDetails] = useState<userType>();
    const [chosenWeekNumber, setChosenWeekNumber] = useState(weekFromBoard); //Takes the week from the board
    const [collectiveFormData, setCollectiveFormData] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    const [standardWeek, setStandardWeek] = useState({
        fk_user_id: userDetails?.id,
        mon: 2,
        tue: 2,
        wed: 2,
        thu: 2,
        fri: 2,
    });
    const [showAttPicker, setShowAttPicker] = useState(false);
    const attPickerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    //Check click anywhere, and if it is inside the opened attPicker
    useEffect(() => {
        const handleRandomClick = (event: MouseEvent) => {
            if (
                showAttPicker &&
                !attPickerRef.current?.contains(event.target as Node) &&
                buttonRef.current != event.target
            ) {
                //Vi tjekker at der trykkes udenfor pop-up OG knappen (check ind/ud)
                setShowAttPicker(false);
            }
        };
        document.addEventListener("click", handleRandomClick);

        return () => {
            document.removeEventListener("click", handleRandomClick);
        };
    });

    //Lock scrolling when modal is open
    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = "hidden";

        return () => {
            // Restore scroll
            document.body.style.overflow = "";
        };
    }, []);

    // Fetch the user the Profile has been opened with
    useEffect(() => {
        const fetchUsersById = async (): Promise<userType | undefined> => {
            const { data, error } = await supabase
                .from("user")
                .select("*")
                .eq("id", selectedAtt);
            if (error) return undefined;
            setUserDetails(data && data[0]);
            setStandardWeek({ ...standardWeek, fk_user_id: data[0].id });
        };

        fetchUsersById();
    }, []);
    // Fetch the weekly checkin from the user
    useEffect(() => {
        async function fetchWeekPlan(): Promise<formType | undefined> {
            if (userDetails) {
                const { data, error } = await supabase
                    .from("attendances")
                    .select("*")
                    .eq("fk_user", userDetails?.id)
                    .eq("week", chosenWeekNumber);
                if (error) return undefined;

                //Fetch and set formData
                if (data && data.length > 0) {
                    const dbWeek = data[0];

                    // check if week already exists in state
                    setCollectiveFormData((prev) => {
                        const exists = prev.some(
                            (item) => item.week === dbWeek.week
                        );
                        if (exists) {
                            // don't replace, just return current state
                            return prev;
                        } else {
                            // append the new week object
                            return [...prev, dbWeek];
                        }
                    });
                } else {
                    const newWeek: formType = {
                        fk_user: userDetails.id,
                        created_at: new Date(),
                        mon: 3,
                        tue: 3,
                        wed: 3,
                        thu: 3,
                        fri: 3,
                        week: chosenWeekNumber,
                        year: date.getFullYear(),
                    };

                    // same check before adding
                    setCollectiveFormData((prev) => {
                        const exists = prev.some(
                            (item) => item.week === newWeek.week
                        );
                        return exists ? prev : [...prev, newWeek];
                    });
                }

                setIsLoading(false);
            }
        }

        fetchWeekPlan();
    }, [chosenWeekNumber, userDetails, selectedAtt]);

    //Update Form, user and standard week
    const handleSubmit = async () => {
        //update form
        const cleanedWeeks = collectiveFormData
            // remove empty objects
            .filter((week) => week && Object.keys(week).length > 0)
            // strip out id (let DB handle identity)
            .map(({ id, ...rest }) => rest);

        if (cleanedWeeks.length === 0) {
            return;
        }

        //  Upsert into Supabase
        const { data, error } = await supabase
            .from("attendances")
            .upsert(cleanedWeeks, {
                onConflict: ["fk_user", "year", "week"], // match your unique constraint
            });

        //  Handle result
        if (error) {
            console.error("❌ Upsert failed:", error);
            toast.error("Noget gik galt da du gemte. Prøv igen");
        } else {
            // TODO: Alert component showing which weeks are comitted
            toast.success(`Opdateringer gemt`);
        }

        //Update changes made to the user
        const { error: userError } = await supabase
            .from("user")
            .upsert(userDetails);
        if (error) {
            console.log(error);
        }
        //Save standard weeks if any changes are made
        const { data: dataStandardWeek, error: errorStandardWeek } =
            await supabase.from("standard_weeks").upsert(standardWeek);

        if (error) console.log(error);
    };

    return (
        <div
            className="profile-container-bg "
            style={mobileView ? { position: "fixed", top: "0" } : {}} // hard to click on ios
        >
            <div
                className="profile-container hide-scrollbar"
                style={
                    mobileView
                        ? {
                              marginTop: "30%",
                              marginBottom: "30%",
                              height: "500px",
                          }
                        : {}
                }
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "rgba(6, 6, 148, 0.238)",
                        alignItems: "center",
                        padding: "0 10px 0 0",
                        overflow: "visible",
                    }}
                >
                    <div className="profile-details">
                        <ProfileImage
                            name={userDetails?.name}
                            imgUrl={userDetails?.img_ref}
                            id={userDetails?.id}
                        />
                        <h2
                            style={{ fontSize: mobileView ? "1rem" : "1.5rem" }}
                        >
                            {userDetails?.name}
                        </h2>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            padding: "10px",
                        }}
                    >
                        <div>
                            <Button
                                clickEvent={() => {
                                    showAttPicker
                                        ? setShowAttPicker(false)
                                        : setShowAttPicker(true);
                                }}
                                name={mobileView ? "" : "Skift bruger"}
                                type="Secondary"
                                iconName="switch-user.svg"
                                btnRef={buttonRef}
                            />

                            {showAttPicker && (
                                <AttendancePicker
                                    attPickerRef={attPickerRef}
                                    setSelectedAtt={setSelectedAtt}
                                    setShowAttPicker={setShowAttPicker}
                                    customPlacement={{
                                        top: "160px",
                                        right: "14%",
                                    }}
                                />
                            )}
                        </div>

                        <FavoritePerson
                            id={userDetails?.id}
                            visibleWhenUnchecked={true}
                            setFavoritePerson={setFavoritePerson}
                            favoritePerson={favoritePerson}
                        />
                    </div>
                </div>

                <div className="submit-details">
                    <UniversalWeekPicker
                        chosenWeekNumber={chosenWeekNumber}
                        setChosenWeekNumber={setChosenWeekNumber}
                        setIsLoading={setIsLoading}
                    />
                    {userDetails && (
                        <StandardWeek
                            userDetails={userDetails}
                            setUserDetails={setUserDetails}
                            standardWeek={standardWeek}
                            setStandardWeek={setStandardWeek}
                        />
                    )}

                    <WeekPlanForm
                        isLoading={isLoading}
                        setCollectiveFormData={setCollectiveFormData}
                        collectiveFormData={collectiveFormData}
                        chosenWeekNumber={chosenWeekNumber}
                    />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignSelf: "flex-end",
                        }}
                    >
                        <Button
                            type="Secondary"
                            clickEvent={() => {
                                setSelectedAtt("");
                            }}
                            name="Annullér"
                        />
                        <Button
                            type="Primary"
                            name="Gem & luk"
                            clickEvent={(e) => {
                                e.preventDefault();
                                handleSubmit();
                                setRefetchAttendees(true);
                                setSelectedAtt("");
                            }}
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
