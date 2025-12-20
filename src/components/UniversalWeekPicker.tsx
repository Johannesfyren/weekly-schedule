import type React from "react";
import leftArrow from "../assets/leftarrow.svg";
import rightArrow from "../assets/rightarrow.svg";
import { weekToDateRangeString } from "../utils/weekToDate";
import compareWeeks from "../utils/compareCurrentWeekToChosen";

export type universalWeekpickerType = {
    chosenWeekNumber: number;
    setChosenWeekNumber: React.Dispatch<React.SetStateAction<number>>;
    size?: "small" | "mobile" | undefined;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    chosenYear: number;
};

export default function UniversalWeekPicker({
    chosenWeekNumber,
    setChosenWeekNumber,
    setIsLoading,
    size,
    chosenYear,
}: universalWeekpickerType) {
    if (window.innerWidth < 850) size = "mobile"; //If the screen is mobile sized, we adjust som font sizing acordingly
    const mobileView = window.innerWidth < 850; //If the screen is mobile sized, we adjust som font sizing acordingly

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
                    gap: size == "mobile" ? "15px" : "20px",
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "flex-end",
                }}
            >
                <h2
                    style={{
                        fontWeight: "400",
                        fontSize:
                            size == "small"
                                ? "1.0rem"
                                : size == "mobile"
                                ? "0.6rem"
                                : "1.1rem",
                        color: "#DFDFDF",
                    }}
                >
                    {weekToDateRangeString(chosenWeekNumber, chosenYear)}
                </h2>
                <h2
                    style={
                        mobileView
                            ? { display: "none" }
                            : {
                                  display: "inline-block",
                                  fontWeight: "400",
                                  fontStyle: "italic",
                                  fontSize:
                                      size == "small" ? "0.9rem" : "0.9rem",
                                  color: "#DFDFDF",
                              }
                    }
                >
                    ( {compareWeeks(chosenWeekNumber)} )
                </h2>
            </div>
        </div>
    );
}
