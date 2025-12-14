import Button from "./Button";
import { useEffect, useState, useRef } from "react";
import AttendancePicker from "./AttendancePicker";
import { createPortal } from "react-dom";
import MenuPlan from "./MenuPlan";
import UniversalWeekPicker from "./UniversalWeekPicker";
import LogoIcon from "../assets/Logo.svg";
import EventOverview from "./Events/EventOverview";
import christmasGurland from "../assets/christmas-gurland.png";
import RecipeCollection from "./RecipeCollection";

export type ribbonType = {
    setSelectedAtt?: (name: string) => void;
    chosenWeekNumber: number;
    setChosenWeekNumber: React.Dispatch<React.SetStateAction<number>>;
    setRefreshAttendees: React.Dispatch<React.SetStateAction<boolean>>;
    favoritePerson: number;
};

export default function Ribbon({
    setSelectedAtt,
    chosenWeekNumber,
    setChosenWeekNumber,
    setRefreshAttendees,
    favoritePerson,
}: ribbonType) {
    const [showAttPicker, setShowAttPicker] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [eventContainerOpen, setEventContainerOpen] = useState(false);
    const [recipeContainerOpen, setRecipeContainerOpen] = useState(false);
    const attPickerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const mobileView = window.innerWidth < 850; //If the screen is mobile sized, we adjust som font sizing acordingly

    useEffect(() => {
        const handleRandomClick = (event: MouseEvent) => {
            if (
                showAttPicker &&
                !attPickerRef.current?.contains(event.target as Node) &&
                buttonRef.current != event.target
            ) {
                //Vi tjekker at der trykkes udenfor pop-up OG knappen (check ind/ud)
                setShowAttPicker(false);
            }
        };
        document.addEventListener("click", handleRandomClick);

        return () => {
            document.removeEventListener("click", handleRandomClick);
        };
    });

    return (
        <div
            className="ribbon"
            style={
                mobileView
                    ? {
                          position: "sticky",
                          top: "0",
                          background: "#25368C",
                          height: "60px",
                          zIndex: "2",
                      }
                    : { position: "relative" }
            }
        >
            {!mobileView && (
                <img
                    src={LogoIcon}
                    style={{
                        padding: "3px",
                        borderRadius: "5px",
                    }}
                ></img>
            )}
            <UniversalWeekPicker
                chosenWeekNumber={chosenWeekNumber}
                setChosenWeekNumber={setChosenWeekNumber}
                size="small"
            />
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                {!mobileView && (
                    <Button
                        clickEvent={() => setRecipeContainerOpen(true)}
                        name="Opskrifter"
                        type="Secondary"
                        iconName="event-icon-with-bg.svg"
                    />
                )}

                {!mobileView && (
                    <Button
                        clickEvent={() => setEventContainerOpen(true)}
                        name="Begivenheder"
                        type="Secondary"
                        iconName="event-icon-with-bg.svg"
                    />
                )}

                <Button
                    clickEvent={() => {
                        if (favoritePerson) {
                            //@ts-ignore
                            setSelectedAtt(Number(favoritePerson));
                        } else {
                            showAttPicker
                                ? setShowAttPicker(false)
                                : setShowAttPicker(true);
                        }
                    }}
                    name="Check ind/ud"
                    type="Secondary"
                    iconName="filled-checkin-icon.svg"
                    btnRef={buttonRef}
                />
                <Button
                    clickEvent={() => setMenuOpen(true)}
                    name="Opret madplan"
                    type="Secondary"
                    iconName="menu-icon-white.svg"
                />
            </div>

            {showAttPicker && (
                <AttendancePicker
                    attPickerRef={attPickerRef}
                    setSelectedAtt={setSelectedAtt}
                    setShowAttPicker={setShowAttPicker}
                />
            )}

            {menuOpen &&
                createPortal(
                    <MenuPlan
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        setRefreshAttendees={setRefreshAttendees}
                        weekFromBoard={chosenWeekNumber}
                    />,
                    document.body!
                )}

            {eventContainerOpen &&
                createPortal(
                    <EventOverview
                        eventContainerOpen={eventContainerOpen}
                        setEventContainerOpen={setEventContainerOpen}
                    />,
                    document.body!
                )}
            {recipeContainerOpen &&
                createPortal(
                    <RecipeCollection
                        recipeContainerOpen={recipeContainerOpen}
                        setRecipeContainerOpen={setRecipeContainerOpen}
                    />,
                    document.body!
                )}

            {/* CHRISTMAS EDITION (CHRISTMAS HAT) START*/}
            <div
                style={{
                    position: "absolute",
                    bottom: "0px",
                    // transform: "translate(50%,0)",
                    left: "0px",
                    width: "100%",
                    zIndex: "10000",
                    overflowX: "clip",
                }}
            >
                <img
                    src={christmasGurland}
                    alt=""
                    height={"20px"}
                    style={{
                        position: "absolute",
                        bottom: "-15px",
                    }}
                />
            </div>
            {/* CHRISTMAS EDITION (CHRISTMAS HAT) END*/}
        </div>
    );
}
