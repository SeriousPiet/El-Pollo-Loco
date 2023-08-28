let level1;
const chickenList = [];
const smallChickenList = [];
const salsaBottleList = [];
const bossList = [];

/**
 * Description: Initializes the game level by generating Chicken and smallChicken objects,
 * as well as the Endboss, and setting up background objects for the level.
 */ function initLevel() {
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

  const chickenCount = getRandomInt(2, 10);
  const smallChickenCount = getRandomInt(3, 5);
  const salsaBottleCount = getRandomInt(5, 10);

  /**
   * Description: Generates and initializes a specified number of Chicken objects in a loop.
   * For each iteration of the loop, a new Chicken instance is created with a random X-coordinate
   * within the canvas width. The generated Chicken objects are added to the chickenList array.
   * @param {number} chickenCount The number of Chicken objects to generate.
   * @returns {void} This function does not have a specific return value.
   */ for (let i = 0; i < chickenCount; i++) {
    const randomX = getRandomInt(1279, 3837);
    const chicken = new Chicken(randomX);
    chickenList.push(chicken);
  }

  /**
   * Description: Generates and initializes a specified number of smallChicken objects in a loop.
   * For each iteration of the loop, a new smallChicken instance is created with a random X-coordinate
   * within the canvas width. The generated smallChicken objects are added to the chickenList array.
   * @param {number} smallChickenCount The number of smallChicken objects to generate.
   * @returns {void} This function does not have a specific return value.
   */ for (let i = 0; i < smallChickenCount; i++) {
    const randomX = getRandomInt(1279, 3837);
    const smallChicken = new SmallChicken(randomX);
    smallChickenList.push(smallChicken);
  }

    /**
   * Description: Generates and initializes a specified number of salsaBottle objects in a loop.
   * For each iteration of the loop, a new salsaBottle instance is created with a random X-coordinate
   * within the canvas width. The generated salsaBottle objects are added to the chickenList array.
   * @param {number} salsaBottleCount The number of salsaBottle objects to generate.
   * @returns {void} This function does not have a specific return value.
   */ for (let i = 0; i < salsaBottleCount; i++) {
    const randomX = getRandomInt(1279, 5116);
    const imageIndex = Math.floor(Math.random() * 2);
    console.log(imageIndex);
    const salsaBottle = new SalsaBottle(imageIndex ,randomX);
    salsaBottleList.push(salsaBottle);
  }

  const boss = new Endboss();
  bossList.push(boss);

  level1 = new Level(
    smallChickenList,
    chickenList,
    salsaBottleList,
    bossList,
    [new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 1279),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 1279),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 1279),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 1279),
      new BackgroundObject("img/5_background/layers/air.png", 1279 * 2),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        1279 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        1279 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        1279 * 2
      ),
      new BackgroundObject("img/5_background/layers/air.png", 1279 * 3),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        1279 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        1279 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        1279 * 3
      ),
      new BackgroundObject("img/5_background/layers/air.png", 1279 * 4),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        1279 * 4
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        1279 * 4
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        1279 * 4
      ),
    ]
  );
}

/**
 * Discription: Removes a chicken from the given list of chickens.
 * @param {object} chickenToRemove The chicken object to be removed.
 * @param {Array} chickenList The array containing the list of chicken objects.
 * @returns {void} This function does not return a value.
 */ function removeChicken(chickenToRemove, chickenList) {
  const index = chickenList.indexOf(chickenToRemove);
  if (index !== -1) {
    chickenList.splice(index, 1);
  }
}
/**
 * Discription: Removes a small chicken from the given list of small chickens.
 * @param {object} smallChickenToRemove The small chicken object to be removed.
 * @param {Array} smallChickenList The array containing the list of small chicken objects.
 * @returns {void} This function does not return a value.
 */ function removeSmallChicken(smallChickenToRemove, smallChickenList) {
  const index = smallChickenList.indexOf(smallChickenToRemove);
  if (index !== -1) {
    smallChickenList.splice(index, 1);
  }
}

/**
 * Discription: Removes the endboss from the given list of endboss.
 * @param {object} endbossToRemove The endboss object to be removed.
 * @param {Array} bossList The array containing the list of endboss objects.
 * @returns {void} This function does not return a value.
 */ function removeEndboss(endbossToRemove, bossList) {
  const index = bossList.indexOf(endbossToRemove);
  if (index !== -1) {
    bossList.splice(index, 1);
  }
}

/**
 * Discription: Removes bottles from the given list of bottles.
 * @param {object} salsaBottleToRemove The bottle object to be removed.
 * @param {Array} salsaBottleList The array containing the list of bottle objects.
 * @returns {void} This function does not return a value.
 */ function removeBottle(salsaBottleToRemove, salsaBottleList) {
  const index = salsaBottleList.indexOf(salsaBottleToRemove);
  if (index !== -1) {
    salsaBottleList.splice(index, 1);
  }
}