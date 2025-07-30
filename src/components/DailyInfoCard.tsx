import { weekNumber } from "weeknumber";
import menuIcon from "../assets/menu-icon.svg";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export type menuInfoType = {
    dayDBName: string;
    weekNumber: number;
    year: number;
};

export default function DailyInfoCard({
    dayDBName,
    weekNumber,
    year,
}: menuInfoType) {
    const [menuData, setMenuData] = useState();

    useEffect(() => {
        async function getMenu() {
            const { data, error } = await supabase
                .from("menu")
                .select(dayDBName)
                .eq("week", weekNumber)
                .eq("year", year);
            // console.log(data[0]);
            if (data) setMenuData(data[0]);
        }
        getMenu();
    }, []);
    return (
        <div
            style={{
                width: "100%",
                height: "100px",
                backgroundColor: "white",
                borderLeft: "5px solid blue",
                borderRadius: "5px",
                overflowX: "scroll",
                scrollbarGutter: "none",
            }}
        >
            <img style={{ width: "20px" }} src={menuIcon} alt="" />
            <p
                style={{
                    color: "black",
                    whiteSpace: "pre-line",
                }}
            >
                {menuData ? menuData[dayDBName] : "Ingen menu registeret"}
            </p>
            {console.log(menuData)}
        </div>
    );
}
