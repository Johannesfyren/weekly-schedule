//@ts-nocheck
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
export default function BirthdayAnnouncer({ daysDate }) {
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

    return birthdayPerson?.length > 0 && <h1>{birthdayPerson[0].name}</h1>;
}
