import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
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
};

export default function WeekPlanForm2({
    setFormData,
    formData,
}: formTypeInherited) {
    const [chosenStatus, setChosenStatus] = useState();

    return (
        <div className="week-plan-container">
            <div className="container-header"></div>
            <div
                className="container-header"
                style={{ alignSelf: "center", justifySelf: "center" }}
            >
                Spiser
            </div>
            <div
                className="container-header"
                style={{
                    alignSelf: "center",
                    justifySelf: "center",
                }}
            >
                Spiser ikke
            </div>
            <div
                className="container-header"
                style={{ alignSelf: "center", justifySelf: "center" }}
            >
                Ingen svar
            </div>
            <GridDay
                dayDBname={"mon"}
                dayName={"Mandag"}
                formData={formData}
                setFormData={setFormData}
            />
            <GridDay
                dayDBname={"tue"}
                dayName={"Tirsdag"}
                formData={formData}
                setFormData={setFormData}
            />
            <GridDay
                dayDBname={"wed"}
                dayName={"Onsdag"}
                formData={formData}
                setFormData={setFormData}
            />
            <GridDay
                dayDBname={"thu"}
                dayName={"Torsdag"}
                formData={formData}
                setFormData={setFormData}
            />
            <GridDay
                dayDBname={"fri"}
                dayName={"fredag"}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
}

function GridDay({ dayDBname, dayName, setFormData, formData }) {
    const handleChosenDay = (e: React.EventHandler) => {
        if (!formData) return;
        setFormData({
            ...formData,
            [e.currentTarget.dataset.dbname]: Number(
                e.currentTarget.dataset.value
            ),
        });
    };
    return (
        <>
            <div className="container-header">{dayName}</div>
            <div
                data-dbname={dayDBname}
                data-value={"1"}
                onClick={handleChosenDay}
                className="week-plan-cell"
            >
                {formData && formData[dayDBname] == 1 ? "1" : "nono"}
            </div>
            <div
                data-dbname={dayDBname}
                data-value={"2"}
                onClick={handleChosenDay}
                className="week-plan-cell"
            >
                {formData && formData[dayDBname] == 2 ? "2" : "nono"}
            </div>
            <div
                data-dbname={dayDBname}
                data-value={"3"}
                onClick={handleChosenDay}
                className="week-plan-cell yes"
            >
                {formData && formData[dayDBname] == 3 ? "3" : "nono"}
            </div>
        </>
    );
}
