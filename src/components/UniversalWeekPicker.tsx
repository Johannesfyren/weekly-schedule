import leftArrow from "../assets/leftarrow.svg";
import rightArrow from "../assets/rightarrow.svg";
import { weekToDateRangeString } from "../utils/weekToDate";

export type universalWeekpickerType = {
    chosenWeekNumber: number;
    setChosenWeekNumber: React.Dispatch<React.SetStateAction<number>>;
    size?: "small" | undefined;
};

export default function UniversalWeekPicker({
    chosenWeekNumber,
    setChosenWeekNumber,
    size,
}: universalWeekpickerType) {
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
                    style={{
                        cursor: "pointer",
                        height: size == "small" ? "18px " : "25px",
                    }}
                />
                <h1>Uge {chosenWeekNumber}</h1>
                <img
                    src={rightArrow}
                    alt=""
                    onClick={() => setChosenWeekNumber(chosenWeekNumber + 1)}
                    style={{
                        cursor: "pointer",
                        height: size == "small" ? "18px " : "25px",
                    }}
                />
            </div>
            <h2
                style={{
                    fontWeight: "400",
                    fontSize: size == "small" ? "1.0rem" : "1.1rem",
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
