//@ts-nocheck
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { supabase } from "../utils/supabaseClient";
import birthdayIcon from "../assets/birthday-flag.svg";
export default function BirthdayAnnouncer({ daysDate, showDay = false }) {
    const [attendees, setAttendees] = useState();
    const [birthdayPerson, setBirthdayPerson] = useState();
    async function fetchAttendances(): Promise<any> {
        const { data, error } = await supabase
            .from("user")
            .select(` "name","birthday_date"`);

        if (error) return undefined;

        setAttendees(data && data);

        // Filter to see if anyone has birthday in the current week being rendered
        let filtered = data.filter(
            (att) =>
                `${new Date(att.birthday_date).getMonth() + 1}-${new Date(
                    att.birthday_date
                ).getDate()}` ==
                `${daysDate.getMonth() + 1}-${daysDate.getDate()}`
        );

        setBirthdayPerson(filtered);
    }

    useEffect(() => {
        fetchAttendances();
        const timeOut = setInterval(() => {
            fetchAttendances();
        }, 900000); //15 min
        fetchAttendances();

        return () => clearInterval(timeOut);
    }, [daysDate]);

    return (
        birthdayPerson?.length > 0 && (
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
                    marginBottom: "-10px",
                }}
            >
                {console.log(daysDate)}
                <img src={birthdayIcon} width={"20px"} />
                <p>{birthdayPerson[0].name}</p>
                <p style={{ color: "#e3e3e3ff", fontStyle: "italic" }}>
                    {showDay &&
                        "(" +
                            daysDate.toLocaleDateString("da-DK", {
                                weekday: "long",
                            }) +
                            ")"}
                </p>
            </motion.div>
        )
    );
}
