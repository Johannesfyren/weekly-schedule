import { useState } from "react";
import * as motion from "motion/react-client";
import styles from "./stdweek.module.css";
export default function Switch({ isOn, setIsOn }) {
    return (
        <button
            className={`${styles["switch-container"]} ${
                isOn ? styles["active"] : styles["inactive"]
            }`}
            style={{ justifyContent: "flex-" + (isOn ? "start" : "end") }}
            onClick={() => setIsOn(!isOn)}
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
