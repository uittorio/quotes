import { QuotesDate } from "../../date/date";

export interface Frequency {
	compare(dates: Array<QuotesDate>, dateInFrequency: QuotesDate): boolean;
}