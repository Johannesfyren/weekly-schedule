import { useState } from "react";
import attYes from "../../assets/checkmark.svg";
import attNo from "../../assets/cross.svg";
import styles from "./stdweek.module.css";
export default function DDWeekDay({
    day,
    dayDBName,
    setStandardWeek,
    standardWeek,
}) {
    const [isAttending, setIsAttending] = useState(
        standardWeek[dayDBName] == 1
    );
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
                <img src={isAttending ? attYes : attNo} alt="" width={"15px"} />
            </div>
        </div>
    );
}
