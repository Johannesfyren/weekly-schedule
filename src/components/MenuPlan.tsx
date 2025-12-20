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
    setYear,
    weekFromBoard,
}) {
    // const [madeChanges, setMadeChanges] = useState(false); // TODO: tilfæj, at man lige skal godkende man lukke uden at gemme
    const [chosenWeekNumber, setChosenWeekNumber] = useState(weekFromBoard);
    const [chosenYear, setChosenYear] = useState(setYear);
    const [currentWeekDates, setCurrentWeekDates] = useState<WeekDates>(
        weekToDates(chosenWeekNumber, setYear)
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

    //Check if weekchange exceed 52 or 1'
    useEffect(() => {
        if (chosenWeekNumber > 52) {
            setChosenWeekNumber(1);
            setChosenYear(chosenYear + 1);
        } else if (chosenWeekNumber < 1) {
            setChosenWeekNumber(52);
            setChosenYear(chosenYear - 1);
        }
        console.log("yoyo");
    }, [chosenWeekNumber, chosenYear]);

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
                    year: chosenYear,
                });
            }

            setIsLoading(false); //set loading spinner when changing the weeknumber
        }
        getMenu(chosenWeekNumber);
        setCurrentWeekDates(weekToDates(chosenWeekNumber, chosenYear));
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
                    chosenYear={chosenYear}
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
                                    showDay={true}
                                />
                                <Event
                                    daysDate={currentWeekDates[day]}
                                    collapsed={true}
                                    showDay={true}
                                />
                            </Fragment>
                        );
                    })}
                </div>

                {isLoading && <LoadingIndicator />}

                {!isLoading && (
                    <div className="menu-inputs-container hide-scrollbar">
                        <div className="menu-input">
                            <h2>Mandag</h2>
                            <label
                                htmlFor="mon_link"
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "-8px",
                                }}
                            >
                                Link til opskrift 🔗
                            </label>
                            <input
                                type="text"
                                name="mon_link"
                                onChange={handleFormChange}
                                value={formData ? formData.mon_link : ""}
                                style={{
                                    fontSize: "0.9rem",
                                }}
                            />
                            <label
                                htmlFor="mon"
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "-8px",
                                }}
                            >
                                Menubeskrivelse
                            </label>
                            <textarea
                                name="mon"
                                onChange={handleFormChange}
                                value={formData ? formData.mon : ""}
                            />
                        </div>
                        <hr />

                        <div className="menu-input">
                            <h2>Tirsdag</h2>
                            <label
                                htmlFor="tue_link"
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "-8px",
                                }}
                            >
                                Link til opskrift 🔗
                            </label>
                            <input
                                type="text"
                                name="tue_link"
                                onChange={handleFormChange}
                                value={formData ? formData.tue_link : ""}
                                style={{
                                    fontSize: "0.9rem",
                                }}
                            />
                            <label
                                htmlFor="tue"
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "-8px",
                                }}
                            >
                                Menubeskrivelse
                            </label>
                            <textarea
                                name="tue"
                                onChange={handleFormChange}
                                value={formData ? formData.tue : ""}
                            />
                        </div>

                        <hr />

                        <div className="menu-input">
                            <h2>Onsdag</h2>
                            <label
                                htmlFor="wed_link"
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "-8px",
                                }}
                            >
                                Link til opskrift 🔗
                            </label>
                            <input
                                type="text"
                                name="wed_link"
                                onChange={handleFormChange}
                                value={formData ? formData.wed_link : ""}
                                style={{
                                    fontSize: "0.9rem",
                                }}
                            />
                            <label
                                htmlFor="wed"
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "-8px",
                                }}
                            >
                                Menubeskrivelse
                            </label>
                            <textarea
                                name="wed"
                                onChange={handleFormChange}
                                value={formData ? formData.wed : ""}
                            />
                        </div>
                        <hr />
                        <div className="menu-input">
                            <h2>Torsdag</h2>
                            <label
                                htmlFor="thu_link"
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "-8px",
                                }}
                            >
                                Link til opskrift 🔗
                            </label>
                            <input
                                type="text"
                                name="thu_link"
                                onChange={handleFormChange}
                                value={formData ? formData.thu_link : ""}
                                style={{
                                    fontSize: "0.9rem",
                                }}
                            />
                            <label
                                htmlFor="thu"
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "-8px",
                                }}
                            >
                                Menubeskrivelse
                            </label>
                            <textarea
                                name="thu"
                                onChange={handleFormChange}
                                value={formData ? formData.thu : ""}
                            />
                        </div>
                        <hr />
                        <div className="menu-input">
                            <h2>Fredag</h2>
                            <label
                                htmlFor="fri_link"
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "-8px",
                                }}
                            >
                                Link til opskrift 🔗
                            </label>
                            <input
                                type="text"
                                name="fri_link"
                                onChange={handleFormChange}
                                value={formData ? formData.fri_link : ""}
                                style={{
                                    fontSize: "0.9rem",
                                }}
                            />
                            <label
                                htmlFor="fri"
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "-8px",
                                }}
                            >
                                Menubeskrivelse
                            </label>
                            <textarea
                                name="fri"
                                onChange={handleFormChange}
                                value={formData ? formData.fri : ""}
                            />
                        </div>
                        <hr />
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
