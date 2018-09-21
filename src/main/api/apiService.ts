import * as https from "https";
const axios = require('axios');

export class ApiService {
	public static get<T>(url: string): Promise<T> {
		return new Promise((resolve: (data: T) => void) => {
			https.get(url, (resp: any) => {
				let data = "";
				
				resp.on('data', (chunk: any) => {
					data += chunk;
				});
				
				resp.on('end', () => {
					resolve(JSON.parse(data));
				});
			});
		});
	}
	
	public static update<T>(url: string, data: T): Promise<T> {
		return axios.put(url, data)
			.then(function (response) {
				return response.data.data;
			})
			.catch(function (error) {
				return error;
			});
	}
}