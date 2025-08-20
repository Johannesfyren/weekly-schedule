import styles from "./stdweek.module.css";
import DDWeekDay from "./DDWeekDay";

export default function StdWeekDD({
    isOpen,
    setIsOpen,
    standardWeek,
    setStandardWeek,
}) {
    return (
        isOpen && (
            <div className={styles["menu-open"]}>
                <DDWeekDay
                    day={"Mandag"}
                    dayDBName={"mon"}
                    standardWeek={standardWeek}
                    setStandardWeek={setStandardWeek}
                />
                <DDWeekDay
                    day={"Tirsdag"}
                    dayDBName={"tue"}
                    standardWeek={standardWeek}
                    setStandardWeek={setStandardWeek}
                />
                <DDWeekDay
                    day={"Onsdag"}
                    dayDBName={"wed"}
                    standardWeek={standardWeek}
                    setStandardWeek={setStandardWeek}
                />
                <DDWeekDay
                    day={"Torsdag"}
                    dayDBName={"thu"}
                    standardWeek={standardWeek}
                    setStandardWeek={setStandardWeek}
                />
                <DDWeekDay
                    day={"Fredag"}
                    dayDBName={"fri"}
                    standardWeek={standardWeek}
                    setStandardWeek={setStandardWeek}
                />
            </div>
        )
    );
}
