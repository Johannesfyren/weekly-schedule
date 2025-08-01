export type Attnumbertype = {
    numberOfAttendees: number;
    icon: string;
};
export default function Attnumber({ numberOfAttendees, icon }: Attnumbertype) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                backgroundColor: "white",
                padding: "2px 5px",
                borderRadius: "5px",
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
                {numberOfAttendees}
            </p>
        </div>
    );
}
