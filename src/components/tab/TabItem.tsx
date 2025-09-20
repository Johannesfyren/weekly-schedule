import styles from "./tab.module.css";
export default function TabItem({ name, clickEvent, currentlyActive }) {
    return (
        <div
            className={
                currentlyActive == name
                    ? styles["tab-item-active"]
                    : styles["tab-item-inactive"]
            }
            onClick={clickEvent}
        >
            {name}
        </div>
    );
}
