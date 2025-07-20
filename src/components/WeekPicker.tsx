import { weekNumber } from "weeknumber";
export default function WeekPicker({ formData, setFormData }) {
    const currentDate = new Date();

    return (
        <>
            {console.log(
                currentDate.getFullYear() + "-" + weekNumber(currentDate)
            )}
            <label
                htmlFor="week-input"
                style={{
                    width: "50px",
                    height: "30px",
                    color: "black",
                    fontSize: "1.2rem",
                }}
            >
                Ugenummer{": "}
            </label>
            <input
                type="number"
                min={1}
                step={1}
                max={52}
                name="week-input"
                defaultValue={weekNumber(currentDate)}
                style={{
                    width: "70px",
                    height: "30px",
                    color: "black",
                    fontSize: "1.2rem",
                }}
                onBlur={(e) =>
                    setFormData({ ...formData, week: e.target.value })
                }
            />
        </>
    );
}
