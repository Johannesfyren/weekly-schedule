import { supabase } from "../utils/supabaseClient";
import Attendance from "./Attendance";
import { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

export type userType = {
    id: number;
    created_at: string;
    name: string;
    img_ref: string;
};

export type attPickerRefType = {
    attPickerRef: React.Ref<HTMLDivElement>;
    setSelectedAtt?: (name: string) => void;
};
export default function AttendancePicker({
    attPickerRef,
    setSelectedAtt,
}: attPickerRefType) {
    const [userData, setUserData] = useState<userType[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchUsers() {
            const { data, error } = await supabase
                .from("user")
                .select("*")
                .order("id", { ascending: true });
            if (error) console.log("error: ", error);
            setUserData(data);
            setIsLoading(false);
        }
        fetchUsers();
    }, []);

    return (
        <div className="att-picker-container" ref={attPickerRef}>
            {isLoading && <LoadingIndicator />}
            {!isLoading &&
                userData &&
                userData.length > 0 &&
                userData.map((user) => {
                    return (
                        <Attendance
                            name={user.name}
                            key={user.id}
                            canOpenProfile={true}
                            setSelectedAtt={setSelectedAtt}
                            imgUrl={user.img_ref}
                        />
                    );
                })}
        </div>
    );
}
