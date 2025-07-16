import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Attendance from "./Attendance";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
export type userType = {
    id: number;
    created_at: string;
    name: string;
    img_ref: string;
};
export default function Profile({ userName, setSelectedAtt }) {
    const [userDetails, setUserDetails] = useState<userType>();

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

    return (
        <div className="profile-container-bg">
            <div className="profile-container">
                <div className="profile-details">
                    <ProfileImage
                        name={userDetails?.name}
                        imgUrl={"imageTest.png"}
                    />
                    <h2>{userDetails?.name}</h2>
                    <Button
                        type="Secondary"
                        clickEvent={() => setSelectedAtt("")}
                        name="Luk"
                    />
                </div>
            </div>
        </div>
    );
}
