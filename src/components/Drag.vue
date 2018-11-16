<template>
  <div class="container">
    <div class="block-area">
      <div v-for="(block, index) in blocks" :key="index" :id="'b-'+block.name" :class="{ 'grab-block': true }" draggable="true" @click="clicked($event)">
        {{ block.name }}
        <!-- <div class="block"> -->
      </div>
      <span>Block Area</span>
    </div>
    <div class="drop-area">
      <span>Drop Area</span>
    </div>
  </div>
</template>

<script>
class Block {
  constructor(name, x, y) {
    this.name = name;
    this.x = x || 0;
    this.y = y || 0;
  }

  getName() {
    return this.name;
  }

  setX = function(val) {
    this.x = val;
  };

  setY = function(val) {
    this.y = val;
  };
}

export default {
  props: {},
  data() {
    return {
      blocks: [new Block("one"), new Block("two"), new Block("three")]
    };
  },
  mounted() {
    for (const block in this.blocks) {
      block.setX(Math.random() * 600);
      block.setY(Math.random() * 600);
    }
  },
  methods: {
    clicked($event) {
      const targ = $event.target;
      const x = $event.clientX;
      const y = $event.clientY;

      console.log(x);
      console.log(y);
    }
  }
};
</script>

<style>
.container {
  font-size: 2rem;
}
.block-area {
  position: fixed;
  top: 0;
  left: 0;
  height: 200px;
}
.drop-area {
  position: fixed;
  top: 200px;
  left: 0;
  height: 200px;
}
.grab-block {
  background: var(--element-color);
  cursor: -webkit-grab;
  position: fixed;
}
</style>
