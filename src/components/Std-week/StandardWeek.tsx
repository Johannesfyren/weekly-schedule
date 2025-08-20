import { useState, useEffect } from "react";
import styles from "./stdweek.module.css";
import Switch from "./Switch";
import downIcon from "../../assets/dropdown-downarrow.svg";
import upIcon from "../../assets/dropdown-uparrow.svg";
import StdWeekDD from "./StdWeekDD";
import { supabase } from "../../utils/supabaseClient";

export default function StandardWeek({
    userDetails,
    setUserDetails,
    standardWeek,
    setStandardWeek,
}) {
    const mobileView = window.innerWidth < 850; //If the screen is mobile sized, we adjust som font sizing acordingly
    const [isOn, setIsOn] = useState(userDetails.standard_week_activated);
    const [isOpen, setIsOpen] = useState(false);
    // const [standardWeek, setStandardWeek] = useState({
    //     fk_user_id: userDetails.id,
    //     mon: 2,
    //     tue: 2,
    //     wed: 2,
    //     thu: 2,
    //     fri: 2,
    // }); // 1 = eats, 2 = doesnt eat

    useEffect(() => {
        async function fetchUserWeeklyPreferences() {
            const { data, error } = await supabase
                .from("standard_weeks")
                .select("*")
                .eq("fk_user_id", userDetails.id);
            if (error) return undefined;
            data.length > 0 && setStandardWeek(data && data[0]); // if there is no data, we keep the "standard data"
        }

        fetchUserWeeklyPreferences();
    }, [userDetails]);

    return (
        <div
            className={styles["container"]}
            style={mobileView ? { position: "relative" } : undefined}
        >
            <div className={styles["upper-part-container"]}>
                <p>Standard uge</p>
                <Switch
                    isOn={isOn}
                    setIsOn={setIsOn}
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                />
                <div className={styles["spacer"]}></div>
                <button
                    className={styles["dropdown-btn"]}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img src={isOpen ? upIcon : downIcon} alt="" />
                </button>
            </div>

            <StdWeekDD
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                standardWeek={standardWeek}
                setStandardWeek={setStandardWeek}
            />
        </div>
    );
}
