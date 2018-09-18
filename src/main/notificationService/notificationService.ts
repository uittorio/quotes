import { QuotesDate } from "../../date/date";
import { Frequency } from "../frequency/frequency";
import { NotificationData } from "../notificationData/notificationData";
import { Randomizer } from "../randomizer/randomizer";
import { IStore } from "../store/IStore";

export class NotificationService<T extends NotificationData> {
	private _frequency: Frequency;
	private readonly _notificationData: Array<T>;
	private readonly _timeOfTheDay: QuotesDate;
	private _store: IStore;
	private _randomizer: Randomizer<T>;
	
	constructor(notificationData: Array<T>,
							comparison: Frequency,
							timeOfTheDay: QuotesDate,
							store: IStore,
							randomizer: Randomizer<T>) {
		this._notificationData = notificationData;
		this._frequency = comparison;
		this._timeOfTheDay = timeOfTheDay;
		this._store = store;
		this._randomizer = randomizer;
	}
	
	public hasAlreadySentOn(currentDate: QuotesDate): boolean {
		const notificationSentInDates: Array<number> = this._getNotificationDates();
		const notificationDates = notificationSentInDates.map((time) => QuotesDate.fromTime(time));
		
		return this._frequency.compare(notificationDates, currentDate);
	}
	
	public isValidTime(date: QuotesDate): boolean {
		return date.IsEqualOrAfter(this._timeOfTheDay)
	}
	
	public hasAlreadySeenAll(): boolean {
		return this._getNotificationSent().length === this._notificationData.length
	}
	
	public resetNotifications(): void {
		this._store.delete("notification-sent");
	}
	
	public getRandomNotificationOn(date: QuotesDate): T {
		const notificationSent: Array<string> = this._getNotificationSent();
		const notificationHistory: Array<T> = this._getNotificationHistory();
		const quote: T = this._getRandomNotification();
		
		notificationSent.push(quote.id);
		this._store.set("notification-sent", notificationSent);
		notificationHistory.push(quote);
		this._store.set("notification-history", notificationHistory);
		
		this._addNotificationDate(date);
		
		return quote;
	}
	
	public getLatestNotification(): T | undefined {
		const notificationSentReverted: Array<T> = this._getNotificationHistory().reverse();
		
		return notificationSentReverted[0];
	}
	
	private _addNotificationDate(date: QuotesDate) {
		const notificationTimes: Array<number> = this._getNotificationDates();
		notificationTimes.push(date.getTime());
		this._store.set<number>("notification-dates", notificationTimes);
	}
	
	private _getRandomNotification(): T {
		const quotesToConsider: Array<T> = this._getRemainingNotifications();
		const randomQuoteIndex: number = this._randomizer.get(quotesToConsider);
		
		return quotesToConsider[randomQuoteIndex];
	}
	
	private _getNotificationSent(): Array<string> {
		return this._store.get<string>("notification-sent") || [];
	}
	
	private _getNotificationDates(): Array<number> {
		return this._store.get<number>("notification-dates") || [];
	}
	
	private _getRemainingNotifications(): Array<T> {
		const notificationSent: Array<string> = this._getNotificationSent();
		
		return this._notificationData.filter((quote: T) => {
			return !notificationSent.includes(quote.id);
		});
	}
	
	private _getNotificationHistory(): Array<T> {
		return this._store.get<T>("notification-history") || [];
	}
}