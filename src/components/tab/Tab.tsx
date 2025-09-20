import styles from "./tab.module.css";
import TabItem from "./TabItem";

export interface tabType {
    tabs: {
        tabName: string;
        setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
        openMenu: boolean;
    }[];
}

export default function Tab({ tabs }: tabType) {
    return (
        <div className={styles["tab-container"]}>
            {tabs.map((tab) => {
                return (
                    <TabItem clickEvent={tab.setOpenMenu} name={tab.tabName} />
                );
            })}
        </div>
    );
}
