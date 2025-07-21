import Day from "./Day";
import Ribbon from "./Ribbon";
import { createPortal } from "react-dom";
import Profile from "./Profile";
import { useState } from "react";

export default function Board() {
    const date = new Date().getDay();
    const [selectedAtt, setSelectedAtt] = useState<string>("");
    return (
        <>
            <Ribbon setSelectedAtt={setSelectedAtt} />

            <div className="board">
                <Day
                    dayName={"Mandag"}
                    dayDBName={"mon"}
                    currentDay={date == 1 ? true : false}
                ></Day>
                <Day
                    dayName={"Tirsdag"}
                    dayDBName={"fri"}
                    currentDay={date == 2 ? true : false}
                ></Day>
                <Day
                    dayName={"Onsdag"}
                    dayDBName={"wed"}
                    currentDay={date == 3 ? true : false}
                ></Day>
                <Day
                    dayName={"Torsdag"}
                    dayDBName={"thu"}
                    currentDay={date == 4 ? true : false}
                ></Day>
                <Day
                    dayName={"Fredag"}
                    dayDBName={"fri"}
                    currentDay={date == 5 ? true : false}
                ></Day>
            </div>
            {selectedAtt &&
                createPortal(
                    <Profile
                        userName={selectedAtt}
                        setSelectedAtt={setSelectedAtt}
                    />,
                    document.body!
                )}
        </>
    );
}
