//@ts-nocheck
import Attendance from "./Attendance";
import { weekNumber } from "weeknumber";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { motion, stagger } from "motion/react";
import DailyMenuCard from "./DailyMenuCard";
import LoadingIndicator from "./LoadingIndicator";
import BirthdayAnnouncer from "./BirthdayAnnouncer";
import Attnumber from "./AttNumber";

type dayType = {
    dayName: string;
    currentDay: boolean;
    dayDBName: string;
    refetchAttendees: boolean;
    setRefetchAttendees: React.Dispatch<React.SetStateAction<boolean>>;
    chosenWeekNumber: number;
    setChosenWeekNumber: React.Dispatch<React.SetStateAction<boolean>>;
    daysDate: Date;
};

export default function Day({
    dayName,
    currentDay,
    dayDBName,
    refetchAttendees,
    setRefetchAttendees,
    chosenWeekNumber,
    setChosenWeekNumber,
    daysDate,
}: dayType) {
    const [attendees, setAttendees] = useState();
    const [selectedWeek, setSelectedWeek] = useState(weekNumber(new Date()));
    const [isLoading, setIsLoading] = useState(true);
    const [attIsClicked, setAttIsClicked] = useState(false);
    const date = new Date();

    async function fetchAttendances(): Promise<userType | undefined> {
        const { data, error } = await supabase
            .from("attendances")
            .select(
                `"mon","tue","wed","thu","fri",user("id", "name", "img_ref","birthday_date")`
            )

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
            fetchAttendances();
        }, 900000); //15 min
        setRefetchAttendees(false);

        return () => clearInterval(timeOut);
    }, [refetchAttendees, chosenWeekNumber]);

    return (
        <div
            className={
                currentDay && weekNumber(daysDate) == weekNumber(date) //checks for week is also matching, so we dont highlight a day in irrelvant week
                    ? "day-container current-day hide-scrollbar"
                    : "day-container hide-scrollbar"
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
                <h2 style={{ alignSelf: "flex-start" }}>{dayName}</h2>
                <Attnumber
                    allAttendees={attendees && attendees}
                    dayDBName={dayDBName}
                    attIsClicked={attIsClicked}
                    setAttIsClicked={setAttIsClicked}
                />
            </div>

            {isLoading && <LoadingIndicator />}

            {!isLoading && (
                <>
                    {/* <BirthdayAnnouncer daysDate={daysDate} /> */}
                    <DailyMenuCard
                        dayDBName={dayDBName}
                        weekNumber={chosenWeekNumber}
                        year={new Date().getFullYear()}
                        refetchAttendees={refetchAttendees}
                    />
                    <div className="seperator"></div>
                    <div className="attendances-container">
                        {attendees &&
                            attendees
                                .filter((att) => att[dayDBName] === 1) //the 1 represents "yes" to eating
                                .map((att, index: any) => (
                                    <Attendance
                                        name={att.user.name}
                                        key={index}
                                        imgUrl={att.user.img_ref}
                                        refetchAttendees={refetchAttendees}
                                    />
                                ))}
                    </div>
                </>
            )}
        </div>
    );
}
