//@ts-nocheck
import { weekNumber } from "weeknumber";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import UniversalWeekPicker from "./UniversalWeekPicker";
import LoadingIndicator from "./LoadingIndicator";

export type menuType = {
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRefreshAttendees: React.Dispatch<React.SetStateAction<boolean>>;
};
export type formType = {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    week: number;
    year: number;
};

export default function MenuPlan({
    menuOpen,
    setMenuOpen,
    setRefreshAttendees,
}) {
    // const [madeChanges, setMadeChanges] = useState(false); // TODO: tilfæj, at man lige skal godkende man lukke uden at gemme
    const [chosenWeekNumber, setChosenWeekNumber] = useState(
        weekNumber(new Date())
    );
    const [formData, setFormData] = useState<formType>();
    const [isLoading, setIsLoading] = useState(true);

    const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: String(e.target.value) });
    };

    const submitMenu = async () => {
        const { data, error } = await supabase
            .from("menu")
            .upsert(formData)
            .eq("week", chosenWeekNumber);
        if (error) console.log(error);
    };
    useEffect(() => {
        async function getMenu(weeknumber) {
            const { data } = await supabase
                .from("menu")
                .select("*")
                .eq("week", weeknumber);

            if (data && data.length > 0) {
                setFormData(data[0]);
            } else {
                setFormData({
                    mon: "",
                    tue: "",
                    wed: "",
                    thu: "",
                    fri: "",
                    week: chosenWeekNumber,
                    year: new Date().getFullYear(),
                });
            }

            setIsLoading(false); //set loading spinner when changing the weeknumber
        }
        getMenu(chosenWeekNumber);
    }, [chosenWeekNumber]);

    return (
        <div className="menu-plan-container-bg">
            <div className="menu-plan-container">
                <UniversalWeekPicker
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                    setIsLoading={setIsLoading}
                />
                {isLoading && <LoadingIndicator />}

                {!isLoading && (
                    <div className="menu-inputs-container">
                        <div className="menu-input">
                            <label htmlFor="mon">Mandag</label>
                            <textarea
                                name="mon"
                                onChange={handleFormChange}
                                value={formData ? formData.mon : ""}
                            />
                        </div>
                        <div className="menu-input">
                            <label htmlFor="tue">Tirsdag</label>
                            <textarea
                                name="tue"
                                onChange={handleFormChange}
                                value={formData ? formData.tue : ""}
                            />
                        </div>
                        <div className="menu-input">
                            <label htmlFor="wed">Onsdag</label>
                            <textarea
                                name="wed"
                                onChange={handleFormChange}
                                value={formData ? formData.wed : ""}
                            />
                        </div>
                        <div className="menu-input">
                            <label htmlFor="thu">Torsdag</label>
                            <textarea
                                name="thu"
                                onChange={handleFormChange}
                                value={formData ? formData.thu : ""}
                            />
                        </div>
                        <div className="menu-input">
                            <label htmlFor="fri">Fredag</label>
                            <textarea
                                name="fri"
                                onChange={handleFormChange}
                                value={formData ? formData.fri : ""}
                            />
                        </div>
                    </div>
                )}

                <button
                    className="btn-primary btn-floaty"
                    onClick={() => {
                        submitMenu();
                        setRefreshAttendees(true);
                        setMenuOpen(false);
                    }}
                >
                    Gem madplan
                </button>
            </div>
        </div>
    );
}
