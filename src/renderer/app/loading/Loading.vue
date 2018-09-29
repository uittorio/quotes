<template>
    <div class="lds-dual-ring"></div>
</template>

<script lang="ts">
	export default {
		name: "Loading"
	}
</script>

<style>
    .lds-dual-ring {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #373737;
        border-color: #373737 transparent #373737 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
