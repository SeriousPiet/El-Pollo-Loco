let level1;
let chickenList = [];
let smallChickenList = [];
let salsaBottleList = [];
let cloudsList = [];
let coinsList = [];
let bossList = [];
let backgroundList = [];
let arrayIndex = 0;

/**
 * Description: Initializes the game level by generating Chicken and smallChicken objects,
 * as well as the Endboss, and setting up background objects for the level.
 */ function initLevel() {
  spawnChicken();
  spawnSmallChicken();
  spawnSalsaBottle();
  spawnClouds();
  spawnCoins();
  spawnEndboss();

  level1 = new Level(
    smallChickenList,
    chickenList,
    salsaBottleList,
    bossList,
    cloudsList,
    coinsList,
    backgroundList
  );
}

/**
 * Description: Generates a random number between the specified minimum and maximum values (inclusive).
 * The function utilizes Math.floor() to round down the calculated number obtained by multiplying a random decimal
 * with the range between min and max. The resulting value is then added to the minimum to fit within the desired range.
 * This is used to obtain a random number within a specified range, such as generating the number of chickens in the game.
 * @param {number} min The minimum value of the desired range.
 * @param {number} max The maximum value of the desired range.
 * @returns {number} A random number between min and max (inclusive).
 */ function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Description: Generates and initializes a specified number of Chicken objects in a loop.
 * For each iteration of the loop, a new Chicken instance is created with a random X-coordinate
 * within the canvas width. The generated Chicken objects are added to the chickenList array.
 * @param {number} chickenCount The number of Chicken objects to generate.
 * @returns {void} This function does not have a specific return value.
 */ function spawnChicken() {
  const chickenCount = getRandomInt(5, 10);
  for (let i = 0; i < chickenCount; i++) {
    const randomX = getRandomInt(1279, 3837);
    const chicken = new Chicken(randomX);
    chickenList.push(chicken);
  }
}
/**
 * Description: Generates and initializes a specified number of smallChicken objects in a loop.
 * For each iteration of the loop, a new smallChicken instance is created with a random X-coordinate
 * within the canvas width. The generated smallChicken objects are added to the chickenList array.
 * @param {number} smallChickenCount The number of smallChicken objects to generate.
 * @returns {void} This function does not have a specific return value.
 */ function spawnSmallChicken() {
  const smallChickenCount = getRandomInt(3, 5);
  for (let i = 0; i < smallChickenCount; i++) {
    const randomX = getRandomInt(1279, 3837);
    const smallChicken = new SmallChicken(randomX);
    smallChickenList.push(smallChicken);
  }
}

/**
 * Description: Generates and initializes a specified number of salsaBottle objects in a loop.
 * For each iteration of the loop, a new salsaBottle instance is created with a random X-coordinate
 * within the canvas width. The generated salsaBottle objects are added to the chickenList array.
 * @param {number} salsaBottleCount The number of salsaBottle objects to generate.
 * @returns {void} This function does not have a specific return value.
 */ function spawnSalsaBottle() {
  const salsaBottleCount = getRandomInt(5, 10);
  for (let i = 0; i < salsaBottleCount; i++) {
    const randomX = getRandomInt(1279, 5116);
    const imageIndex = Math.floor(Math.random() * 2);
    const salsaBottle = new SalsaBottle(imageIndex, randomX);
    salsaBottleList.push(salsaBottle);
  }
}

/**
 * Description: Generates and initializes a specified number of cloud objects in a loop.
 * For each iteration of the loop, a new cloud instance is created with a random X-coordinate
 * within the canvas width. The generated cloud objects are added to the chickenList array.
 * @param {number} cloudsCount The number of cloud objects to generate.
 * @returns {void} This function does not have a specific return value.
 */ function spawnClouds() {
  const cloudsCount = getRandomInt(5, 10);
  for (let i = 0; i < cloudsCount; i++) {
    const randomX = getRandomInt(1279, 5116);
    const imageIndex = Math.floor(Math.random() * 2);
    const clouds = new Cloud(imageIndex, randomX);
    cloudsList.push(clouds);
  }
}

