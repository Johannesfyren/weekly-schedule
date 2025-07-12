type attendType = {
	name: string;
};
export default function Attendance({ name }: attendType) {
	return (
		<div className="attendant-container">
			<div className="avatar"></div>
			<p>{name}</p>
		</div>
	);
}
