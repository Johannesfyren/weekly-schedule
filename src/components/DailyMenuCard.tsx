//@ts-nocheck
import menuIcon from "../assets/menu-icon.svg";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export type menuInfoType = {
    dayDBName: string;
    weekNumber: number;
    year: number;
    refetchAttendees: boolean;
};

export default function DailyMenuCard({
    dayDBName,
    weekNumber,
    year,
    refetchAttendees,
}: menuInfoType) {
    const [menuData, setMenuData] = useState();

    useEffect(() => {
        getMenu();
        async function getMenu() {
            const { data, error } = await supabase
                .from("menu")
                .select(dayDBName)
                .eq("week", weekNumber)
                .eq("year", year);

            if (data) setMenuData(data[0]);
            if (error) console.log(error);
        }
        console.log("fetching menu initially");
        const timeOut = setInterval(() => {
            console.log("fetching menu");
            getMenu();
        }, 900000); //15 min

        return () => {
            clearInterval(timeOut);
        };
    }, [refetchAttendees, weekNumber]);

    return (
        <div
            style={{
                width: "100%",
                height: "100px",
                backgroundColor: "rgba(255,255,255,0.29)",

                borderRadius: "5px",
                overflowX: "scroll",
                scrollbarGutter: "none",
                padding: "10px",
            }}
        >
            <img style={{ width: "20px" }} src={menuIcon} alt="" />
            <p
                style={{
                    color: "#e7e7e7ff",
                    whiteSpace: "pre-line",
                }}
            >
                {menuData && menuData[dayDBName].length > 1
                    ? menuData[dayDBName]
                    : "Ingen menu registeret"}
            </p>
        </div>
    );
}
