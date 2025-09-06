//@ts-nocheck
import { weekNumber } from "weeknumber";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import UniversalWeekPicker from "./UniversalWeekPicker";
import LoadingIndicator from "./LoadingIndicator";
import BirthdayAnnouncer from "./BirthdayAnnouncer";
import { Fragment } from "react";
import Event from "./Events/Event";
import { weekToDates } from "../utils/getWeekDatesFromWeek";
import { toast } from "react-toastify";
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
    weekFromBoard,
}) {
    // const [madeChanges, setMadeChanges] = useState(false); // TODO: tilfæj, at man lige skal godkende man lukke uden at gemme
    const [chosenWeekNumber, setChosenWeekNumber] = useState(weekFromBoard);
    const [currentWeekDates, setCurrentWeekDates] = useState<WeekDates>(
        weekToDates(chosenWeekNumber, new Date().getFullYear())
    );

    const [formData, setFormData] = useState<formType>();
    const [isLoading, setIsLoading] = useState(true);
    const weekDays = ["mon", "tue", "wed", "thu", "fri"];

    const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: String(e.target.value) });
    };
    const mobileView = window.innerWidth < 850; //If the screen is mobile sized, we adjust som font sizing acordingly

    const submitMenu = async () => {
        const { data, error } = await supabase
            .from("menu")
            .upsert(formData)
            .eq("week", chosenWeekNumber);
        if (error) {
            toast.error(
                `Madplan for uge ${chosenWeekNumber} blev ikke gemt. Prøv igen`
            );
            console.log(error);
            return;
        }
        toast.success(`Madplan for uge ${chosenWeekNumber} blev gemt`);
    };
    //Lock scroll
    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = "hidden";

        return () => {
            // Restore scroll
            document.body.style.overflow = "";
        };
    }, []);
    //Get the menu from DB
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
        <div
            className="menu-plan-container-bg"
            style={mobileView ? { position: "fixed", top: "0" } : {}}
        >
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
                    {weekDays.map((day, index) => {
                        return (
                            <Fragment key={day}>
                                <BirthdayAnnouncer
                                    daysDate={currentWeekDates[day]}
                                />
                                <Event
                                    daysDate={currentWeekDates[day]}
                                    collapsed={true}
                                />
                            </Fragment>
                        );
                    })}
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
            </div>
        </div>
    );
}
