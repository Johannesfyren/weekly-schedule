//@ts-nocheck
import { useEffect, useState } from "react";
import eventIcon from "../../assets/event-icon.svg";
import styles from "./event.module.css";
import { supabase } from "../../utils/supabaseClient";
import Event from "./Event";
import Button from "../Button";
import LoadingIndicator from "../LoadingIndicator";
import AddEvent from "./AddEvent";

export default function EventOverview({
    eventContainerOpen,
    setEventContainerOpen,
}) {
    const [events, setEvents] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const todaysDate = new Date();
    useEffect(() => {
        const getEvents = async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .order("date", { ascending: true });
            if (error) return undefined;
            setEvents(data);
            setIsLoading(false);
        };

        getEvents();
    }, [showAddEvent]);

    return (
        eventContainerOpen && (
            <div
                className={styles["event-container-bg"]}
                onClick={(e) => console.log(e.target)}
            >
                <div
                    className={`${styles["event-container"]} ${styles["hide-scrollbar"]}`}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            backgroundColor: "rgba(6, 6, 148, 0.238)",
                            alignItems: "center",
                            padding: "0 10px 0 10px",
                            overflow: "visible",
                            height: "80px",
                        }}
                    >
                        <img src={eventIcon} width={"60px"} alt="" />
                        <h1>Begivenheder</h1>
                        <div style={{ marginLeft: "auto" }}>
                            <Button
                                name="Luk"
                                type="Secondary"
                                customClass="mg-left-auto"
                                clickEvent={() => setEventContainerOpen(false)}
                            />
                        </div>
                    </div>
                    {!isLoading ? (
                        <>
                            <div
                                className={`${styles["main-area"]} ${styles["hide-scrollbar"]}`}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "10px",
                                    }}
                                >
                                    <h2>Kommende begivenheder</h2>
                                    <Button
                                        name="Tilføj begivenhed"
                                        type="Primary"
                                        clickEvent={() => setShowAddEvent(true)}
                                    />
                                </div>

                                <div className={styles["flexxer"]}>
                                    {events &&
                                        events
                                            .filter(
                                                (event) =>
                                                    new Date(event.date) >=
                                                    todaysDate
                                            )
                                            .map((event) => {
                                                return (
                                                    <Event
                                                        event={event}
                                                        key={event.id}
                                                    />
                                                );
                                            })}
                                </div>
                                <h2 style={{ marginTop: "10px" }}>
                                    Gamle begivenheder
                                </h2>
                                <div className={styles["flexxer"]}>
                                    {events &&
                                        events
                                            .filter(
                                                (event) =>
                                                    new Date(event.date) <
                                                    todaysDate
                                            )
                                            .map((event) => {
                                                return (
                                                    <Event
                                                        event={event}
                                                        key={event.event_name}
                                                    />
                                                );
                                            })}
                                </div>
                            </div>
                            {showAddEvent && (
                                <AddEvent setShowAddEvent={setShowAddEvent} />
                            )}
                        </>
                    ) : (
                        <LoadingIndicator />
                    )}
                </div>
            </div>
        )
    );
}
