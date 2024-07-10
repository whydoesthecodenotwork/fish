<template>
  <h1>LIVE FISH REACTION</h1>
  <div class="tank" ref="tank">
    <div class="evil-tank" v-if="tankDimensions">
      <FishComponent v-for="index in 100" :key="index" :tankRect="tankDimensions"></FishComponent>
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
h1 {
  font-family: cursive;
  text-align: center;
  text-decoration: underline;
}

body {
  overflow: hidden;
  box-sizing: border-box;
}

.tank {
  background-image: linear-gradient(to top, #004faa, #00aeff);
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.evil-tank {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
