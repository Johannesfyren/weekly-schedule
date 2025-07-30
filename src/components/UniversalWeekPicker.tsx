import leftArrow from "../assets/leftarrow.svg";
import rightArrow from "../assets/rightarrow.svg";
import { weekToDateRangeString } from "../utils/weekToDate";

export default function UniversalWeekPicker({
    chosenWeekNumber,
    setChosenWeekNumber,
}) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    src={leftArrow}
                    alt=""
                    onClick={() => setChosenWeekNumber(chosenWeekNumber - 1)}
                    style={{ cursor: "pointer", height: "25px" }}
                />
                <h1>Uge {chosenWeekNumber}</h1>
                <img
                    src={rightArrow}
                    alt=""
                    onClick={() => setChosenWeekNumber(chosenWeekNumber + 1)}
                    style={{ cursor: "pointer", height: "25px" }}
                />
            </div>
            <h2
                style={{
                    fontWeight: "400",
                    fontSize: "1.1rem",
                    color: "#DFDFDF",
                }}
            >
                {weekToDateRangeString(
                    chosenWeekNumber,
                    new Date().getFullYear()
                )}
            </h2>
        </div>
    );
}
