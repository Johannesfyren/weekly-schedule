//@ts-ignore
import { weekNumber } from "weeknumber";
export default function compareWeeks(chosenWeekNumber: number) {
    const currentWeekNumber: number = weekNumber(new Date());
    const differenceBetweenWeeks: number = chosenWeekNumber - currentWeekNumber;
    if (differenceBetweenWeeks == 0) {
        return "Nuværende Uge";
    } else if (differenceBetweenWeeks == 1) {
        return "Næste uge";
    } else if (differenceBetweenWeeks == -1) {
        return "Sidste uge";
    } else if (differenceBetweenWeeks > 0) {
        return `Om ${differenceBetweenWeeks} uger`;
    } else if (differenceBetweenWeeks < 0) {
        return `For ${differenceBetweenWeeks * -1} uger siden`;
    }
}
