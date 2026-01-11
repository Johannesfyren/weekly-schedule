//@ts-nocheck
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import guestIcon from "../assets/guest.svg";
import crossIcon from "../assets/cross-faded.svg";
import { toast } from "react-toastify";

export default function GuestAttendances({
    day,
    week,
    fetchData,
    setRefetchAttendees,
}) {
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
        const guestFiltered = guests.filter((guest) => guest.id == userID);
        console.log(guestFiltered);
        const confirmed = window.confirm(
            `Er du sikker på at du vil fjerne ${guestFiltered[0].guest_name}`
        );

        if (!confirmed) return;

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

            if (error) {
                toast.error(
                    "Noget gik galt. Gæsten er ikke slettet. Prøv igen."
                );
            } else {
                setGuests(data);
            }
        };
        fetchGuests();
        setRefetchAttendees(true);
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
