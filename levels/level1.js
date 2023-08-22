let level1;
const chickenList = [];
const smallChickenList = [];
function initLevel() {
/**
 * Description: Math.floor() rounds up or down the calculated number from Math.random(),
 * an decimal number which is multiplicated with the rumber range between min and max.
 * The number obtained in this way is added to the minimum in order to move into the number range.
 * So we get any number between 1 and 10, corresponding to the resulting number of chickens in the game.
 * @param {integer} min
 * @param {integer} max
 * @returns {integer}
 */  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const chickenCount = getRandomInt(1, 10);
  const smallChickenCount = getRandomInt(1, 5);

  for (let i = 0; i < chickenCount; i++) {
    const randomX = getRandomInt(0, canvas.width);
    const chicken = new Chicken(randomX);
    chickenList.push(chicken);
  }

  for (let i = 0; i < smallChickenCount; i++) {
    const randomX = getRandomInt(0, canvas.width);
    const smallChicken = new SmallChicken(randomX);
    smallChickenList.push(smallChicken);
  }

  level1 = new Level(
    smallChickenList,
    chickenList,
    [new Endboss()],
    [new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png",719 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png",719 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png",719 * 2),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png",719 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png",719 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png",719 * 3),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png",719 * 4),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png",719 * 4),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png",719 * 4),
    ]
  );
}

function removeChicken(chickenToRemove, chickenList) {
  const index = chickenList.indexOf(chickenToRemove);
  if (index !== -1) {
    chickenList.splice(index, 1);
  }
}

function removeSmallChicken(chickenToRemove, smallChickenList) {
  const index = smallChickenList.indexOf(chickenToRemove);
  if (index !== -1) {
    smallChickenList.splice(index, 1);
  }
}