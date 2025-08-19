export function weekToDates(week: number, year: number): object {
    // ISO weeks start on Monday, week 1 contains Jan 4
    const simple = new Date(year, 0, 4); // Jan 4
    const dayOfWeek = simple.getDay() || 7; // make Sunday=7
    const mondayOfWeek1 = new Date(simple);
    mondayOfWeek1.setDate(simple.getDate() - (dayOfWeek - 1)); // back to Monday

    // Calculate Monday of given week
    const monday = new Date(mondayOfWeek1);
    monday.setDate(mondayOfWeek1.getDate() + (week - 1) * 7);

    // Friday is Monday + 4 days
    const tuesday = new Date(monday);
    const wednesday = new Date(monday);
    const thursday = new Date(monday);
    const friday = new Date(monday);
    tuesday.setDate(monday.getDate() + 1);
    wednesday.setDate(monday.getDate() + 2);
    thursday.setDate(monday.getDate() + 3);
    friday.setDate(monday.getDate() + 4);

    // const format = (date: Date) =>
    //     date.toLocaleDateString("da-DK", {
    //         day: "2-digit",
    //         month: "2-digit",
    //         year: "numeric",
    //     });

    return {
        mon: monday,
        tue: tuesday,
        wed: wednesday,
        thu: thursday,
        fri: friday,
    };
}
