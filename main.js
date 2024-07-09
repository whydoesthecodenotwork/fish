const fish = document.querySelector(".fish");
const evilFish = document.querySelector(".evil-fish");
const tank = document.querySelector(".tank");

function random(min, max) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
}

function feesh() {
  const tankRects = tank.getClientRects();
  const tWidth = tankRects[0].width;
  const tHeight = tankRects[0].height;
  const fishRects = fish.getBoundingClientRect();
  console.log(tankRects, fishRects);
  const fWidth = fishRects.width;
  const fHeight = fishRects.height;
  const newX = random(0, tWidth - fWidth);
  const newY = random(0, tHeight - fHeight);
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
  evilFish.style.transform = `translate(${tWidth / 2 - fWidth / 2}px, ${tHeight / 2 - fHeight / 2}px)`;
  setTimeout(() => {
    fish.style.transition = `transform 0.4s ease-in-out`;
    evilFish.style.transition = `2s linear`;
    evilFish.style.transitionProperty = `transform, opacity`;
    evilFish.style.opacity = 1;
  }, 1);
  setTimeout(() => {
    setTimeout(feesh, random(800, 3000));
  }, 2000);
}