/**
 * Description: Generates and initializes a specified number of coin objects in a loop.
 * For each iteration of the loop, a new coin instance is created with a random X-coordinate
 * For each iteration of the loop, a new coin instance is created with a random Y-coordinate
 * within the canvas width. The generated coin objects are added to the chickenList array.
 * @param {number} coinsCount The number of coin objects to generate.
 * @returns {void} This function does not have a specific return value.
 */ function spawnCoins() {
  const coinsCount = getRandomInt(5, 10);
  for (let i = 0; i < coinsCount; i++) {
    const randomX = getRandomInt(1279, 5116);
    const randomY = getRandomInt(200, 400);
    const coins = new Coin(randomY, randomX);
    coinsList.push(coins);
  }
}

/**
 * This function creates a new Endboss object and adds it to the bossList array.
 */ function spawnEndboss() {
  const boss = new Endboss();
  bossList.push(boss);
}

/**
 * Discription: Generates a sequence of background objects based on specified conditions.
 * This function iterates through a loop with two nested loops and creates
 * instances of the BackgroundObject class. The loop structure ensures that
 * background objects are created based on the values of 'i' and 'k', and the
 * 'arrayIndex' variable is determined by whether 'i' is even or odd.
 * @param {Array} backgroundList - An array where generated BackgroundObject instances are stored.
 */ for (let i = 0; i < 5; i++) {
  if (i % 2 === 0) {
    arrayIndex = 0;
  } else {
    arrayIndex = 1;
  }
  for (let k = 0; k < 4; k++) {
    const backgroundImage = new BackgroundObject(k, i, arrayIndex);
    backgroundList.push(backgroundImage);
  }
}

/**
 * Discription: Removes a chicken from the given list of chickens.
 * @param {object} chickenToRemove The chicken object to be removed.
 * @param {Array} chickenList The array containing the list of chicken objects.
 */ function removeChicken(chickenToRemove, chickenList) {
  const i = chickenList.indexOf(chickenToRemove);
  if (i !== -1) {
    chickenList.splice(i, 1);
  }
}
/**
 * Discription: Removes a small chicken from the given list of small chickens.
 * @param {object} smallChickenToRemove The small chicken object to be removed.
 * @param {Array} smallChickenList The array containing the list of small chicken objects.
 */ function removeSmallChicken(smallChickenToRemove, smallChickenList) {
  const i = smallChickenList.indexOf(smallChickenToRemove);
  if (i !== -1) {
    smallChickenList.splice(i, 1);
  }
}

/**
 * Discription: Removes the endboss from the given list of endboss.
 * @param {object} endbossToRemove The endboss object to be removed.
 * @param {Array} bossList The array containing the list of endboss objects.
 */ function removeEndboss(endbossToRemove, bossList) {
  const i = bossList.indexOf(endbossToRemove);
  if (i !== -1) {
    bossList.splice(i, 1);
  }
}

/**
 * Discription: Removes bottles from the given list of bottles.
 * @param {object} salsaBottleToRemove The bottle object to be removed.
 * @param {Array} salsaBottleList The array containing the list of bottle objects.
 */ function removeBottle(salsaBottleToRemove, salsaBottleList) {
  const i = salsaBottleList.indexOf(salsaBottleToRemove);
  if (i !== -1) {
    salsaBottleList.splice(i, 1);
  }
}

/**
 * Discription: Removes coin from the given list of coins.
 * @param {object} coinToRemove The coin object to be removed.
 * @param {Array} coinsList The array containing the list of coin objects.
 */ function removeBottle(coinToRemove, coinsList) {
  const i = coinsList.indexOf(coinToRemove);
  if (i !== -1) {
    coinsList.splice(i, 1);
  }
}
