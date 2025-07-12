import Attendance from "./Attendance";
type dayType = {
	dayName: string;
	currentDay: boolean;
};

export default function Day({ dayName, currentDay }: dayType) {
	const attendances = [
		{ ID: 1, name: "Johannes Hergaard" },
		{ ID: 2, name: "Viktoria Pajuste" },
	];
	return (
		<div
			className={
				currentDay ? "day-container current-day" : "day-container"
			}
		>
			<h2>{dayName}</h2>

			{console.log(attendances.length)}
			<div className="attendances-container">
				{attendances.map((att, index) => (
					<Attendance name={att.name} key={index} />
				))}
			</div>
		</div>
	);
}
