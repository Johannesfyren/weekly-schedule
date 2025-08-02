//@ts-nocheck
import Day from "./Day";
import Ribbon from "./Ribbon";
import { createPortal } from "react-dom";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { weekNumber } from "weeknumber";

export default function Board() {
    const [day, setDay] = useState(new Date().getDay());
    const [selectedAtt, setSelectedAtt] = useState<string>("");
    const [refetchAttendees, setRefetchAttendees] = useState<boolean>(false);
    const [chosenWeekNumber, setChosenWeekNumber] = useState(
        weekNumber(new Date())
    );

    useEffect(() => {
        // Tjekker hvilken dag det er hver time
        const timeOut = setInterval(() => {
            setDay(new Date().getDay());
        }, 3600000); //1 time

        return () => clearInterval(timeOut);
    }, [refetchAttendees, chosenWeekNumber]);
    return (
        <>
            <Ribbon
                setSelectedAtt={setSelectedAtt}
                setChosenWeekNumber={setChosenWeekNumber}
                chosenWeekNumber={chosenWeekNumber}
                setRefreshAttendees={setRefetchAttendees}
            />

            <div className="board">
                <Day
                    dayName={"Mandag"}
                    dayDBName={"mon"}
                    currentDay={day == 1 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                ></Day>
                <Day
                    dayName={"Tirsdag"}
                    dayDBName={"tue"}
                    currentDay={day == 2 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                ></Day>
                <Day
                    dayName={"Onsdag"}
                    dayDBName={"wed"}
                    currentDay={day == 3 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                ></Day>
                <Day
                    dayName={"Torsdag"}
                    dayDBName={"thu"}
                    currentDay={day == 4 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                ></Day>
                <Day
                    dayName={"Fredag"}
                    dayDBName={"fri"}
                    currentDay={day == 5 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                ></Day>
            </div>
            {selectedAtt &&
                createPortal(
                    <Profile
                        userName={selectedAtt}
                        setSelectedAtt={setSelectedAtt}
                        setRefetchAttendees={setRefetchAttendees}
                    />,
                    document.body!
                )}
        </>
    );
}
