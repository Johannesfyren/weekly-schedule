//@ts-nocheck
import menuIcon from "../assets/menu-icon.svg";
import linkIcon from "../assets/link-icon.svg";
import downArrowPng from "../assets/down-arrow.svg";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import PreviewMenuURL from "./PreviewMenuURL";

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
    const [showURLPreview, setShowURLPreview] = useState(false);
    const [scrollHeightMenu, setScrollHeightMenu] = useState();
    const [showExcessMenuIndicator, setShowExcessMenuIndicator] =
        useState(true);
    const menuRef = useRef(null);

    useEffect(() => {
        getMenu();
        async function getMenu() {
            const { data, error } = await supabase
                .from("menu")
                .select("*")
                .eq("week", weekNumber)
                .eq("year", year);

            if (data) setMenuData(data[0]);
            if (error) console.log(error);
        }

        const timeOut = setInterval(() => {
            getMenu();
        }, 900000); //15 min

        return () => {
            clearInterval(timeOut);
        };
    }, [refetchAttendees, weekNumber]);

    useEffect(() => {
        // if (menuRef?.current?.scrollHeight > menuRef?.current?.clientHeight) {
        //     setScrollHeightMenu(menuRef.current.scrollHeight);
        // }
        //If we are close to scrolling to the bottom of the menuCard, remove the indicator showing we can scroll
        if (
            menuRef.current?.scrollHeight <
            menuRef.current?.clientHeight + scrollHeightMenu + 5
        ) {
            setShowExcessMenuIndicator(false);
        } else {
            setShowExcessMenuIndicator(true);
        }
    }, [scrollHeightMenu]);
    return (
        <div
            ref={menuRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100px",
                backgroundColor: "rgba(255,255,255,0.29)",

                borderRadius: "5px",
                overflowX: "scroll",
                scrollbarGutter: "none",
                paddingTop: "10px",
            }}
            className="hide-scrollbar"
            onScroll={() => setScrollHeightMenu(menuRef.current.scrollTop)}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <img
                    style={{
                        width: "20px",
                        marginLeft: "10px",
                    }}
                    src={menuIcon}
                    alt=""
                />
                {/* Link icon rendered if a link is provided */}
                {menuData && menuData[dayDBName + "_link"] && (
                    <a href={menuData[dayDBName + "_link"]} target="_blank">
                        <img
                            src={linkIcon}
                            alt=""
                            style={{
                                width: "20px",
                                height: "auto",
                                marginRight: "10px",
                            }}
                            onMouseOver={() => setShowURLPreview(true)}
                            onMouseOut={() => setShowURLPreview(false)}
                        />
                    </a>
                )}
            </div>
            {showURLPreview && (
                <PreviewMenuURL url={menuData[dayDBName + "_link"]} />
            )}
            <p
                style={{
                    color: "#e7e7e7ff",
                    whiteSpace: "pre-line",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                }}
            >
                {menuData && menuData[dayDBName].length > 1 ? (
                    menuData[dayDBName]
                ) : (
                    <span
                        style={{
                            color: "#aeacacff",
                            fontStyle: "italic",
                        }}
                    >
                        Ingen menu oprettet
                    </span>
                )}
            </p>

            {menuRef &&
                showExcessMenuIndicator &&
                menuRef.current?.clientHeight <
                    menuRef.current?.scrollHeight && (
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "center",
                            position: "sticky",
                            width: "100%",
                            background:
                                "linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.22) 51%)",
                            bottom: "0px",
                            height: "10px",
                        }}
                        onClick={() =>
                            menuRef.current?.scrollBy({
                                top: 40,
                                behavior: "smooth",
                            })
                        }
                    >
                        <img
                            src={downArrowPng}
                            alt=""
                            style={{ width: "20px" }}
                        />
                    </div>
                )}

            {/*If we scroll near the bottom, render menucard without the indicator but with a little gap on bottom */}
            {menuRef &&
                menuRef.current?.scrollHeight <
                    menuRef.current?.clientHeight + scrollHeightMenu + 5 && (
                    <div
                        style={{
                            height: "10px",
                        }}
                    ></div>
                )}
        </div>
    );
}
