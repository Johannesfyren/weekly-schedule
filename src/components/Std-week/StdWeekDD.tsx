import styles from "./stdweek.module.css";
export default function StdWeekDD({ isOpen, setIsOpen }) {
    return (
        isOpen && (
            <div className={styles["menu-open"]}>
                <p>man</p>
                <p>man</p>
                <p>man</p>
                <p>man</p>
                <p>man</p>
            </div>
        )
    );
}
