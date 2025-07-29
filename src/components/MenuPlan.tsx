import { weekNumber } from "weeknumber";
import { useEffect, useState } from "react";
import Button from "./Button";
import { supabase } from "../utils/supabaseClient";
export type menuType = {
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function MenuPlan({ menuOpen, setMenuOpen }) {
    const [chosenWeekNumber, setChosenWeekNumber] = useState(
        weekNumber(new Date())
    );
    const [formData, setFormData] = useState({
        mon: "",
        tue: "",
        wed: "",
        thu: "",
        fri: "",
        week: chosenWeekNumber,
        year: new Date().getFullYear(),
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: String(e.target.value) });
    };

    const submitMenu = async () => {
        const { data, error } = await supabase.from("menu").upsert(formData);
        if (error) console.log(error);
        console.log(data);
    };
    useEffect(() => {
        async function getMenu(weeknumber) {
            const { data, error } = await supabase
                .from("menu")
                .select("*")
                .eq("week", weeknumber);

            if (data) setFormData(data[0]);
            console.log(data);
        }
        getMenu(chosenWeekNumber);
    }, [chosenWeekNumber]);

    return (
        <div className="menu-plan-container-bg">
            <div className="menu-plan-container">
                <h1>uge {chosenWeekNumber}</h1>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="mon">Mandag</label>
                    <input
                        type="text"
                        name="mon"
                        onBlur={handleFormChange}
                        defaultValue={formData ? formData.mon : ""}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="tue">Mandag</label>
                    <input
                        type="text"
                        name="tue"
                        onBlur={handleFormChange}
                        defaultValue={formData ? formData.tue : ""}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="wed">Mandag</label>
                    <input
                        type="text"
                        name="wed"
                        onBlur={handleFormChange}
                        defaultValue={formData ? formData.wed : ""}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="thu">Mandag</label>
                    <input
                        type="text"
                        name="thu"
                        onBlur={handleFormChange}
                        defaultValue={formData ? formData.thu : ""}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="fri">Mandag</label>
                    <input
                        type="text"
                        name="fri"
                        onBlur={handleFormChange}
                        defaultValue={formData ? formData.fri : ""}
                    />
                </div>
                <Button
                    clickEvent={submitMenu}
                    name="Gem madplan"
                    type="Primary"
                ></Button>
            </div>
        </div>
    );
}
