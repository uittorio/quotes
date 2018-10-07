<template>
    <div class="QuoteSettings">
        <label for="frequency"
               class="QuoteSettings-label">
            What time do you want to receive a notification?
        </label>
        <input id="frequency"
               class="QuoteSettings-input"
               v-model="time"
               v-on:change="onTimeUpdate"
               @change="onTimeUpdate"
               type="time">
    </div>

</template>

<script lang="ts">
	import { QuotesDate } from "../../../date/date";
    import * as Electron from "electron";
    import ipcRenderer = Electron.ipcRenderer;

	export default {
		name: 'QuoteSettings',
		data: function () {
			return {
				time: ""
			}
		},
		created: function () {
			console.log(this.settingsTime);
			const date = new QuotesDate(this.settingsTime);
			this.time = date.getHoursAndMinutes();
			console.log(this.time);
		},
		props: ['settingsTime'],
		methods: {
			onTimeUpdate: function () {
              ipcRenderer.send('settings', this.time);
			}
		}
	}
</script>
<style lang="scss">
    @import "./settings.scss";
</style>