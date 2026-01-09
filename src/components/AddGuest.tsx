import Button from "./Button";
import plusFaded from "../assets/plus-faded.svg";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function AddGuest({ week, inheritedDay }) {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");

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

        // const insertedUser = insertedUsers[0];
        // const userId = insertedUser.id;
        // const { data, error } = await supabase.from("attendances").upsert(
        //     {
        //         fk_user: userId,
        //         year: new Date().getFullYear(),
        //         week: week,
        //         [inheritedDay]: 1,
        //     },
        //     { onConflict: ["fk_user", "year", "week"] }
        // );
        console.log("data: ", insertedUsers, "error: ", insertedUserError);
    };

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
                onClick={() => setEditMode(true)}
            >
                {editMode && (
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <input onChange={(e) => setName(e.target.value)} />
                        <div
                            style={{
                                width: "20%",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveGuest();
                                }}
                            >
                                ✔️
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setEditMode(false);
                                }}
                            >
                                ❌
                            </button>
                        </div>
                    </div>
                )}
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
