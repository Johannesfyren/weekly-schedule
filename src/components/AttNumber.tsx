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
    icon: string;
    dayDBName: string;
    attIsClicked: boolean;
    setAttIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Attnumber({
    numberOfAttendees,
    icon,
    dayDBName,
    attIsClicked,
    setAttIsClicked,
}: Attnumbertype) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                backgroundColor: "white",
                padding: "2px 5px",
                borderRadius: "5px",
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
                <img style={{ width: "20px" }} src={icon} alt="" />
                <p
                    style={{
                        color: "#300276",
                        fontWeight: "700",
                        fontSize: "1.1rem",
                    }}
                >
                    {numberOfAttendees && console.log(numberOfAttendees)}
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
                    >
                        <img style={{ width: "20px" }} src={icon} alt="" />
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
                    >
                        <img style={{ width: "20px" }} src={icon} alt="" />
                        <p
                            style={{
                                color: "#300276",
                                fontWeight: "700",
                                fontSize: "1.1rem",
                            }}
                        >
                            {numberOfAttendees &&
                                10 -
                                    numberOfAttendees.filter(
                                        (att) => att[dayDBName] === 1
                                    ).length +
                                    numberOfAttendees.filter(
                                        (att) => att[dayDBName] === 2
                                    ).length}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
