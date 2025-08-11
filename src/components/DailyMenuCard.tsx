//@ts-nocheck
import menuIcon from "../assets/menu-icon.svg";
import downArrowPng from "../assets/down-arrow.svg";
import { useEffect, useRef, useState } from "react";
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
    const [scrollHeightMenu, setScrollHeightMenu] = useState();
    const [showExcessMenuIndicator, setShowExcessMenuIndicator] =
        useState(true);
    const menuRef = useRef(null);

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
        console.log("yoyo");
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
            onClick={(e) => {
                // console.log(e.target.clientHeight);
                // console.log(e.target.scrollHeight);
                console.log(
                    "scrollheight: ",
                    menuRef.current?.scrollHeight,
                    "clientheight: ",
                    menuRef.current?.clientHeight,
                    "scrolltop: ",
                    menuRef.current?.scrollTop
                );
            }}
            onScroll={() => setScrollHeightMenu(menuRef.current.scrollTop)}
        >
            <img
                style={{
                    width: "20px",
                    marginLeft: "10px",
                }}
                src={menuIcon}
                alt=""
            />
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
                            paddingLeft: "10px",
                            paddingRight: "10px",
                        }}
                    >
                        Ingen menu oprettet
                    </span>
                )}
            </p>
            {console.log(
                "scrollheight: ",
                menuRef.current?.scrollHeight,
                "clientheight: ",
                menuRef.current?.clientHeight,
                "scrolltop: ",
                menuRef.current?.scrollTop
            )}

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
                                "linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%,rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.32) 51%)",
                            bottom: "0px",
                            height: "15px",
                        }}
                        onClick={() =>
                            menuRef.current?.scrollBy({
                                top: 20,
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
                            height: "20px",
                        }}
                    ></div>
                )}
        </div>
    );
}
