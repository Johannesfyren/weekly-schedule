import { supabase } from "../utils/supabaseClient";
import { weekNumber } from "weeknumber";
import Button from "./Button";
import { useEffect, useState, useRef } from "react";
import AttendancePicker from "./AttendancePicker";

export type ribbonType = {
    setSelectedAtt?: (name: string) => void;
};

export default function Ribbon({ setSelectedAtt }: ribbonType) {
    const [showAttPicker, setShowAttPicker] = useState(false);
    const date = new Date();
    const attPickerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const getUsers = async () => {
        const { data, error } = await supabase.from("user").select("*");
        if (error) console.log("error: ", error);
        console.log(data);
    };

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
            <h2>Uge {weekNumber(new Date())}</h2>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <Button
                    clickEvent={() =>
                        showAttPicker
                            ? setShowAttPicker(false)
                            : setShowAttPicker(true)
                    }
                    name="Check ind/ud"
                    type="Secondary"
                    iconName="trash2.svg"
                    btnRef={buttonRef}
                />
                <Button
                    clickEvent={getUsers}
                    name="Opret madplan"
                    type="Secondary"
                    iconName="trash2.svg"
                />
            </div>

            {showAttPicker && (
                <AttendancePicker
                    attPickerRef={attPickerRef}
                    setSelectedAtt={setSelectedAtt}
                />
            )}
        </div>
    );
}
