import type { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";
import Attendance from "./Attendance";
import { useEffect, useState } from "react";

export type userType = {
    id: number;
    created_at: string;
    name: string;
    img_ref: string;
};

export type attPickerRefType = {
    attPickerRef: React.Ref<HTMLDivElement>;
};
export default function AttendancePicker({ attPickerRef }: attPickerRefType) {
    const [userData, setUserData] = useState<userType[] | null>(null);
    useEffect(() => {
        async function fetchUsers() {
            const { data, error } = await supabase.from("user").select("*");
            if (error) console.log("error: ", error);
            setUserData(data);
        }
        fetchUsers();
    }, []);

    return (
        <div className="att-picker-container" ref={attPickerRef}>
            {userData &&
                userData.length > 0 &&
                userData.map((user) => {
                    return (
                        <Attendance
                            name={user.name}
                            key={user.id}
                            canOpenProfile={true}
                        />
                    );
                })}
        </div>
    );
}
