import { weekNumber } from "weeknumber";
import { useEffect, useState } from "react";
import Button from "./Button";
import { supabase } from "../utils/supabaseClient";
import UniversalWeekPicker from "./UniversalWeekPicker";

export type menuType = {
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

export default function MenuPlan({ menuOpen, setMenuOpen }) {
    // const [madeChanges, setMadeChanges] = useState(false); // TODO: tilfæj, at man lige skal godkende man lukke uden at gemme
    const [chosenWeekNumber, setChosenWeekNumber] = useState(
        weekNumber(new Date())
    );
    const [formData, setFormData] = useState<formType>();

    const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: String(e.target.value) });
    };

    const submitMenu = async () => {
        const { data, error } = await supabase
            .from("menu")
            .upsert(formData)
            .eq("week", chosenWeekNumber);
        if (error) console.log(error);
        console.log(data);
    };
    useEffect(() => {
        async function getMenu(weeknumber) {
            const { data, error } = await supabase
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
            console.log(data);
        }
        getMenu(chosenWeekNumber);
    }, [chosenWeekNumber]);

    return (
        <div className="menu-plan-container-bg">
            <div className="menu-plan-container">
                {/* <h1>uge {chosenWeekNumber}</h1> */}
                <UniversalWeekPicker
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                />
                {/* <Button
                    clickEvent={submitMenu}
                    name="Gem madplan"
                    type="Primary"
                    customClass="btn-floaty"
                ></Button> */}

                <div className="menu-inputs-container">
                    <div className="menu-input">
                        <label htmlFor="mon">Mandag</label>
                        <textarea
                            name="mon"
                            onChange={handleFormChange}
                            defaultValue={formData ? formData.mon : ""}
                        />
                    </div>
                    <div className="menu-input">
                        <label htmlFor="tue">Tirsdag</label>
                        <textarea
                            name="tue"
                            onChange={handleFormChange}
                            defaultValue={formData ? formData.tue : ""}
                        />
                    </div>
                    <div className="menu-input">
                        <label htmlFor="wed">Onsdag</label>
                        <textarea
                            name="wed"
                            onChange={handleFormChange}
                            defaultValue={formData ? formData.wed : ""}
                        />
                    </div>
                    <div className="menu-input">
                        <label htmlFor="thu">Torsdag</label>
                        <textarea
                            name="thu"
                            onChange={handleFormChange}
                            defaultValue={formData ? formData.thu : ""}
                        />
                    </div>
                    <div className="menu-input">
                        <label htmlFor="fri">Fredag</label>
                        <textarea
                            name="fri"
                            onChange={handleFormChange}
                            defaultValue={formData ? formData.fri : ""}
                        />
                    </div>
                </div>
                <button className="btn-primary btn-floaty" onClick={submitMenu}>
                    Gem madplan
                </button>
                {/* <Button
                    clickEvent={submitMenu}
                    name="Gem madplan"
                    type="Primary"
                    customClass="btn-floaty"
                ></Button> */}
            </div>
        </div>
    );
}
