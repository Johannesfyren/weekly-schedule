//@ts-nocheck
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
export default function BirthdayAnnouncer({ daysDate }) {
    const [attendees, setAttendees] = useState();
    const [birthdayPerson, setBirthdayPerson] = useState();
    async function fetchAttendances(): Promise<any> {
        const { data, error } = await supabase
            .from("user")
            .select(` "name", "img_ref","birthday_date"`);

        if (error) return undefined;
        // console.log(data);
        setAttendees(data && data);

        let filtered = data.filter((att) =>
            console.log(
                `${new Date(att.birthday_date).getUTCMonth()},${new Date(
                    att.birthday_date
                ).getUTCDate()}`,
                `${daysDate.getUTCMonth()},${daysDate.getUTCDate()}`
            )
        );
        //`${new Date(att.user["birthday_date"]).getMonth()},${new Date(att.user["birthday_date"]).getUTCDate()}`
        //
        // console.log("daysDate: ", data[0].birthday_date);
        console.log(
            "filtered: ",
            `${daysDate.getUTCMonth()},${daysDate.getUTCDate()}`
        );
        // console.log("birthdayperson: ", birthdayPerson);
        setBirthdayPerson(filtered);
        console.log(data[0].birthday_date);
        console.log(daysDate);
    }

    useEffect(() => {
        fetchAttendances();
        const timeOut = setInterval(() => {
            fetchAttendances();
        }, 900000); //15 min
        fetchAttendances();

        return () => clearInterval(timeOut);
    }, [daysDate]);

    return birthdayPerson && <h1>{console.log("bp: ", birthdayPerson)}</h1>;
}
