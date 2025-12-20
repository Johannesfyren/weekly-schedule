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
    const mobileView = window.innerWidth < 850; //If the screen is mobile sized, we adjust som font sizing acordingly
    const [selectedAtt, setSelectedAtt] = useState<string>("");
    const [refetchAttendees, setRefetchAttendees] = useState<boolean>(false);
    const [chosenWeekNumber, setChosenWeekNumber] = useState(
        weekNumber(new Date())
    );
    const [chosenYear, setChosenYear] = useState(new Date().getFullYear());
    const daysDate = weekToDates(chosenWeekNumber, new Date().getFullYear());
    const [favoritePerson, setFavoritePerson] = useState(
        localStorage.getItem("favoritePersonID")
    );
    const currentDayRef = useRef(null);

    //Check if weekchange exceed 52 or 1'
    useEffect(() => {
        if (chosenWeekNumber > 52) {
            setChosenWeekNumber(1);
            setChosenYear(chosenYear + 1);
        } else if (chosenWeekNumber < 1) {
            setChosenWeekNumber(52);
            setChosenYear(chosenYear - 1);
        }
    }, [chosenWeekNumber, chosenYear]);

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
                if (currentDayRef.current && mobileView) {
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
                chosenYear={chosenYear}
                chosenWeekNumber={chosenWeekNumber}
                setRefreshAttendees={setRefetchAttendees}
                favoritePerson={favoritePerson}
            />
            {console.log("Board: ", chosenYear)}
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
                    chosenYear={chosenYear}
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
                    chosenYear={chosenYear}
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
                    chosenYear={chosenYear}
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
                    chosenYear={chosenYear}
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
                    chosenYear={chosenYear}
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
                        yearFromBoard={chosenYear}
                    />,
                    document.body!
                )}
        </>
    );
}
