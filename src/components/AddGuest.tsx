//@ts-nocheck
import plusFaded from "../assets/plus-faded.svg";
import checkmark from "../assets/checkmark.svg";
import cross from "../assets/cross.svg";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function AddGuest({ week, inheritedDay, setRefetchAttendees }) {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const inputRef = useRef(null);

    const handleSaveGuest = async () => {
        const { data: insertedUsers, error: insertedUserError } = await supabase
            .from("guests")
            .insert({
                guest_name: name,
                day: inheritedDay,
                week: week,
                year: new Date().getFullYear(),
            })
            .select();

        setRefetchAttendees(true);
    };
    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editMode]);

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                marginTop: "10px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                }}
                onClick={() => {
                    setEditMode(true);
                }}
            >
                {/* only shown when editmode is on - for Ref sake */}
                <div
                    style={{
                        gap: "10px",
                        display: editMode ? "flex" : "none",
                    }}
                >
                    <input
                        ref={inputRef}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            backgroundColor: "#00000054",
                            borderStyle: "none",
                            border: "1px solid #85731cff",
                            borderRadius: "5px",
                            color: "white",
                        }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                handleSaveGuest();
                                setEditMode(false);
                            }
                            if (e.key == "Escape") {
                                setEditMode(false);
                            }
                        }}
                    />
                    <div
                        style={{
                            width: "20%",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSaveGuest();
                                setEditMode(false);
                            }}
                        >
                            <img width={"20px"} src={checkmark} alt="" />
                        </div>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditMode(false);
                            }}
                        >
                            <img width={"20px"} src={cross} alt="" />
                        </div>
                    </div>
                </div>

                {!editMode && (
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                        }}
                    >
                        <img src={plusFaded} width={"16px"} alt="" />
                        <p style={{ color: "#ffffff59" }}>Tilføj gæst</p>
                    </div>
                )}
            </div>
        </div>
    );
}
