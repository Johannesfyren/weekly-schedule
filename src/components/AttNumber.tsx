//@ts-nocheck
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import attIcon from "../assets/people-icon.svg";
import attYesIcon from "../assets/att-yes.svg";
import attNoIcon from "../assets/att-no.svg";
import attMaybeIcon from "../assets/att-maybe.svg";
import expandIcon from "../assets/expand.svg";

import { motion } from "motion/react";

export type Attnumbertype = {
    numberOfAttendees: Array<{
        mon: number;
        tue: number;
        wed: number;
        thu: number;
        fri: number;
        user: {
            id: number;
            name: string;
            img_ref: string | null;
        };
    }>;
    dayDBName: string;
    attIsClicked: boolean;
    setAttIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Attnumber({
    numberOfAttendees,
    dayDBName,
    attIsClicked,
    setAttIsClicked,
}: Attnumbertype) {
    const [usercount, setUsercount] = useState<number>();
    const [attIsExpanded, setAttIsExpanded] = useState(false);
    useEffect(() => {
        //Fetch number of active users in the db
        const countActiveUsers = async () => {
            const { data, error } = await supabase.from("user").select("*");
            setUsercount(data.length);
        };
        countActiveUsers();
    }, []);

    useEffect(() => {
        //Self collapse if not done manually
        let setInt;
        if (attIsClicked == true) {
            setInt = setTimeout(() => {
                setAttIsClicked(false);
            }, 20000);
        }
        return () => clearTimeout(setInt);
    }, [attIsClicked]);

    return (
        <motion.div
            layout
            transition={{ duration: 0.15 }}
            className="att-number-container"
            onMouseEnter={() => setAttIsClicked(true)}
            onMouseLeave={() => {
                // setAttIsExpanded(false);
                setAttIsClicked(false);
            }}
            onClick={() => {
                setAttIsExpanded(true);
            }}
        >
            <div className="att-icon-number">
                {!attIsExpanded && (
                    <>
                        <img
                            style={{ width: "24px" }}
                            src={attIsClicked ? attYesIcon : attIcon}
                            alt=""
                        />
                        <p
                            style={{
                                color: "#300276",
                                fontWeight: "700",
                                fontSize: "1.1rem",
                            }}
                        >
                            {numberOfAttendees &&
                                numberOfAttendees.filter(
                                    (att) => att[dayDBName] === 1
                                ).length}
                        </p>
                    </>
                )}
            </div>

            {attIsClicked && !attIsExpanded && (
                <>
                    <div
                        className="att-icon-number"
                        onClick={() =>
                            attIsClicked
                                ? setAttIsExpanded(false)
                                : setAttIsExpanded(true)
                        }
                    >
                        <img style={{ width: "24px" }} src={attNoIcon} alt="" />
                        <p
                            style={{
                                color: "#300276",
                                fontWeight: "700",
                                fontSize: "1.1rem",
                            }}
                        >
                            {numberOfAttendees &&
                                numberOfAttendees.filter(
                                    (att) => att[dayDBName] === 2
                                ).length}
                        </p>
                    </div>
                    <div
                        className="att-icon-number"
                        onClick={() =>
                            attIsClicked
                                ? setAttIsExpanded(false)
                                : setAttIsExpanded(true)
                        }
                    >
                        <img
                            style={{ width: "24px" }}
                            src={attMaybeIcon}
                            alt=""
                        />
                        <p
                            style={{
                                color: "#300276",
                                fontWeight: "700",
                                fontSize: "1.1rem",
                            }}
                        >
                            {numberOfAttendees &&
                                usercount &&
                                Number(usercount) -
                                    (numberOfAttendees.filter(
                                        (att) => att[dayDBName] === 1
                                    ).length +
                                        numberOfAttendees.filter(
                                            (att) => att[dayDBName] === 2
                                        ).length)}
                        </p>
                    </div>
                    <hr />
                    <img src={expandIcon} alt="" width={"20px"} />
                </>
            )}
            {attIsExpanded && (
                <div className="att-icon-expanded-container">
                    <div className="att-icon-number-expanded">
                        <p>adsdasqweqweqweasdasdasdqed</p>
                        <p>adsdasd</p>
                        <p>adsdasd</p>
                        <p>adsdasd</p>
                        <var>v</var>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
