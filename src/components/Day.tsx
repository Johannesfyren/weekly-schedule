import Attendance from "./Attendance";
import { weekNumber } from "weeknumber";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { motion, stagger } from "motion/react";
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
            .eq("year", date.getFullYear())
            .order(`user("name")`, { ascending: true });

        if (error) return undefined;

        setAttendees(data && data);
    }

    useEffect(() => {
        fetchAttendances();
        const timeOut = setInterval(() => {
            console.log("fetching");
            fetchAttendances();
        }, 900000); //15 min
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

            <motion.div className="attendances-container">
                {attendees &&
                    attendees.map((att, index) => (
                        <Attendance
                            name={att.user.name}
                            key={index}
                            imgUrl={att.user.img_ref}
                            refetchAttendees={refetchAttendees}
                        />
                    ))}
            </motion.div>
        </div>
    );
}
