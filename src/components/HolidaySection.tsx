import Attendance from "./Attendance";
import vacancyIcon from "../assets/vacancy-icon.svg";

export default function HolidaySection({ attendees, dayDBName, refetchAttendees }) {
    if (attendees && attendees.filter((att) => att[dayDBName] === 4).length < 1) return; //dont return any JSX if noone is on holiday

    return (
        <div className="holiday-wrapper">
            <div className="holiday-iconheader-container">
                <h2 className="holiday-header">På ferie</h2>
                <img src={vacancyIcon} alt="" className="holiday-icon" />
            </div>
            <div className="holiday-container">
                <div className="holiday-container-overlay "></div>
                {attendees &&
                    attendees
                        .filter((att) => att[dayDBName] === 4) //the 4 represents "holiday" and therefore no to eating
                        .map((att, index: any) => (
                            <Attendance
                                id={att.user.id}
                                name={att.user.name}
                                key={att.user.id}
                                imgUrl={att.user.img_ref}
                                refetchAttendees={refetchAttendees}
                            />
                        ))}
            </div>
        </div>
    );
}
