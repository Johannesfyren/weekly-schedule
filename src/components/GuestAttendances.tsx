import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import guestIcon from "../assets/guest.svg";
import crossIcon from "../assets/cross.svg";

export default function GuestAttendances({ day, week, fetchData }) {
    const [guests, setGuests] = useState(Array<any>);
    useEffect(() => {
        const fetchGuests = async () => {
            const { data, error } = await supabase
                .from("guests")
                .select("*")
                .eq("day", day)
                .eq("week", week);

            if (!error) {
                setGuests(data);
            }
        };
        fetchGuests();
    }, [fetchData, week]);

    const handleGuestRemoval = async (userID) => {
        const { data, error } = await supabase
            .from("guests")
            .delete()
            .eq("id", userID);

        const fetchGuests = async () => {
            const { data, error } = await supabase
                .from("guests")
                .select("*")
                .eq("day", day)
                .eq("week", week);

            if (!error) {
                setGuests(data);
            }
        };
        fetchGuests();
    };

    if (guests.length == 0) {
        return "";
    }
    if (guests) {
        return (
            <div
                style={{
                    marginBottom: "5px",
                }}
            >
                {guests &&
                    guests.map((guest, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginBottom: "10px",
                                    alignItems: "center",
                                }}
                            >
                                <div className="avatar">
                                    <img
                                        width={"20px"}
                                        src={guestIcon}
                                        alt=""
                                    />
                                </div>
                                <p style={{ color: "#eaeaea" }}>
                                    {guest.guest_name}{" "}
                                    <span
                                        style={{
                                            fontStyle: "italic",
                                            color: "#eaeaeaa8",
                                        }}
                                    >
                                        (gæst)
                                    </span>
                                </p>
                                <img
                                    width={"20px"}
                                    style={{
                                        marginLeft: "auto",
                                        cursor: "pointer",
                                    }}
                                    src={crossIcon}
                                    alt=""
                                    onClick={() => handleGuestRemoval(guest.id)}
                                />
                            </div>
                        );
                    })}
            </div>
        );
    }
}
