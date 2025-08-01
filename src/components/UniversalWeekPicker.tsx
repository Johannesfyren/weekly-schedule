import type React from "react";
import leftArrow from "../assets/leftarrow.svg";
import rightArrow from "../assets/rightarrow.svg";
import { weekToDateRangeString } from "../utils/weekToDate";

export type universalWeekpickerType = {
    chosenWeekNumber: number;
    setChosenWeekNumber: React.Dispatch<React.SetStateAction<number>>;
    size?: "small" | "mobile" | undefined;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UniversalWeekPicker({
    chosenWeekNumber,
    setChosenWeekNumber,
    setIsLoading,
    size,
}: universalWeekpickerType) {
    if (window.innerWidth < 850) size = "mobile"; //If the screen is mobile sized, we adjust som font sizing acordingly

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
                    onClick={() => {
                        setChosenWeekNumber(chosenWeekNumber - 1);
                        setIsLoading && setIsLoading(true);
                    }}
                    style={{
                        cursor: "pointer",
                        height:
                            size == "small"
                                ? "18px"
                                : size == "mobile"
                                ? "12px"
                                : "25px",
                    }}
                />
                <h1
                    style={{
                        fontSize:
                            size == "small"
                                ? "1.8rem"
                                : size == "mobile"
                                ? "1.0rem"
                                : "2rem",
                    }}
                >
                    Uge {chosenWeekNumber}
                </h1>
                <img
                    src={rightArrow}
                    alt=""
                    onClick={() => {
                        setChosenWeekNumber(chosenWeekNumber + 1);
                        setIsLoading && setIsLoading(true);
                    }}
                    style={{
                        cursor: "pointer",
                        height:
                            size == "small"
                                ? "18px"
                                : size == "mobile"
                                ? "12px"
                                : "25px",
                    }}
                />
            </div>
            <h2
                style={{
                    fontWeight: "400",
                    fontSize:
                        size == "small"
                            ? "1.0rem"
                            : size == "mobile"
                            ? "0.8rem"
                            : "1.1rem",
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
