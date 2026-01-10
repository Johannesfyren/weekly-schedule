//@ts-nocheck
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import AttIconAndNumber from "./AttIconAndNumber";
import attIcon from "../assets/people-icon.svg";
import attYesIcon from "../assets/att-yes.svg";
import attNoIcon from "../assets/att-no.svg";
import attMaybeIcon from "../assets/att-maybe.svg";
import expandIcon from "../assets/expand.svg";

import { motion } from "motion/react";

export type Attnumbertype = {
    allAttendees: Array<{
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
    allAttendees,
    dayDBName,
    attIsClicked,
    setAttIsClicked,
    week,
}: Attnumbertype) {
    const [completeUserList, setCompleteUserList] = useState<number>();
    const [attIsExpanded, setAttIsExpanded] = useState(false);
    const [guests, setGuests] = useState();
    const guestsAndAttendees: Array<any> = allAttendees;
    useEffect(() => {
        //Fetch number of active users in the db and guests
        const countActiveUsers = async () => {
            const { data, error } = await supabase.from("user").select("*");
            setCompleteUserList(
                data?.filter((att) => att.canteen_personel == 0) //Filter out canteen personal
            );
        };

        countActiveUsers();
    }, []);
    useEffect(() => {
        //Fetch number of guests

        const fetchGuests = async () => {
            const { data, error } = await supabase
                .from("guests")
                .select("*")
                .eq("day", dayDBName)
                .eq("week", week);

            if (!error) {
                setGuests(data);
            } else {
                console.log(error);
            }
        };

        fetchGuests();
    }, [week]);

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
            className={
                attIsExpanded
                    ? "att-number-container-exp"
                    : "att-number-container"
            }
            onMouseEnter={() => setAttIsClicked(true)}
            onMouseLeave={() => {
                setAttIsExpanded(false);
                setAttIsClicked(false);
            }}
            onClick={() => {
                setAttIsClicked(true);
                attIsClicked && setAttIsExpanded(true);
                if (attIsExpanded) {
                    setAttIsExpanded(false);
                    setAttIsClicked(false);
                }
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
                            {allAttendees &&
                                allAttendees.filter(
                                    (att) => att[dayDBName] === 1
                                ).length + guests?.length}
                        </p>
                    </>
                )}
            </div>

            {attIsClicked && !attIsExpanded && (
                <>
                    <AttIconAndNumber
                        allAttendees={allAttendees}
                        attIsClicked={attIsClicked}
                        dayDBName={dayDBName}
                        icon={attNoIcon}
                        attendanceDBValue={2}
                    />
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
                            {allAttendees &&
                                completeUserList &&
                                Number(completeUserList.length) -
                                    (allAttendees.filter(
                                        (att) => att[dayDBName] === 1
                                    ).length +
                                        allAttendees.filter(
                                            (att) => att[dayDBName] === 2
                                        ).length)}
                        </p>
                    </div>
                    <div className="seperator"></div>
                    <img
                        src={expandIcon}
                        alt=""
                        width={"20px"}
                        style={{ alignSelf: "center" }}
                    />
                </>
            )}
            {attIsExpanded && (
                <div
                    className="att-icon-expanded-container"
                    onClick={() => setAttIsExpanded(false)}
                >
                    <div className="att-icon-number-expanded">
                        {/* HER SKAL DER GIVES GÆSTER */}
                        <AttIconAndNumber
                            allAttendees={allAttendees}
                            attIsClicked={attIsClicked}
                            dayDBName={dayDBName}
                            icon={attYesIcon}
                            attendanceDBValue={1}
                            numberOfGuests={guests?.length}
                        />
                        {allAttendees
                            .filter((att) => att[dayDBName] === 1)
                            .map((att, index) => {
                                return <div key={index}>{att.user.name}</div>;
                            })}
                        {guests &&
                            guests.map((att, index) => {
                                return (
                                    <div key={index}>
                                        {att.guest_name}{" "}
                                        <span
                                            style={{
                                                fontStyle: "italic",
                                                color: "#2e2e2ea8",
                                            }}
                                        >
                                            (gæst)
                                        </span>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="att-icon-number-expanded">
                        <AttIconAndNumber
                            allAttendees={allAttendees}
                            attIsClicked={attIsClicked}
                            dayDBName={dayDBName}
                            icon={attNoIcon}
                            attendanceDBValue={2}
                        />
                        {allAttendees
                            .filter((att) => att[dayDBName] === 2)
                            .map((att, index) => {
                                return <div key={index}>{att.user.name}</div>;
                            })}
                    </div>
                    <div className="att-icon-number-expanded">
                        <div
                            className="att-icon-number att-icon-number-expanded"
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
                                {allAttendees &&
                                    completeUserList &&
                                    Number(completeUserList.length) -
                                        (allAttendees.filter(
                                            (att) => att[dayDBName] === 1
                                        ).length +
                                            allAttendees.filter(
                                                (att) => att[dayDBName] === 2
                                            ).length)}
                            </p>
                        </div>
                        {completeUserList
                            .filter(
                                (user) =>
                                    !user.guest &&
                                    !allAttendees
                                        .filter(
                                            (att) =>
                                                att[dayDBName] === 1 ||
                                                att[dayDBName] === 2
                                        )
                                        .some((att) => att.user.id === user.id)
                            )
                            .map((user) => (
                                <div key={user.id}>{user.name}</div>
                            ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
