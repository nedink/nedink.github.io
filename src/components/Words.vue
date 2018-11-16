<template>
  <div id="container" class="container">
    <img id="logo" src="../assets/cthulu_new@8x_noborder.png" alt="">
    <div class="input-area">
      <input id="regex-input" class="regex-input" type="text" v-model="input" @keypress="keyPress($event)" @focus="focus($event)" @blur="blur($event)">
      <button id="search-button" class="submit" @click="fetchWords()" @focus="focus($event)" @blur="blur($event)">Search</button>
    </div>
    <div class="result">
      <table>
        <tr v-for="row in words.length / 4" :key="row">

        </tr>
      </table>
    </div>
  </div>
</template>

<script>
const API = "http://api.words-back.cfapps.io";

export default {
  data() {
    return {
      input: "word.*",
      words: []
    };
  },
  mounted() {
    document.getElementById("regex-input").focus();
  },
  methods: {
    focus(event) {
      event.target.style.zIndex = "2";
    },
    blur(event) {
      event.target.style.zIndex = "1";
    },
    keyPress(event) {
      if (event.key === "Enter") this.fetchWords();
    },
    fetchWords() {
      fetch(API + "/words?regex=" + new RegExp(this.input)).then(resp => {
        resp.json().then(resp => {
          this.words = resp;
        });
      });
    }
  }
};
</script>

<style>
.container {
  min-width: 600px;
  width: 60%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#logo {
  margin-top: 60px;
  image-rendering: pixelated;
}
.input-area {
  width: 100%;
  display: flex;
  margin-top: 60px;
}
#regex-input {
  font-size: 1.5rem;
  font-family: "Courier New", Courier, monospace;
  height: 2.5em;
  width: 100%;
  padding: 0 1em 0 1.25em;
  border-radius: 4em 0 0 4em;
}
#search-button {
  font-size: 1.5rem;
  height: 2.5em;
  padding: 0 2em 0 1.25em;
  margin-left: 0.25em;
  border-radius: 0 4em 4em 0;
}

@media screen and (max-width: 767px) {
  .container {
    min-width: unset;
    width: 100%;
    padding: 60px;
  }
  #regex-input {
    font-size: 1rem;
  }
  #search-button {
    font-size: 1rem;
  }
}

@media screen and (max-width: 479px) {
  .container {
    width: 100%;
    padding: 1rem;
  }
  #logo {
    width: 100%;
    height: 100%;
  }
  .input-area {
    flex-wrap: wrap;
    justify-content: center;
  }
  #regex-input {
    font-size: 1.5rem;
    font-family: "Courier New", Courier, monospace;
    height: 64px;
    width: 100%;
    border-radius: 32px 32px 0 0;
    display: block;
    text-align: center;
  }
  #search-button {
    min-width: 0;
    padding: 0;
    /* text-align: center; */
    /* align-content: center; */
    font-size: 1.5rem;
    width: 100%;
    height: 64px;
    margin-top: 4px;
    margin-left: 0;
    /* margin-right: 1em; */
    border-radius: 0 0 32px 32px;
  }
}
</style>

