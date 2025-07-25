import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
import WeekPlanForm from "./WeekPlanForm";
import { weekNumber } from "weeknumber";
import WeekPicker from "./WeekPicker";

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

export default function Profile({ userName, setSelectedAtt }) {
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
                    console.log("no data...");
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
            <div className="profile-container">
                <div className="profile-details">
                    <ProfileImage
                        name={userDetails?.name}
                        imgUrl={userDetails?.img_ref}
                    />
                    <h2>{userDetails?.name}</h2>
                    <Button
                        type="Secondary"
                        clickEvent={() => setSelectedAtt("")}
                        name="Luk"
                    />
                </div>

                <div className="submit-details">
                    <WeekPicker
                        setFormData={setFormData}
                        formData={formData}
                        setChosenWeekNumber={setChosenWeekNumber}
                        chosenWeekNumber={chosenWeekNumber}
                    />
                    <WeekPlanForm
                        setFormData={setFormData}
                        formData={formData}
                    />

                    <Button
                        type="Primary"
                        name="Tilføj"
                        clickEvent={(e) => {
                            e.preventDefault();
                            handleSubmit();
                            console.log("submitted :", formData);
                        }}
                    ></Button>
                </div>
            </div>
        </div>
    );
}
