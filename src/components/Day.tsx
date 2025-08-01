//@ts-nocheck
import Attendance from "./Attendance";
import { weekNumber } from "weeknumber";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { motion, stagger } from "motion/react";
import attIcon from "../assets/people-icon.svg";
import DailyMenuCard from "./DailyMenuCard";
import LoadingIndicator from "./LoadingIndicator";

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
    const [isLoading, setIsLoading] = useState(true);
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
        setAttendees(data && data);
        setIsLoading(false);
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
                <Attnumber
                    icon={attIcon}
                    numberOfAttendees={attendees && attendees.length}
                />
            </div>

            {isLoading && <LoadingIndicator />}

            {!isLoading && (
                <>
                    <DailyMenuCard
                        dayDBName={dayDBName}
                        weekNumber={chosenWeekNumber}
                        year={new Date().getFullYear()}
                        refetchAttendees={refetchAttendees}
                    />

                    <motion.div className="attendances-container">
                        {attendees &&
                            attendees.map((att, index: any) => (
                                <Attendance
                                    name={att.user.name}
                                    key={index}
                                    imgUrl={att.user.img_ref}
                                    refetchAttendees={refetchAttendees}
                                />
                            ))}
                    </motion.div>
                </>
            )}
        </div>
    );
}
