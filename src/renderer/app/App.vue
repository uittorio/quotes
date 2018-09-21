<template>
    <div class="App-container" v-if="quote.text">
        <div v-if="loading"
             class="App-loadingContainer">
            <loading class="App-loading"></loading>
        </div>
        <quoteForm v-if="formActive" v-on:cancel="hideForm()"></quoteForm>
        <quote v-if="!formActive" v-bind:quote="quote" class="App-quote"></quote>
        <div v-if="!formActive" class="App-buttonContainer">
            <button v-on:click="activateForm()"
                    class="App-button App-buttonActivate">Add new Quote</button>
        </div>
    </div>
</template>

<script lang="ts">
	import Quote from "../quote/Quote";
	import QuoteForm from "../quoteForm/QuoteForm.vue";
	import Loading from "../loading/Loading.vue";

	export default {
      components: {
      	Quote,
        QuoteForm,
        Loading
      },
      data: () => {
        return {
          formActive: false
        }
      },
      props: ['quote', 'loading'],
      methods: {
      	activateForm: function() {
          this.formActive = true;
        },
        hideForm: function () {
          this.formActive = false;
        }
      }
	}
</script>

<style>
    @font-face {
        font-family: "OpenSans-bold";
        src: url("../fonts/OpenSans-bold.ttf");
    }

    @font-face {
        font-family: "OpenSans-semibold";
        src: url("../fonts/OpenSans-SemiBold.ttf");
    }

    @font-face {
        font-family: "OpenSans-lightitalic";
        src: url("../fonts/OpenSans-LightItalic.ttf");
    }

    @font-face {
        font-family: "OpenSans-light";
        src: url("../fonts/OpenSans-Light.ttf");
    }

    html,body {
        font-family: "OpenSans-light", serif;
        height: 100%;
        margin: 0;
    }

    button {
        border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;
        background: transparent;
        -webkit-font-smoothing: inherit;
        outline: none;
    }

    .App-container {
        position: relative;
        height: 100%;
        padding: 30px 30px 0 30px;
        box-sizing: border-box;
    }

    .App-buttonContainer {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
    }

    .App-button {
        padding: 10px;
        color: aliceblue;
        background-color: #343434;
        border-radius: 4px;
        font-family: "OpenSans-semibold", serif;
        font-size: 13px;
        cursor: pointer;
    }

    .App-button-light {
        background-color: #636363;
    }

    .App-button-light:hover, .App-button-light:focus {
        background-color: #838383;
    }

    .App-button:hover, .App-button:focus {
        background-color: #515151;
    }

    .App-buttonActivate {
        border-radius: 4px 4px 0 0;
    }

    .App-loadingContainer {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }

    .App-loading {
        width: 64px;
        height: 64px;
    }
</style>
