//@ts-nocheck
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import ProfileImage from "./ProfileImage";
import Button from "./Button";

import { weekNumber } from "weeknumber";
import WeekPicker from "./WeekPicker";
import UniversalWeekPicker from "./UniversalWeekPicker";
import WeekPlanForm from "./WeekPlanForm";

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
    userName,
    setSelectedAtt,
    setRefetchAttendees,
}) {
    const date = new Date();
    const [userDetails, setUserDetails] = useState<userType>();
    const [chosenWeekNumber, setChosenWeekNumber] = useState(
        weekNumber(new Date())
    );
    const [formData, setFormData] = useState<formType>();

    useEffect(() => {
        async function fetchUsers(): Promise<userType | undefined> {
            const { data, error } = await supabase
                .from("user")
                .select("*")
                .eq("name", userName);
            if (error) return undefined;
            setUserDetails(data && data[0]);
        }

        fetchUsers();
    }, []);

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
            }
        }

        fetchWeekPlan();
    }, [chosenWeekNumber, userDetails]);

    const handleSubmit = async () => {
        const { error } = await supabase.from("attendances").upsert(formData);
        if (error) {
            console.log(error);
        } else {
        }
    };

    return (
        <div className="profile-container-bg">
            <div className="profile-container hide-scrollbar">
                <div className="profile-details">
                    <ProfileImage
                        name={userDetails?.name}
                        imgUrl={userDetails?.img_ref}
                        id={userDetails?.id}
                    />
                    <h2>{userDetails?.name}</h2>
                </div>

                <div className="submit-details">
                    <UniversalWeekPicker
                        chosenWeekNumber={chosenWeekNumber}
                        setChosenWeekNumber={setChosenWeekNumber}
                        setIsLoading={() => console.log("yo")}
                    />
                    <WeekPlanForm
                        setFormData={setFormData}
                        formData={formData}
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
                            clickEvent={() => setSelectedAtt("")}
                            name="Annullér"
                        />
                        <Button
                            type="Primary"
                            name="Gem og luk"
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
