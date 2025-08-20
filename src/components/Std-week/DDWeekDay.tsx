import { useState, useEffect } from "react";
import attYes from "../../assets/checkmark.svg";
import attNo from "../../assets/cross.svg";
import styles from "./stdweek.module.css";
import { supabase } from "../../utils/supabaseClient";
export default function DDWeekDay({
    day,
    dayDBName,
    setStandardWeek,
    standardWeek,
}) {
    const [isAttending, setIsAttending] = useState(
        standardWeek[dayDBName] == 1
    );

    // useEffect(() => {
    //     const saveStandardWeek = async () => {
    //         const { data, error } = await supabase
    //             .from("standard_weeks")
    //             .upsert(standardWeek);

    //         if (error) console.log(error);
    //     };
    //     saveStandardWeek();
    // }, [standardWeek]);
    // const handleSubmit = async()=>{
    //     const { data, error } = await supabase
    //                 .from("standard_weeks")
    //                 .upsert(standardWeek);

    //             if (error) console.log(error);
    //         };
    // }
    return (
        <div className={styles["weekDay-container"]}>
            <p>{day}</p>
            <div
                className={styles["checkbox-container"]}
                onClick={() => {
                    setIsAttending(!isAttending);
                    setStandardWeek({
                        ...standardWeek,
                        [dayDBName]: isAttending ? 2 : 1,
                    });
                }}
            >
                {console.log(standardWeek)}
                <img src={isAttending ? attYes : attNo} alt="" width={"15px"} />
            </div>
        </div>
    );
}
