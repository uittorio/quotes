export class QuotesDate {
	public date: Date;
	
	constructor(date?: string) {
		if (date) {
			this.date = new Date(date);
		} else {
			this.date = new Date();
		}
	}
	
 	static hourMinutes(hour: number, minute: number): QuotesDate {
		const date = new QuotesDate();
		date.setHours(hour);
		date.setMinutes(minute);
	 
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date;
	}
	
	static yearMonthDayHourMinute(year: number, month: number, day: number, hour: number, minute: number): QuotesDate{
		const date = new QuotesDate();
		date.date.setFullYear(year, month, day);
		date.date.setHours(hour);
		date.date.setMinutes(minute);
		return date;
	}
	
	static fromTime(dateTime: number): QuotesDate {
		const date: QuotesDate = new QuotesDate();
		date.setTime(dateTime);
		
		return date;
	}
	
	static fromTimeInput(timeInput: string): QuotesDate {
		const date: QuotesDate = new QuotesDate();
		const hoursMinutes = timeInput.split(":");
		date.setHours(parseInt(hoursMinutes[0]));
		date.setMinutes(parseInt(hoursMinutes[1]));
		
		return date;
	}
	
	static now(): QuotesDate {
		return new QuotesDate();
	}
	
	private setHours(hours: number) {
		this.date.setHours(hours);
	}
	
	private setTime(time: number) {
		this.date.setTime(time);
	}
	
	setMinutes(minutes: number) {
		this.date.setMinutes(minutes);
	}
	
	setSeconds(number: number) {
		this.date.setSeconds(number);
	}
	
	setMilliseconds(milliseconds: number) {
		this.date.setMilliseconds(milliseconds);
	}
	
	IsEqualOrAfter(date: QuotesDate) {
		return this.date.getHours() >= date.date.getHours()
			&& this.date.getMinutes() >= date.date.getMinutes();
	}
	
	IsEqual(date: QuotesDate) {
		return this.getTime() === date.getTime();
	}
	
	public getTime() {
		return this.date.getTime();
	}
	
	public getYear() {
		return this.date.getFullYear();
	}
	
	public getMonth() {
		return this.date.getMonth();
	}
	
	public getDate() {
		return this.date.getDate();
	}
	
	
	public getHoursAndMinutes() {
		let hours: string;
		let minutes: string;
		const dateHours: number = this.date.getHours();
		const dateMinutes: number = this.date.getMinutes();
		
		if (dateHours < 10) {
			hours = "0" + dateHours;
		} else {
			hours = dateHours.toString();
		}
		
		if (dateMinutes < 10) {
			minutes = "0" + dateMinutes
		} else {
			minutes = dateMinutes.toString();
		}
		
		return hours + ":" + minutes;
	}
	
	isSameDay(date: QuotesDate) {
		return date.getYear() === this.getYear() &&
			date.getMonth() === this.getMonth() &&
			date.getDate() === this.getDate();
	}
	
	isSameMinute(date: QuotesDate) {
		return date.getYear() === this.getYear() &&
			date.getMonth() === this.getMonth() &&
			date.getDate() === this.getDate() &&
			date.date.getMinutes() === this.date.getMinutes();
	}
}