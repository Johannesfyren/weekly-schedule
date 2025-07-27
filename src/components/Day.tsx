import Attendance from "./Attendance";
import { weekNumber } from "weeknumber";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

type dayType = {
    dayName: string;
    currentDay: boolean;
    dayDBName: string;
    refetchAttendees: boolean;
    setRefetchAttendees: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Day({
    dayName,
    currentDay,
    dayDBName,
    refetchAttendees,
    setRefetchAttendees,
}: dayType) {
    const [attendees, setAttendees] = useState();
    const [selectedWeek, setSelectedWeek] = useState(weekNumber(new Date()));
    const date = new Date();

    async function fetchAttendances(): Promise<userType | undefined> {
        const { data, error } = await supabase
            .from("attendances")
            .select(
                `"mon","tue","wed","thu","fri",user("id", "name", "img_ref")`
            )
            .eq(dayDBName, 1)
            .eq("week", selectedWeek)
            .eq("year", date.getFullYear());

        if (error) return undefined;
        setAttendees(data && data);
        console.log("fetching");
    }
    useEffect(() => {
        fetchAttendances();
        const timeOut = setInterval(() => {
            console.log("fetching");
            fetchAttendances();
        }, 36000);
        setRefetchAttendees(false);

        return () => clearInterval(timeOut);
    }, [refetchAttendees]);

    return (
        <div
            className={
                currentDay ? "day-container current-day" : "day-container"
            }
        >
            <h2>{dayName}</h2>

            <div className="attendances-container">
                {attendees &&
                    attendees.map((att, index) => (
                        <Attendance
                            name={att.user.name}
                            key={index}
                            imgUrl={att.user.img_ref}
                        />
                    ))}
            </div>
        </div>
    );
}
