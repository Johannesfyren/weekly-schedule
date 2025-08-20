import { useState } from "react";
import styles from "./stdweek.module.css";
import Switch from "./Switch";
import downIcon from "../../assets/dropdown-downarrow.svg";
import upIcon from "../../assets/dropdown-uparrow.svg";
import StdWeekDD from "./StdWeekDD";

export default function StandardWeek({ id }) {
    const mobileView = window.innerWidth < 850; //If the screen is mobile sized, we adjust som font sizing acordingly
    const [isOn, setIsOn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={styles["container"]}
            style={mobileView ? { position: "relative" } : undefined}
        >
            <div className={styles["upper-part-container"]}>
                <p>Standard uge</p>
                <Switch isOn={isOn} setIsOn={setIsOn} />
                <div className={styles["spacer"]}></div>
                <button
                    className={styles["dropdown-btn"]}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img src={downIcon} alt="" />
                </button>
            </div>

            <StdWeekDD isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
}
