import attIcon from "../assets/people-icon.svg";
export default function Attnumber({ numberOfAttendees }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                backgroundColor: "white",
                padding: "2px 5px",
                borderRadius: "5px",
                marginRight: "10px",
            }}
        >
            <img style={{ width: "20px" }} src={attIcon} alt="" />
            <p
                style={{
                    color: "#300276",
                    fontWeight: "700",
                    fontSize: "1.1rem",
                }}
            >
                {numberOfAttendees}
            </p>
        </div>
    );
}
