//@ts-nocheck
/// <reference types="vite-plugin-svgr/client" />
import { useState } from "react";
import { motion } from "motion/react";
import { supabase } from "../utils/supabaseClient";
import AttYes from "../assets/checkmark.svg?react";
import AttNo from "../assets/cross.svg?react";
import AttMaybe from "../assets/questionmark.svg?react";
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

export default function WeekPlanForm({
    setFormData,
    setCollectiveFormData,
    collectiveFormData,
    chosenWeekNumber,
    formData,
    isLoading,
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
                Intet svar
            </div>

            <GridDay
                dayDBname={"mon"}
                dayName={"Mandag"}
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                setCollectiveFormData={setCollectiveFormData}
                chosenWeekNumber={chosenWeekNumber}
                collectiveFormData={collectiveFormData}
            />
            <GridDay
                dayDBname={"tue"}
                dayName={"Tirsdag"}
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                setCollectiveFormData={setCollectiveFormData}
                chosenWeekNumber={chosenWeekNumber}
                collectiveFormData={collectiveFormData}
            />
            <GridDay
                dayDBname={"wed"}
                dayName={"Onsdag"}
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                setCollectiveFormData={setCollectiveFormData}
                chosenWeekNumber={chosenWeekNumber}
                collectiveFormData={collectiveFormData}
            />
            <GridDay
                dayDBname={"thu"}
                dayName={"Torsdag"}
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                setCollectiveFormData={setCollectiveFormData}
                chosenWeekNumber={chosenWeekNumber}
                collectiveFormData={collectiveFormData}
            />
            <GridDay
                dayDBname={"fri"}
                dayName={"Fredag"}
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                setCollectiveFormData={setCollectiveFormData}
                chosenWeekNumber={chosenWeekNumber}
                collectiveFormData={collectiveFormData}
            />
        </div>
    );
}

function GridDay({
    dayDBname,
    dayName,
    setFormData,
    formData,
    isLoading,
    setCollectiveFormData,
    chosenWeekNumber,
    collectiveFormData,
}) {
    //Find object matching the current week
    const currentWeekData = collectiveFormData.find(
        (week) => week.week === chosenWeekNumber
    );

    const handleChosenDay = (e: React.EventHandler) => {
        if (!formData) return;
        setFormData({
            ...formData,
            [e.currentTarget.dataset.dbname]: Number(
                e.currentTarget.dataset.value
            ),
        });

        //TEST
        const dbName = e.currentTarget.dataset.dbname!;
        const value = Number(e.currentTarget.dataset.value);

        // update the correct week inside collectiveFormData
        setCollectiveFormData((prev) =>
            prev.map((week) =>
                week.week === chosenWeekNumber
                    ? { ...week, [dbName]: value }
                    : week
            )
        );
    };
    return (
        <>
            <div className="container-header">{dayName}</div>
            <div
                data-dbname={dayDBname}
                data-value={"1"}
                onClick={handleChosenDay}
                className={
                    isLoading ? "week-plan-cell-loading " : "week-plan-cell"
                }
            >
                {currentWeekData && currentWeekData[dayDBname] == 1 ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <AttYes
                            style={{ width: "30px", height: "30px" }}
                            className="line"
                        />
                    </motion.div>
                ) : (
                    ""
                )}
            </div>
            <div
                data-dbname={dayDBname}
                data-value={"2"}
                onClick={handleChosenDay}
                className={
                    isLoading ? "week-plan-cell-loading " : "week-plan-cell"
                }
            >
                {currentWeekData && currentWeekData[dayDBname] == 2 ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <AttNo
                            style={{ width: "30px", height: "30px" }}
                            className="line"
                        />
                    </motion.div>
                ) : (
                    ""
                )}
            </div>
            <div
                data-dbname={dayDBname}
                data-value={"3"}
                onClick={handleChosenDay}
                className={
                    isLoading ? "week-plan-cell-loading " : "week-plan-cell"
                }
            >
                {currentWeekData && currentWeekData[dayDBname] == 3 ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <AttMaybe
                            style={{ width: "30px", height: "30px" }}
                            className="line"
                        />
                    </motion.div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}
