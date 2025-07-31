import Day from "./Day";
import Ribbon from "./Ribbon";
import { createPortal } from "react-dom";
import Profile from "./Profile";
import { useState } from "react";
import { weekNumber } from "weeknumber";

export default function Board() {
    const date = new Date().getDay();
    const [selectedAtt, setSelectedAtt] = useState<string>("");
    const [refetchAttendees, setRefetchAttendees] = useState<boolean>(false);
    const [chosenWeekNumber, setChosenWeekNumber] = useState(
        weekNumber(new Date())
    );

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
                    currentDay={date == 1 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                ></Day>
                <Day
                    dayName={"Tirsdag"}
                    dayDBName={"tue"}
                    currentDay={date == 2 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                ></Day>
                <Day
                    dayName={"Onsdag"}
                    dayDBName={"wed"}
                    currentDay={date == 3 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                ></Day>
                <Day
                    dayName={"Torsdag"}
                    dayDBName={"thu"}
                    currentDay={date == 4 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                ></Day>
                <Day
                    dayName={"Fredag"}
                    dayDBName={"fri"}
                    currentDay={date == 5 ? true : false}
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
