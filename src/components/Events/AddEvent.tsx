//@ts-nocheck
import { createPortal } from "react-dom";
import styles from "./event.module.css";
import Button from "../Button";
import React, { useState, type SetStateAction } from "react";
import { supabase } from "../../utils/supabaseClient";
import { toast } from "react-toastify";

export type eventType = {
    setShowAddEvent: React.Dispatch<SetStateAction<boolean>>;
    inh_eventName?: string;
    inh_eventDate?: Date;
    inh_eventDesc?: string;
    inh_id?: number;
};

export default function AddEvent({
    setShowAddEvent,
    inh_eventName,
    inh_eventDate,
    inh_eventDesc,
    inh_id,
}: eventType) {
    const [eventName, setEventName] = useState(inh_eventName && inh_eventName);
    const [eventDate, setEventDate] = useState(inh_eventDate && inh_eventDate);
    const [eventDescription, setEventDescription] = useState(
        inh_eventDesc && inh_eventDesc
    );

    const submitEvent = async () => {
        const payload: any = {
            event_name: eventName,
            date: eventDate,
            description: eventDescription,
        };

        // only include id if editing
        if (inh_id) {
            payload.id = inh_id;
        }

        const { data, error } = await supabase
            .from("events")
            .upsert(payload, { onConflict: ["id"] }); // 👈 important

        if (error)
            return toast.error("Begivenheden kunne ikke oprettes. Prøv igen");
        toast.success("Begivenheden blev gemt.");
        setShowAddEvent(false);
    };
    return createPortal(
        <div>
            {console.log(inh_id)}
            <div className={styles["event-container-bg"]}>
                <div className={styles["add-event-container"]}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            padding: "10px",
                        }}
                    >
                        <label htmlFor="name">
                            Begivenhedens navn*
                            <input
                                type="text"
                                name="name"
                                defaultValue={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </label>
                        <label htmlFor="date">
                            Dato for begivenhed*
                            <input
                                type="date"
                                name=""
                                defaultValue={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            />
                        </label>
                        <label htmlFor="desc">
                            Beskrivelse
                            <textarea
                                name="desc"
                                defaultValue={eventDescription}
                                onChange={(e) =>
                                    setEventDescription(e.target.value)
                                }
                            />
                        </label>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "10px",
                            padding: "10px",
                            alignSelf: "flex-end",
                        }}
                    >
                        <Button
                            clickEvent={() => setShowAddEvent(false)}
                            name="Annuller"
                            type="Secondary"
                        />
                        <Button
                            clickEvent={() => {
                                if (eventDate && eventName) {
                                    submitEvent();
                                } else {
                                    alert(
                                        "Der skal angives navn og dato på begivenheden "
                                    );
                                }
                            }}
                            name="Gem begivenhed"
                            type="Primary"
                        />
                    </div>
                </div>
            </div>
        </div>,
        document.body!
    );
}
