import { QuotesDate } from "../../date/date";
import { Frequency } from "./frequency";

export class OnceADay implements Frequency {
	compare(dates: Array<QuotesDate>, dateInFrequency: QuotesDate): boolean {
		return dates.some((date) => {
			return date.isSameDay(dateInFrequency);
		});
	}
}