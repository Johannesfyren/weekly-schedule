import { useState } from "react";
import styles from "./stdweek.module.css";
import Switch from "./Switch";

export default function StandardWeek({ id }) {
    const [isOn, setIsOn] = useState(false);

    return (
        <div className={styles["container"]}>
            <p>Standard uge</p>
            <Switch isOn={isOn} setIsOn={setIsOn} />
            <div>|</div>
            <button className={styles["dropdown-btn"]}></button>
        </div>
    );
}
