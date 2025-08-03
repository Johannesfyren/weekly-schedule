import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import attIcon from "../assets/people-icon.svg";
import attYesIcon from "../assets/att-yes.svg";
import attNoIcon from "../assets/att-no.svg";
import attMaybeIcon from "../assets/att-maybe.svg";
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
    useEffect(() => {
        //Fetch user
        const countActiveUsers = async () => {
            const { data, error } = await supabase.from("user").select("*");
            setUsercount(data.length);
        };
        countActiveUsers();
    }, []);

    useEffect(() => {
        //Self collapse if not done manually
        let setint;
        if (attIsClicked == true) {
            setint = setTimeout(() => {
                setAttIsClicked(false);
            }, 20000);
        }
        return () => clearTimeout(setint);
    }, [attIsClicked]);

    return (
        <motion.div
            layout
            transition={{ duration: 0.15 }}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                backgroundColor: "white",
                padding: "2px 5px",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                }}
                onClick={() =>
                    attIsClicked
                        ? setAttIsClicked(false)
                        : setAttIsClicked(true)
                }
            >
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
                        numberOfAttendees.filter((att) => att[dayDBName] === 1)
                            .length}
                </p>
            </div>
            {attIsClicked && (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                        }}
                        onClick={() =>
                            attIsClicked
                                ? setAttIsClicked(false)
                                : setAttIsClicked(true)
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
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                        }}
                        onClick={() =>
                            attIsClicked
                                ? setAttIsClicked(false)
                                : setAttIsClicked(true)
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
                </>
            )}
        </motion.div>
    );
}
