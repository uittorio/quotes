import { QuoteData } from "../core/quoteData";

export interface Messenger {
	sendQuote(quote: QuoteData): void;
	sendNotification(quote: QuoteData): void;
}