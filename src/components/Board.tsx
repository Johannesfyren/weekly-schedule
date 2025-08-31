//@ts-nocheck
import Day from "./Day";
import Ribbon from "./Ribbon";
import { createPortal } from "react-dom";
import Profile from "./Profile";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { weekNumber } from "weeknumber";
import { weekToDates } from "../utils/getWeekDatesFromWeek";

export default function Board() {
    const [day, setDay] = useState(new Date().getDay());
    const [selectedAtt, setSelectedAtt] = useState<string>("");
    const [refetchAttendees, setRefetchAttendees] = useState<boolean>(false);
    const [chosenWeekNumber, setChosenWeekNumber] = useState(
        weekNumber(new Date())
    );

    const daysDate = weekToDates(chosenWeekNumber, new Date().getFullYear());
    const [favoritePerson, setFavoritePerson] = useState(
        localStorage.getItem("favoritePersonID")
    );
    const currentDayRef = useRef(null);

    useEffect(() => {
        // Tjekker hvilken dag det er hver time
        const timeOut = setInterval(() => {
            setDay(new Date().getDay());
        }, 3600000); //1 time

        return () => clearInterval(timeOut);
    }, [refetchAttendees, chosenWeekNumber]);

    useEffect(() => {
        // Autoscrolling efter 1,2 sekund, hvor alle elementer burde være loaded
        const timeOut = setTimeout(() => {
            {
                if (currentDayRef.current) {
                    currentDayRef.current.scrollIntoView({
                        block: "nearest",
                        inline: "nearest",
                        behavior: "smooth",
                    });
                }
            }
        }, 1200);

        return () => clearTimeout(timeOut);
    }, []);

    return (
        <>
            <Ribbon
                setSelectedAtt={setSelectedAtt}
                setChosenWeekNumber={setChosenWeekNumber}
                chosenWeekNumber={chosenWeekNumber}
                setRefreshAttendees={setRefetchAttendees}
                favoritePerson={favoritePerson}
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
                    daysDate={daysDate.mon}
                    elementRef={day == 1 ? currentDayRef : undefined}
                ></Day>
                <Day
                    dayName={"Tirsdag"}
                    dayDBName={"tue"}
                    currentDay={day == 2 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                    daysDate={daysDate.tue}
                    elementRef={day == 2 ? currentDayRef : undefined}
                ></Day>
                <Day
                    dayName={"Onsdag"}
                    dayDBName={"wed"}
                    currentDay={day == 3 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                    daysDate={daysDate.wed}
                    elementRef={day == 3 ? currentDayRef : undefined}
                ></Day>
                <Day
                    dayName={"Torsdag"}
                    dayDBName={"thu"}
                    currentDay={day == 4 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                    daysDate={daysDate.thu}
                    elementRef={day == 4 ? currentDayRef : undefined}
                ></Day>
                <Day
                    dayName={"Fredag"}
                    dayDBName={"fri"}
                    currentDay={day == 5 ? true : false}
                    refetchAttendees={refetchAttendees}
                    setRefetchAttendees={setRefetchAttendees}
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                    daysDate={daysDate.fri}
                    elementRef={day == 5 ? currentDayRef : undefined}
                ></Day>
            </div>
            {selectedAtt &&
                createPortal(
                    <Profile
                        key={selectedAtt}
                        selectedAtt={selectedAtt}
                        setSelectedAtt={setSelectedAtt}
                        setRefetchAttendees={setRefetchAttendees}
                        favoritePerson={favoritePerson}
                        setFavoritePerson={setFavoritePerson}
                        weekFromBoard={chosenWeekNumber}
                    />,
                    document.body!
                )}
        </>
    );
}
