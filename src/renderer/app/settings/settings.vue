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
               type="time">

        <label for="startUp"
               class="QuoteSettings-label QuoteSettings-labelStartUp">
            Do you want the application to open automatically?
        </label>
        <input id="startUp"
               class="QuoteSettings-input"
               v-model="autoStartUp"
               v-on:change="onStartUpUpdate"
               type="checkbox">
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
			const date = new QuotesDate(this.settingsTime);
			this.time = date.getHoursAndMinutes();
			this.autoStartUp = this.settingsAutoStartUp;
		},
		props: ['settingsTime', 'settingsAutoStartUp'],
		methods: {
			onTimeUpdate: function () {
				ipcRenderer.send('settings-time', this.time);
			},
			onStartUpUpdate: function () {
				ipcRenderer.send('settings-autoStartUp', this.autoStartUp);
			}
		}
	}
</script>
<style lang="scss">
    @import "./settings.scss";
</style>