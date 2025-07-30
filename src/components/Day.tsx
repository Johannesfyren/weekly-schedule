import Attendance from "./Attendance";
import { weekNumber } from "weeknumber";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { motion, stagger } from "motion/react";

import Attnumber from "./AttNumber";
type dayType = {
    dayName: string;
    currentDay: boolean;
    dayDBName: string;
    refetchAttendees: boolean;
    setRefetchAttendees: React.Dispatch<React.SetStateAction<boolean>>;
    chosenWeekNumber: number;
    setChosenWeekNumber: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Day({
    dayName,
    currentDay,
    dayDBName,
    refetchAttendees,
    setRefetchAttendees,
    chosenWeekNumber,
    setChosenWeekNumber,
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
            .eq("week", chosenWeekNumber)
            .eq("year", date.getFullYear())
            .order(`user("name")`, { ascending: true });

        if (error) return undefined;
        console.log(data);
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
    }, [refetchAttendees, chosenWeekNumber]);

    return (
        <div
            className={
                currentDay ? "day-container current-day" : "day-container"
            }
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h2>{dayName}</h2>
                <Attnumber numberOfAttendees={attendees && attendees.length} />
                {/* <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                        backgroundColor: "white",
                        padding: "2px 5px",
                        borderRadius: "5px",
                        marginRight: "10px",
                    }}
                >
                    <img style={{ width: "20px" }} src={attIcon} alt="" />
                    <p
                        style={{
                            color: "#300276",
                            fontWeight: "700",
                            fontSize: "1.1rem",
                        }}
                    >
                        {attendees && attendees.length}
                    </p>
                </div> */}
            </div>

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
