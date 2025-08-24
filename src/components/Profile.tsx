//@ts-nocheck
import { useEffect, useState, useRef } from "react";
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
}) {
    console.log(selectedAtt);
    const date = new Date();
    const mobileView = window.innerWidth < 850; //If the screen is mobile sized, we adjust som font sizing acordingly
    const [userDetails, setUserDetails] = useState<userType>();
    const [chosenWeekNumber, setChosenWeekNumber] = useState(
        weekNumber(new Date())
    );
    const [formData, setFormData] = useState<formType>();
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

                if (data.length > 0) {
                    setFormData(data && data[0]);
                } else {
                    setFormData({
                        fk_user: userDetails.id,
                        mon: 3,
                        tue: 3,
                        wed: 3,
                        thu: 3,
                        fri: 3,
                        week: chosenWeekNumber,
                        year: date.getFullYear(),
                    });
                }
                setIsLoading(false);
            }
        }

        fetchWeekPlan();
    }, [chosenWeekNumber, userDetails, selectedAtt]);

    //Update Form, user and standard week
    const handleSubmit = async () => {
        //Update changes made to the weekly form
        const { error } = await supabase.from("attendances").upsert(formData);
        if (error) {
            console.log(error);
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
            // style={mobileView ? { position: "fixed", top: "0" } : {}} // hard to click on ios
        >
            <div className="profile-container hide-scrollbar">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "rgba(6, 6, 148, 0.238)",
                        alignItems: "center",
                        padding: "0 10px 0 0",
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
                            uncheckedVisibility={true}
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
                        setFormData={setFormData}
                        formData={formData}
                        isLoading={isLoading}
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
