import { weekNumber } from "weeknumber";
export type formType = {
    fk_user: number;
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    week: number;
    year: number;
};
export type formTypeInherited = {
    setFormData: (data: formType) => void;
    formData: formType | undefined;
    setChosenWeekNumber: (data: number) => void;
    chosenWeekNumber: number;
};
export default function WeekPicker({
    formData,
    setFormData,
    setChosenWeekNumber,
    chosenWeekNumber,
}: formTypeInherited) {
    return (
        <div>
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
                defaultValue={chosenWeekNumber}
                style={{
                    width: "70px",
                    height: "30px",
                    color: "black",
                    fontSize: "1.2rem",
                }}
                onChange={(e) => {
                    setFormData({ ...formData, week: e.target.value });
                    setChosenWeekNumber(Number(e.target.value));
                }}
            />
        </div>
    );
}
