import { supabase } from "../utils/supabaseClient";
import { weekNumber } from "weeknumber";
import Button from "./Button";
import { useEffect, useState, useRef } from "react";
import AttendancePicker from "./AttendancePicker";

export default function Ribbon() {
	const [showAttPicker, setShowAttPicker] = useState(false);
	const date = new Date();
	const attPickerRef = useRef<HTMLDivElement>(null);

	const getUsers = async () => {
		const { data, error } = await supabase.from("user").select("*");
		if (error) console.log("error: ", error);
		console.log(data);
	};

	useEffect(() => {
		const handleRandomClick = (event: MouseEvent) => {
			console.log(attPickerRef.current);
			console.log(event.target);
			if (attPickerRef.current == null) {
				if (attPickerRef.current != event.target)
					setShowAttPicker(false);
			}
		};
		document.addEventListener("click", handleRandomClick);

		return () => {
			document.removeEventListener("click", handleRandomClick);
		};
	});

	return (
		<div className="ribbon">
			<h1>SSD Madplan</h1>
			<h2>Uge {weekNumber(new Date())}</h2>
			<div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
				<Button
					clickEvent={() =>
						showAttPicker
							? setShowAttPicker(false)
							: setShowAttPicker(true)
					}
					name="Check ind/ud"
					type="Secondary"
					iconName="trash2.svg"
				/>
				<Button
					clickEvent={getUsers}
					name="Opret madplan"
					type="Secondary"
					iconName="trash2.svg"
				/>
			</div>

			{showAttPicker && <AttendancePicker attPickerRef={attPickerRef} />}
		</div>
	);
}
