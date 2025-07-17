import { weekNumber } from "weeknumber";
export default function WeekPicker() {
    const currentDate = new Date();
    const dateToWeekFormat =
        currentDate.getFullYear() + "-W" + weekNumber(currentDate);
    return (
        <>
            {console.log(
                currentDate.getFullYear() + "-" + weekNumber(currentDate)
            )}
            <input
                type="week"
                defaultValue={dateToWeekFormat}
                style={{ width: "200px", height: "40px", color: "black" }}
            />
        </>
    );
}
