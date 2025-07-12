export type btnType = {
	type: "Primary" | "Secondary";
	name: string;
	clickEvent: React.MouseEventHandler<HTMLButtonElement>;
	iconName?: string;
	customClass?: string;
	btnRef?: React.Ref<HTMLButtonElement>;
};

const icons = import.meta.glob("../assets/*.svg", { eager: true, query: '?url', import: 'default' });

export default function Button({
	type,
	name,
	clickEvent,
	iconName,
	customClass,
	btnRef
}: btnType) {
	const iconUrl = iconName && icons[`../assets/${iconName}`];

	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<button
			ref={btnRef}
				className={`${
					type == "Primary" ? "btn-primary" : "btn-secondary"
				} ${customClass && customClass}`}
				onClick={clickEvent}
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: "3px",
				}}
			>
				{iconName && <img src={iconUrl} alt="" height={"16px"} />}
				{name}
			</button>
		</div>
	);
}
