//@ts-nocheck
import styles from "./event.module.css";
import eventIcon from "../../assets/event-icon-with-bg.svg";
import editIcon from "../../assets/edit-icon.svg";
import { motion } from "motion/react";
import { supabase } from "../../utils/supabaseClient";
import { useEffect, useState } from "react";
import AddEvent from "./AddEvent";

export default function Event({
    collapsed = false,
    event = undefined,
    daysDate = undefined,
}) {
    //If the event "lives alone", we need to fetch events for a given day.
    const [todaysEvent, setTodaysEvent] = useState();
    const [showAddEvent, setShowAddEvent] = useState(false);
    const todaysDateFormatted =
        daysDate &&
        daysDate.getFullYear() +
            "-" +
            (daysDate.getMonth() + 1) +
            "-" +
            daysDate.getDate();

    useEffect(() => {
        const fetchTodaysEvent = async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .eq("date", todaysDateFormatted);
            if (error) return undefined;

            setTodaysEvent(data && data[0]);
        };
        if (event == undefined) fetchTodaysEvent();
    }, [daysDate, showAddEvent]);

    const editEvent = () => {
        setShowAddEvent(true);
    };

    if (!collapsed)
        return (
            <div className={styles["event-item-container"]}>
                <div
                    className={styles["event-item"]}
                    style={{ fontSize: "1.3rem" }}
                >
                    <h3>{event.event_name}</h3>
                    <img
                        src={editIcon}
                        alt=""
                        width={"20px"}
                        style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            cursor: "pointer",
                        }}
                        onClick={editEvent}
                    />
                </div>
                <div className={styles["event-item"]}>
                    <p>
                        {new Date(event.date).toLocaleDateString("da-DK", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>

                {event.description ? (
                    <div
                        className={styles["event-item"]}
                        style={{
                            fontSize: "1rem",
                            marginTop: "5px",
                        }}
                    >
                        <p>{event.description}</p>
                    </div>
                ) : (
                    <p style={{ color: "#d2d2d2ff", fontStyle: "italic" }}>
                        Ingen beskrivelse
                    </p>
                )}
                {showAddEvent && (
                    <AddEvent
                        inh_eventDate={event.date}
                        inh_eventName={event.event_name}
                        inh_eventDesc={event.description}
                        inh_id={event.id}
                        setShowAddEvent={setShowAddEvent}
                    />
                )}
            </div>
        );

    if (collapsed && todaysEvent) {
        return (
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    backgroundColor: "#ffffff23",
                    padding: "3px 10px 3px 10px",
                    borderRadius: "10px",
                    width: "100%",
                }}
            >
                <img src={eventIcon} width={"20px"} />
                <p>{todaysEvent.event_name}</p>
            </motion.div>
        );
    }
}
