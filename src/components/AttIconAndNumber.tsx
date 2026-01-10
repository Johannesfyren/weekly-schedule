//@ts-nocheck
export default function AttIconAndNumber({
    allAttendees,
    icon,
    attIsClicked,
    dayDBName,
    attendanceDBValue,
    numberOfGuests,
}) {
    return (
        <div
            className={
                attIsClicked
                    ? "att-icon-number att-icon-number-expanded"
                    : "att-icon-number"
            }
        >
            <img style={{ width: "24px" }} src={icon} alt="" />
            <p
                style={{
                    color: "#300276",
                    fontWeight: "700",
                    fontSize: "1.1rem",
                }}
            >
                {allAttendees &&
                    allAttendees.filter(
                        (att) => att[dayDBName] === attendanceDBValue
                    ).length + (attendanceDBValue === 1 ? numberOfGuests : 0)}
            </p>
        </div>
    );
}
