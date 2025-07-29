export function weekToDateRangeString(week: number, year: number): string {
    // Find the first day of the year
    const firstDayOfYear = new Date(year, 0, 1);
    // Find the first Monday of the year
    const firstMondayOffset = (8 - firstDayOfYear.getDay()) % 7;
    const firstMonday = new Date(year, 0, 1 + firstMondayOffset);

    // Calculate the Monday of the given week
    const monday = new Date(firstMonday);
    monday.setDate(firstMonday.getDate() + (week - 1) * 7);

    // Friday is 4 days after Monday
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    // Format helper
    const format = (date: Date) =>
        date.toLocaleDateString("da-DK").replace(/\//g, "-"); // "dd-mm-yyyy"

    return `${format(monday)} - ${format(friday)}`;
}
