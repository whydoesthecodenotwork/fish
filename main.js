const fish = document.querySelector(".fish");
const evilFish = document.querySelector(".evil-fish");
const tank = document.querySelector(".tank");

function random(min, max) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
}

function feesh() {
  const tankRects = tank.getBoundingClientRect();
  const fishRects = fish.getBoundingClientRect();
  const newX = random(0, tankRects.width - fishRects.width);
  const newY = random(0, tankRects.height - fishRects.height);
  const dist = Math.sqrt((newY - fishRects.y) ** 2 + (newX - fishRects.x) ** 2);
  if (dist < 300) {
    feesh();
    return;
  }
  fish.style.transform = `scaleX(${newX > fishRects.x ? -1 : 1})`;
  evilFish.style.transition = `${dist * 2}ms ease-in-out`;
  evilFish.style.transform = `translate(${newX}px, ${newY}px)`;
  setTimeout(feesh, random(Math.max(dist * 3, 500), dist * 4));
}

{
  // world's WORST init function
  const tankRects = tank.getClientRects();
  const tWidth = tankRects[0].width;
  const tHeight = tankRects[0].height;
  const fishRects = fish.getBoundingClientRect();
  const fWidth = fishRects.width;
  const fHeight = fishRects.height;
  evilFish.style.width = `${fWidth}px`;
  evilFish.style.height = `${fHeight}px`;
  evilFish.style.transform = `translate(${tWidth / 2 - fWidth / 2}px, ${tHeight / 2 - fHeight / 2}px)`;
  setTimeout(() => {
    fish.style.transition = `transform 0.4s ease-in-out`;
    evilFish.style.transition = `2s linear`;
    evilFish.style.transitionProperty = `transform, opacity`;
    evilFish.style.opacity = 1;
  }, 1);
  setTimeout(() => {
    feesh();
  }, 3000);
}

// FISH METER
let time = 0;
let score = 0;
let cheated = false;

window.addEventListener("mousedown", (e) => {
  if (e.button === 2) cheated = true;
});

evilFish.addEventListener("mouseenter", () => {
  time = Date.now();
});

function lose() {
  if (cheated) {
    console.error("you rascal,,,");
    score = "0 (haha)";
    cheated = false;
  } else {
    score = Date.now() - time;
  }
  console.log(score);
}

evilFish.addEventListener("mouseleave", lose);
