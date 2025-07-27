import Day from "./Day";
import Ribbon from "./Ribbon";
import { createPortal } from "react-dom";
import Profile from "./Profile";
import { useState } from "react";

export default function Board() {
    const date = new Date().getDay();
    const [selectedAtt, setSelectedAtt] = useState<string>("");
    const [refetchAttendees, setRefetchAttendees] = useState<boolean>(false);

    return (
        <>
            <Ribbon setSelectedAtt={setSelectedAtt} />

            <div className="board">
                <Day
                    dayName={"Mandag"}
                    dayDBName={"mon"}
                    currentDay={date == 1 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                ></Day>
                <Day
                    dayName={"Tirsdag"}
                    dayDBName={"tue"}
                    currentDay={date == 2 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                ></Day>
                <Day
                    dayName={"Onsdag"}
                    dayDBName={"wed"}
                    currentDay={date == 3 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                ></Day>
                <Day
                    dayName={"Torsdag"}
                    dayDBName={"thu"}
                    currentDay={date == 4 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                ></Day>
                <Day
                    dayName={"Fredag"}
                    dayDBName={"fri"}
                    currentDay={date == 5 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
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
