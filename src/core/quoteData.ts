import { NotificationData } from "../main/notificationData/notificationData";

export interface QuoteData extends NotificationData {
	title: string;
	author: string;
	text: string;
	book: string;
}