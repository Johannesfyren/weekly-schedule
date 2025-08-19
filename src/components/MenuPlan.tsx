//@ts-nocheck
import { weekNumber } from "weeknumber";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import UniversalWeekPicker from "./UniversalWeekPicker";
import LoadingIndicator from "./LoadingIndicator";
import BirthdayAnnouncer from "./BirthdayAnnouncer";
import { weekToDates } from "../utils/getWeekDatesFromWeek";
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
type WeekDates = {
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
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
    const [currentWeekDates, setCurrentWeekDates] = useState<WeekDates>(
        weekToDates(chosenWeekNumber, new Date().getFullYear())
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
        setCurrentWeekDates(
            weekToDates(chosenWeekNumber, new Date().getFullYear())
        );
    }, [chosenWeekNumber]);

    return (
        <div className="menu-plan-container-bg">
            <div className="menu-plan-container">
                <UniversalWeekPicker
                    chosenWeekNumber={chosenWeekNumber}
                    setChosenWeekNumber={setChosenWeekNumber}
                    setIsLoading={setIsLoading}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        flexWrap: "wrap",
                    }}
                >
                    <BirthdayAnnouncer daysDate={currentWeekDates.mon} />
                    <BirthdayAnnouncer daysDate={currentWeekDates.tue} />
                    <BirthdayAnnouncer daysDate={currentWeekDates.wed} />
                    <BirthdayAnnouncer daysDate={currentWeekDates.thu} />
                    <BirthdayAnnouncer daysDate={currentWeekDates.fri} />
                </div>
                {isLoading && <LoadingIndicator />}

                {!isLoading && (
                    <div className="menu-inputs-container hide-scrollbar">
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
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        alignSelf: "flex-end",
                    }}
                >
                    <button
                        className="btn-floaty-secondary btn-secondary "
                        onClick={() => {
                            // submitMenu();
                            // setRefreshAttendees(true);
                            setMenuOpen(false);
                        }}
                    >
                        Annuller
                    </button>
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
                {/* <button
                    className="btn-primary btn-floaty"
                    onClick={() => {
                        submitMenu();
                        setRefreshAttendees(true);
                        setMenuOpen(false);
                    }}
                >
                    Gem madplan
                </button> */}
            </div>
        </div>
    );
}
