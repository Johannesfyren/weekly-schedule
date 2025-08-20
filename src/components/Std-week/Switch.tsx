import { useState } from "react";
import * as motion from "motion/react-client";
import styles from "./stdweek.module.css";
export default function Switch({ isOn, setIsOn, setUserDetails, userDetails }) {
    return (
        <button
            className={`${styles["switch-container"]} ${
                isOn ? styles["active"] : styles["inactive"]
            }`}
            style={{ justifyContent: "flex-" + (isOn ? "end" : "start") }}
            onClick={() => {
                setUserDetails({
                    ...userDetails,
                    standard_week_activated:
                        !userDetails.standard_week_activated,
                });
                setIsOn(!isOn);
            }}
        >
            <motion.div
                className={styles["handle"]}
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
            />
        </button>
    );
}
