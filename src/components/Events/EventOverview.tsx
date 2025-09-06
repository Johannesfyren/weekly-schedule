import { useEffect, useState } from "react";
import eventIcon from "../../assets/event-icon.svg";
import dateIcon from "../../assets/event-icon.svg";
import descriptionIcon from "../../assets/event-icon.svg";
import styles from "./event.module.css";
import { supabase } from "../../utils/supabaseClient";
import Event from "./Event";
export default function EventOverview({
    eventContainerOpen,
    setEventContainerOpen,
}) {
    const [events, setEvents] = useState();
    const todaysDate = new Date();
    useEffect(() => {
        const getEvents = async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .order("date", { ascending: true });
            if (error) return undefined;
            setEvents(data);
            console.log(data);
        };
        getEvents();
    }, []);

    return (
        eventContainerOpen && (
            <div className={styles["event-container-bg"]}>
                <div className={styles["event-container"]}>
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
                    </div>
                    <div className={styles["main-area"]}>
                        <h2>Kommende begivenheder</h2>
                        <div className={styles["flexxer"]}>
                            {events &&
                                events
                                    .filter(
                                        (event) =>
                                            new Date(event.date) > todaysDate
                                    )
                                    .map((event) => {
                                        return <Event event={event} />;
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
                                            new Date(event.date) < todaysDate
                                    )
                                    .map((event) => {
                                        return <Event event={event} />;
                                    })}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
