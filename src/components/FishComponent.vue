<template>
  <div class="evil-fish" ref="evilFish" @click="fishCPR">
    <img class="fish" src="/fish.png" alt="a fish" title="a fish" draggable="false" ref="fish" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, type Ref } from 'vue';

const props = defineProps({
  tankRect: {
    type: DOMRect,
    required: true
  }
});
const { tankRect } = toRefs(props);

const fish: Ref<HTMLImageElement | null> = ref(null);
const evilFish: Ref<HTMLDivElement | null> = ref(null);

let dead = false;

function random(min: number, max: number) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
}

function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
}

function feesh() {
  if (!fish.value || !evilFish.value) return;
  dead = false;
  const fishRect = evilFish.value.getBoundingClientRect();
  const newX = random(0, tankRect.value.width - fishRect.width);
  const newY = random(0, tankRect.value.height - fishRect.height);
  const distance = dist(newX, newY, fishRect.x, fishRect.y);
  const tankDistance = dist(0, 0, tankRect.value.width, tankRect.value.height);
  if (distance < tankDistance * 1) {
    // feesh();
    // return;
    dead = true;
  }

  const swimTime = (distance / tankDistance) * 6000;
  evilFish.value.style.transition = `${swimTime}ms ease-in-out`;
  if (dead) {
    evilFish.value.style.transition = `${(fishRect.y / tankDistance) * 9000}ms ease-in-out`;
    evilFish.value.style.transform = `translate(${fishRect.x}px, 0px) rotateX(180deg)`;
    evilFish.value.style.filter = `grayscale(1)`;
    return;
  }
  fish.value.style.transform = `rotateY(${newX > fishRect.x ? 180 : 0}deg)`;
  evilFish.value.style.transform = `translate(${newX}px, ${newY}px)`;
  setTimeout(feesh, random(swimTime * 1.2, swimTime * 2));
}

async function fishCPR() {
  console.log('ow');
  if (!dead) return;
  dead = false;
  if (!fish.value || !evilFish.value) return;
  evilFish.value.style.transition = `1s ease-in-out`;
  evilFish.value.style.transform = evilFish.value.style.transform.replace(`180deg`, `0`);
  evilFish.value.style.filter = ``;
  await sleep(2000);
  feesh();
}

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, ms);
  });
}
onMounted(async () => {
  if (!fish.value || !evilFish.value) return;

  let fishRect: DOMRect | undefined;
  while (!fishRect || !fishRect.width || !fishRect.height) {
    fishRect = fish.value.getBoundingClientRect();
    await sleep(1);
  }

  await sleep(1);
  if (!fish.value || !evilFish.value) return;
  evilFish.value.style.transition = `2s linear`;
  evilFish.value.style.transitionProperty = `opacity, filter`;
  evilFish.value.style.opacity = `1`;

  await sleep(3000);
  if (!fish.value || !evilFish.value) return;
  fish.value.style.left = `0`;
  fish.value.style.top = `0`;
  const tWidth = tankRect.value.width;
  const tHeight = tankRect.value.height;
  const fWidth = fishRect.width;
  const fHeight = fishRect.height;
  evilFish.value.style.width = `${fWidth}px`;
  evilFish.value.style.height = `${fHeight}px`;
  fish.value.style.transform = `translate(0,0)`;
  evilFish.value.style.transform = `translate(${tWidth / 2 - fWidth / 2}px, ${tHeight / 2 - fHeight / 2}px)`;

  await sleep(1);
  fish.value.style.transition = `transform 0.4s ease-in-out`;
  feesh();
});
</script>

<style scoped>
.fish {
  display: block;
  position: fixed;
  margin: 0;
  user-select: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.evil-fish {
  /* BANISH THE FISH */
  opacity: 0;
}
</style>
