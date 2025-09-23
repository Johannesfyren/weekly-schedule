import styles from "./tab.module.css";

export interface tabItemType {
    name: string;
    clickEvent: React.MouseEventHandler<HTMLDivElement>;
    currentlyActive: string;
}
export default function TabItem({
    name,
    clickEvent,
    currentlyActive,
}: tabItemType) {
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
