import { supabase } from "../utils/supabaseClient";
import Attendance from "./Attendance";
export default function AttendancePicker({ attPickerRef }) {
	const getUsers = async () => {
		const { data, error } = await supabase.from("user").select("*");
		if (error) console.log("error: ", error);
		return data;
	};

	return (
		<div className="att-picker-container" ref={attPickerRef}>
			{getUsers.length > 0 && getUsers.map((user) => {})}
			<Attendance name="Joha" />
		</div>
	);
}
