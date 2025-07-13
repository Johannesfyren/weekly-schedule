import type { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";
import Attendance from "./Attendance";
import { useEffect, useState } from "react";

export type attPickerRefType = {
    attPickerRef: React.Ref<HTMLDivElement>;
};
export default function AttendancePicker({ attPickerRef }: attPickerRefType) {
    const [userData, setUserData] = useState<User[] | null>(null);
    useEffect(() => {
        async function hello() {
            const { data, error } = await supabase.from("user").select("*");
            if (error) console.log("error: ", error);
            setUserData(data);
        }
        hello();
    }, []);
    useEffect(() => {
        async function fetchImage() {
            const { data, error } = await supabase.storage.listBuckets();
            if (error) console.log(error);
            console.log(data);
        }
        fetchImage();
    }, []);

    return (
        <div className="att-picker-container" ref={attPickerRef}>
            {userData?.length > 0 &&
                userData.map((user) => {
                    return <Attendance name={user.name} key={user.id} />;
                })}
        </div>
    );
}
