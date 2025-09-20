import styles from "./tab.module.css";
export default function TabItem({ name, clickEvent }) {
    return (
        <div className={styles["tab-item"]} onClick={clickEvent}>
            {name}
        </div>
    );
}
