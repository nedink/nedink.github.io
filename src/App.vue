<template>
  <div id="app">
    <words/>
    <drag/>
  </div>
</template>

<script>
import Words from "./components/Words.vue";
import Drag from "./components/Drag.vue";

export default {
  name: "app",
  components: {
    Words,
    Drag
  }
};
</script>

<style>
[draggable] {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  /* Required to make elements draggable in old WebKit */
  -khtml-user-drag: element;
  -webkit-user-drag: element;
  user-select: none;
}
* {
  box-sizing: border-box;
  color: var(--text-color);
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
body {
  margin: 0;
}
:root {
  /* VARS ----------------------------------------- */
  --background-color: #2c3450;
  --element-color: #1e2029;
  --element-focus-color: #21373a;
  --element-hover-color: #21253a;
  --text-color: #cdd6e0;
  --text-color-lighter: #f1f1f7;
  --highlight-color-half: #00ff4c80;
  --highlight-color-quarter: #00ff4c40;
  --highlight-color-none: #00ff4c00;
  --border-radius: 6px;
  /* ---------------------------------------------- */

  background-color: var(--background-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
button:hover,
input:hover {
  animation: hover 100ms;
  /* animation-timing-function: ease-in; */
  color: var(--text-color-lighter);
  background-color: var(--element-hover-color);
}
button:focus,
input:focus {
  animation: focus 200ms;
  background-color: var(--element-focus-color);
  box-shadow: 0 0 0 0.25em var(--highlight-color-half);
  color: var(--text-color-lighter);
}
input {
  font-size: 1rem;
  font-weight: 400;
  background-color: var(--element-color);
  color: var(--text-color-lighter);
  border: none;
  border-radius: var(--border-radius);
  outline: none;
  height: 38px;
  padding: 0.5rem 0.75rem;
}
button {
  font-size: 1rem;
  font-weight: 600;
  overflow: hidden;
  background-color: var(--element-color);
  border: none;
  border-radius: var(--border-radius);
  outline: none;
  cursor: pointer;
  height: 38px;
  padding: 0.5rem 1.5rem;
}
button:hover {
}
#app {
}
@keyframes hover {
  0% {
    background-color: var(--element-color);
  }
  100% {
    background-color: var(--element-hover-color);
  }
}
@keyframes focus {
  0% {
    box-shadow: 0 0 0 1em var(--highlight-color-none);
  }
  100% {
    box-shadow: 0 0 0 0.25em var(--highlight-color-half);
  }
}
</style>
