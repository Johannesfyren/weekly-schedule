import Button from "./Button";
import { useEffect, useState, useRef } from "react";
import AttendancePicker from "./AttendancePicker";
import { createPortal } from "react-dom";
import MenuPlan from "./MenuPlan";
import UniversalWeekPicker from "./UniversalWeekPicker";

export type ribbonType = {
    setSelectedAtt?: (name: string) => void;
    chosenWeekNumber: number;
    setChosenWeekNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function Ribbon({
    setSelectedAtt,
    chosenWeekNumber,
    setChosenWeekNumber,
}: ribbonType) {
    const [showAttPicker, setShowAttPicker] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const attPickerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

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
        <div className="ribbon">
            <h1>SSD Madplan</h1>
            <UniversalWeekPicker
                chosenWeekNumber={chosenWeekNumber}
                setChosenWeekNumber={setChosenWeekNumber}
                size="small"
            />
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <Button
                    clickEvent={() =>
                        showAttPicker
                            ? setShowAttPicker(false)
                            : setShowAttPicker(true)
                    }
                    name="Check ind/ud"
                    type="Secondary"
                    iconName="filled-checkin-icon.svg"
                    btnRef={buttonRef}
                />
                <Button
                    clickEvent={() => setMenuOpen(true)}
                    name="Opret madplan"
                    type="Secondary"
                    iconName="filled-food-icon.svg"
                />
            </div>

            {showAttPicker && (
                <AttendancePicker
                    attPickerRef={attPickerRef}
                    setSelectedAtt={setSelectedAtt}
                />
            )}

            {menuOpen &&
                createPortal(
                    <MenuPlan menuOpen={menuOpen} setMenuOpen={setMenuOpen} />,
                    document.body!
                )}
        </div>
    );
}
