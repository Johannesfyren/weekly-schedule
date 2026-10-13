import Attendance from "./Attendance";
import vacancyIcon from "../assets/vacancy-icon.svg";

export default function HolidaySection({ attendees, dayDBName, refetchAttendees }) {
    return (
        <div className="holiday-container">
            <img src={vacancyIcon} alt="" className="holiday-icon" />
            {attendees &&
                attendees
                    .filter((att) => att[dayDBName] === 1) //the 1 represents "yes" to eating
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
    );
}
