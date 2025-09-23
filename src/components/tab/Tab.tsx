import { useEffect, useState } from "react";
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
    const [currentlyActive, setCurrentlyActive] = useState(tabs[0].tabName);

    //Only one tab can be open, set everything else to false
    useEffect(() => {
        tabs.map(
            (tab) => tab.tabName != currentlyActive && tab.setOpenMenu(false)
        );
    }, [currentlyActive]);

    return (
        <div
            className={`${styles["tab-container"]} ${styles["hide-scrollbar"]}`}
        >
            {tabs.map((tab) => {
                return (
                    <TabItem
                        clickEvent={() => {
                            tab.setOpenMenu(true);
                            setCurrentlyActive(tab.tabName);
                        }}
                        name={tab.tabName}
                        currentlyActive={currentlyActive}
                    />
                );
            })}
        </div>
    );
}
