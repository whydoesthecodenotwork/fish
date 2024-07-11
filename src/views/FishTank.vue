<template>
  <div class="tank" ref="tank">
    <div class="evil-tank" v-if="tankDimensions">
      <FishComponent v-for="index in 1" :key="index" :tankRect="tankDimensions"></FishComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import FishComponent from '../components/FishComponent.vue';

const tank: Ref<HTMLDivElement | null> = ref(null);
const tankDimensions: Ref<DOMRect | null> = ref(null);

function getDimensions() {
  if (!tank.value) return;
  tankDimensions.value = tank.value.getBoundingClientRect();
}

onMounted(getDimensions);
onresize = getDimensions;
</script>

<style>
.title {
  font-family: cursive;
  text-align: center;
  pointer-events: none;
  z-index: -1000;
  position: relative;
}

h1 {
  text-decoration: underline;
}

body {
  overflow: hidden;
  box-sizing: border-box;
}

.tank {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
}

.evil-tank {
  background-image: linear-gradient(to top, #004faa, #00aeff);
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
