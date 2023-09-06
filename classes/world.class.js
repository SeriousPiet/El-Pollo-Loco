class World {
  canvas;
  ctx;
  keyboard;
  throwableObjects = [];
  chickenList = [];
  smallChickenList = [];
  cloudsList = [];
  coinsList = [];
  bossList = [];
  salsaBottleList = [];
  distanceCharToBoss;
  runInterval;
  camera_x = 0;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.muteImage = document.getElementById("toggleMuteImage");
    let audioControlButton = document.getElementById("toggleMute");
    audioControlButton.addEventListener("click", () => {
      this.toggleBackgroundMusic();
    });
    let toggleCloseButton = document.getElementById("toggleClose");
    toggleCloseButton.addEventListener("click", () => {
      this.returnToStartScreen();
    });
    this.startScreen();
  }

  /**
   * Description: Renders the game scene on the canvas, including background objects, status bar, character, and movable objects.
   * This function is called recursively using requestAnimationFrame for continuous rendering.
   */ draw() {
    if (this.isGameStarted) {
      this.level = level1;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.ctx.translate(-this.camera_x, 0);
      this.addStatusBars();
      this.ctx.translate(this.camera_x, 0);
      this.addMovableObjekts();
      this.ctx.translate(-this.camera_x, 0);
      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
   * Description: Adds various movable objects to the game scene by rendering them on the canvas.
   * This function includes rendering clouds, small chickens, chickens, end bosses, and throwable objects.
   */ addMovableObjekts() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.level.chicken);
    this.addObjectsToMap(this.level.salsaBottle);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Description: Adds various statusbar objects to the game scene by rendering them on the canvas.
   * This function includes rendering statusBar, bottleStatusBar, coinStatusBar and endbossStatusBar objects.
   */ addStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.endbossStatusBar);
  }

  /**
   * Description: Clears the content of the canvas by performing a rectangular clearing operation.
   * This function clears the entire canvas area using the canvas context's clearRect() method.
   */ clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Description: Displays the start screen of the game on the canvas.
   * This function loads and displays the start screen image on the canvas.
   * It also sets up an event listener to detect when any key is pressed to start the game.
   */ startScreen() {
    this.startImage = new Image();
    this.startImage.src = "img/9_intro_outro_screens/start/startscreen_1.png";
    this.startImage.onload = () => {
      this.ctx.drawImage(
        this.startImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.anyKeyStartScreen();
    };
    this.isGameStarted = false;
  }

  /**
   * Description: Listens for a keydown event and triggers specific actions when a key is pressed.
   * If the game has not started yet, it clears the canvas, marks the game as started,
   * and initiates the game by calling the startGame() function.
   */ anyKeyStartScreen() {
    window.addEventListener("keydown", () => {
      if (!this.isGameStarted) {
        this.clearCanvas();
        this.isGameStarted = true;
        this.startGame();
      }
    });
  }

  /**
   * Description: Initiates the start of the game by setting up game elements and starting the gameplay loop.
   * This function initializes the game level, sets up the keyboard controls,
   * creates the main character, plays background music, starts the rendering loop,
   * configures the game world for the character, and initiates the game loop.
   */ startGame() {
    initLevel();
    this.keyboard = keyboard;
    this.character = new Character();
    this.statusBar = new StatusBar();
    this.bottleStatusBar = new BottleStatusbar();
    this.coinStatusBar = new CoinStatusbar();
    this.endbossStatusBar = new EndbossStatusbar();
    this.backgroundmusic_sound = this.character.audioVolume(
      "audio/music.mp3",
      0.025
    );
    this.backgroundmusic_sound.play();
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Discription: Toggles the background music between play and pause states, and updates the mute button image accordingly.
   * This function checks the current state of the background music and toggles it between play and pause.
   * If the music is paused, it will be played, and the mute button image will be set to "img/mute.png".
   * If the music is currently playing, it will be paused, and the mute button image will be set to "img/volume.png".
   */ toggleBackgroundMusic() {
    if (this.isGameStarted) {
      if (this.backgroundmusic_sound.paused) {
        this.backgroundmusic_sound.play();
        this.muteImage.src = "img/mute.png";
      } else {
        this.backgroundmusic_sound.pause();
        this.muteImage.src = "img/volume.png";
      }
    }
  }

  /**
   * Description: Associates the game world with the main character.
   * This function establishes a reference between the main character and the game world instance,
   * allowing the character to interact with and access the game world's properties and methods.
   */ setWorld() {
    this.character.world = this;
  }

  /**
   * Description: Initiates a recurring game loop for collision detection and other game mechanics.
   * This function uses the setInterval method to repeatedly call the checkCollisions() and
   * checkThrowObjects() functions at a fixed interval of 100 milliseconds.
   */ run() {
    this.intervalId = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkThrowObjectsIsDead();
      if (this.level.endboss.length > 0) {
        this.distanceCharToBoss = this.calculateDistance(
          this.character,
          this.level.endboss[0]
        );
      }
    }, 50);
  }

  /**
   * Description: Performs collision detection between various game elements.
   * This function calls methods to check for collisions between the main character and chickens,
   * small chickens, as well as throwable objects and enemies such as chickens and the end boss.
   */ checkCollisions() {
    this.chickenHitPepe();
    this.smallChickenHitPepe();
    this.endbossHitPepe();
    this.bottleHitChicken();
    this.bottleHitSmallChicken();
    this.bottleHitEndboss();
    this.pepeFindsBottle();
    this.pepeFindsCoin();
  }

  /**
   * Description: Handles the event when the main character "Pepe" finds a salsa bottle.
   * This function iterates through the list of salsa bottles in the current game level.
   * If Pepe's bottle status is not full and he collides with a salsa bottle, the bottle is collected,
   * Pepe's bottle status is increased, and the salsa bottle is removed from the list.
   */ pepeFindsBottle() {
    this.level.salsaBottle.forEach((bottle) => {
      if (
        this.bottleStatusBar.percentage < 100 &&
        this.character.isColliding(bottle)
      ) {
        bottle.hit(100);
        bottle.bottleToken_sound.play();
        const newBottlePercentage = this.bottleStatusBar.percentage + 10;
        this.bottleStatusBar.setPercentage(newBottlePercentage);
        removeBottle(bottle, salsaBottleList);
      }
    });
  }

  /**
   * Description: Handles the event when the main character "Pepe" finds a coin.
   * This function iterates through the list of coins in the current game level.
   * If Pepe's coin status is not full and he collides with a coin, the coin is collected,
   * Pepe's coin status is increased, and the coin is removed from the list.
   */ pepeFindsCoin() {
    this.level.coin.forEach((coin) => {
      if (
        this.coinStatusBar.percentage < 100 &&
        this.character.isColliding(coin)
      ) {
        coin.token_sound.play();
        const newCoinPercentage = this.coinStatusBar.percentage + 20;
        this.coinStatusBar.setPercentage(newCoinPercentage);
        removeBottle(coin, coinsList);
      }
    });
  }

  /**
   * Description: Handles the event when a chicken enemy hits the main character "Pepe."
   * This function iterates through the list of chicken enemies in the current game level.
   * If a chicken's energy is greater than 0 and it collides with Pepe, the chicken is defeated,
   * Pepe's energy is reduced, his coin status decreases, and the chicken is removed from the list after a delay.
   */ chickenHitPepe() {
    this.level.chicken.forEach((enemy) => {
      if (enemy.energy > 0 && this.character.isColliding(enemy)) {
        if (
          this.character.isAboveGround() &&
          this.character.y + this.character.height > enemy.y
        ) {
          console.log(this.character.y + this.character.height);
          console.log(enemy.y);
          enemy.hit(100);
          this.character.jump(30);
          setTimeout(() => {
            removeChicken(enemy, chickenList);
          }, 1000);
        } else {
          enemy.hit(100);
          this.character.hit(20);
          this.statusBar.setPercentage(this.character.energy);
          const newCoinPercentage = this.coinStatusBar.percentage - 20;
          this.coinStatusBar.setPercentage(newCoinPercentage);
          setTimeout(() => {
            removeChicken(enemy, chickenList);
          }, 1000);
        }
      }
    });
  }

  /**
   * Description: Handles the event when a small chicken enemy hits the main character "Pepe."
   * This function iterates through the list of small chicken enemies in the current game level.
   * If a small chicken's energy is greater than 0 and it collides with Pepe, the small chicken is defeated,
   * Pepe's energy is reduced, his coin status decreases, and the small chicken is removed from the list after a delay.
   */ smallChickenHitPepe() {
    this.level.smallChicken.forEach((enemy) => {
      if (enemy.energy > 0 && this.character.isColliding(enemy)) {
        console.log(this.character.y + this.character.height);
        console.log(enemy.y);
        console.log(this.character.isAboveGround());
        if (
          this.character.isAboveGround() &&
          this.character.y + this.character.height > enemy.y
        ) {
          console.log("läuft");
          enemy.hit(100);
          this.character.jump(30);
          setTimeout(() => {
            removeSmallChicken(enemy, smallChickenList);
          }, 1000);
        } else {
          enemy.hit(100);
          this.character.hit(20);
          this.statusBar.setPercentage(this.character.energy);
          setTimeout(() => {
            removeSmallChicken(enemy, smallChickenList);
          }, 1000);
        }
      }
    });
  }

  /**
   * Description: Handles the event when Pepe collides with an end boss enemy.
   * This function iterates through the list of end boss enemies in the current game level.
   * If an end boss's energy is greater than 0 and it collides with Pepe, Pepe's energy is reduced,
   * and his status bar percentage is updated.
   */ endbossHitPepe() {
    this.level.endboss.forEach((enemy) => {
      if (enemy.energy > 0 && this.character.isColliding(enemy)) {
        this.character.hit(20);
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Description: Handles the event when a throwable object hits a chicken enemy.
   * This function iterates through the list of throwable objects and the list of chicken enemies in the current game level.
   * If a throwable object collides with a chicken enemy, the chicken and the throwable object are affected.
   * The `chickenGotHit` function is called to handle the collision.
   */ bottleHitChicken() {
    this.throwableObjects.forEach((throwableObject) => {
      this.level.chicken.forEach((chicken) => {
        if (throwableObject.isColliding(chicken)) {
          this.chickenGotHit(chicken, throwableObject);
        }
      });
    });
  }

  /**
   * Description: Handles the collision between a chicken enemy and a throwable object.
   * This function is triggered when a throwable object collides with a chicken enemy.
   * It updates the chicken's and throwable object's energy levels, removes the throwable object from the list,
   * and schedules the removal of the chicken from the game after a delay.
   * @param {any} chicken - The chicken enemy object.
   * @param {any} throwableObject - The throwable object that hit the chicken.
   */ chickenGotHit(chicken, throwableObject) {
    if (throwableObject.energy > 0) {
      chicken.hit(100);
      throwableObject.hit(100);
      setTimeout(() => {
        this.removeThrowObjects(throwableObject, this.throwableObjects);
        removeChicken(chicken, chickenList);
      }, 1000);
    }
  }

  /**
   * Description: Handles the collision between a throwable object and a small chicken enemy.
   * This function is triggered when a throwable object collides with a small chicken enemy.
   * It calls the `SmallChickenGotHit` function to process the collision, which includes updating the small chicken's and throwable object's energy levels,
   * removing the throwable object from the list, and scheduling the removal of the small chicken from the game after a delay.
   */ bottleHitSmallChicken() {
    this.throwableObjects.forEach((throwableObject) => {
      this.level.smallChicken.forEach((smallChicken) => {
        if (throwableObject.isColliding(smallChicken)) {
          this.SmallChickenGotHit(smallChicken, throwableObject);
        }
      });
    });
  }

  /**
   * Description: Handles the collision between a small chicken enemy and a throwable object.
   * This function is triggered when a small chicken enemy collides with a throwable object.
   * It updates the energy levels of both the small chicken and the throwable object after the collision,
   * removes the throwable object from the list, and schedules the removal of the small chicken from the game after a delay.
   * @param {any} smallChicken - The small chicken enemy object.
   * @param {any} throwableObject - The throwable object that collided with the small chicken.
   */ SmallChickenGotHit(smallChicken, throwableObject) {
    if (throwableObject.energy > 0) {
      smallChicken.hit(100);
      throwableObject.hit(100);
      setTimeout(() => {
        this.removeThrowObjects(throwableObject, this.throwableObjects);
        removeSmallChicken(smallChicken, smallChickenList);
      }, 1000);
    }
  }

  /**
   * Description: Handles the collision between a throwable object and an end boss.
   * This function is triggered when a throwable object collides with an end boss.
   * It calls the `bossGotHit` function to process the collision and update the end boss's energy level.
   */ bottleHitEndboss() {
    this.throwableObjects.forEach((throwableObject) => {
      this.level.endboss.forEach((endboss) => {
        if (throwableObject.isColliding(endboss)) {
          this.bossGotHit(endboss, throwableObject);
        }
      });
    });
  }

  /**
   * Description: Handles the collision between the main character's throwable object and an end boss.
   * This function is triggered when a throwable object thrown by the main character collides with an end boss.
   * It calculates the damage based on the character's coin status and updates the end boss's energy level accordingly.
   * It also updates the throwable object's energy level, the end boss's energy bar, and removes the throwable object if necessary.
   * If the end boss's energy reaches zero, it triggers the removal of the end boss from the game world after a delay.
   * @param {any} endboss - The end boss object that got hit.
   * @param {any} throwableObject - The throwable object thrown by the main character.
   */ bossGotHit(endboss, throwableObject) {
    if (throwableObject.energy > 0) {
      if (this.coinStatusBar.percentage == 100) {
        endboss.hit(50);
      } else {
        endboss.hit(20);
      }
      this.endbossStatusBar.setPercentage(endboss.energy);
      throwableObject.hit(100);
      setTimeout(() => {
        this.removeThrowObjects(throwableObject, this.throwableObjects);
      }, 1000);
      if (endboss.energy == 0) {
        setTimeout(() => {
          removeEndboss(endboss, bossList);
        }, 1000);
      }
    }
  }

  /**
   * Description: Checks the conditions for throwing a throwable object and handles the throwable object creation.
   * This function is responsible for checking whether the conditions are met for the main character to throw a throwable object.
   * It verifies if the 'D' key is pressed, the character has enough energy, and the bottle status bar has sufficient percentage.
   * If all conditions are met, it creates a new throwable object, updates the bottle status bar, and adds the throwable object to the list.
   */ checkThrowObjects() {
    let bottle;
    if (
      this.keyboard.D &&
      this.character.energy > 0 &&
      this.bottleStatusBar.percentage > 0
    ) {
      if (!this.character.otherDirection) {
        this.bottle = new ThrowableObject(
          this.character.x + 50,
          this.character.y + 100,
          "right"
        );
      } else {
        this.bottle = new ThrowableObject(
          this.character.x,
          this.character.y + 100,
          "left"
        );
      }
      this.throwableObjects.push(this.bottle);
      const newBottlePercentage = this.bottleStatusBar.percentage - 10;
      this.bottleStatusBar.setPercentage(newBottlePercentage);
      return bottle;
    }
  }

  /**
   * Checks the throwable objects in the collection for energy depletion.
   * If an object's energy reaches 0, it will be removed after a delay.
   */ checkThrowObjectsIsDead() {
    const self = this;
    this.throwableObjects.forEach((throwableObject) => {
      if (throwableObject.energy === 0) {
        setTimeout(() => {
          self.removeThrowObjects(throwableObject, self.throwableObjects);
        }, 500);
      }
    });
  }

  /**
   * Description: Removes a throwable object from the list of throwable objects.
   * This function is responsible for removing a specific throwable object from the list of throwable objects.
   * It takes the throwable object to be removed and the array of throwable objects as parameters,
   * then finds the index of the object in the array and removes it using the 'splice' method.
   * @param {any} bottleToRemove - The throwable object to be removed.
   * @param {Array[]} throwableObjects - The array of throwable objects.
   */ removeThrowObjects(bottleToRemove, throwableObjects) {
    const i = throwableObjects.indexOf(bottleToRemove);
    if (i !== -1) {
      throwableObjects.splice(i, 1);
    }
  }

  /**
   * Description: Calculates the absolute horizontal distance between the character and the end boss.
   * This function calculates and returns the absolute horizontal distance between the character and the endboss.
   * It takes two parameters: the character object and the endboss object.
   * The distance is calculated by taking the absolute difference between the x-coordinate of the character
   * and the x-coordinate of the end boss. This provides the distance between their horizontal positions.
   * @param {Character} character - The character object.
   * @param {Endboss} endboss - The end boss object.
   * @returns {number} The absolute horizontal distance between the character and the end boss.
   */ calculateDistance(character, endboss) {
    return Math.abs(character.x - endboss.x);
  }

  /**
   * Description: Adds a list of objects to the game world's rendering map.
   * This function takes an array of objects as a parameter and iterates through each object.
   * For each object, it calls the addToMap() method to render the object on the game canvas.
   * The function is used to efficiently render multiple objects in the game scene, such as background objects.
   * @param {Array[]} objects - An array of objects to be added to the rendering map.
   */ addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Description: Adds a movable object to the game world's rendering map and renders it on the canvas.
   * This function is responsible for rendering a movable object on the game canvas. It first checks if
   * the object's `otherDirection` property is true, and if so, it temporarily flips the object's image
   * horizontally using the `flipImage` method. Then, it calls the `draw` and `drawFrame` methods of the
   * object to render its current frame on the canvas. If the object's `otherDirection` property is true,
   * it restores the object's original orientation using the `flipImageBack` method.
   * @param {any} mo - The movable object to be added and rendered on the canvas.
   */ addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Description: Flips the image of a movable object horizontally for rendering.
   * This function is used to horizontally flip the image of a movable object for rendering purposes.
   * It saves the current rendering context state, translates the context to the right edge of the object,
   * and then applies a horizontal scaling transformation with a scale of -1, effectively flipping the image.
   * After the image is flipped, the function updates the object's x-coordinate accordingly to maintain
   * its position on the canvas. The flipped image is used during rendering until it is restored with
   * the `flipImageBack` function.
   * @param {any} mo - The movable object whose image will be flipped.
   */ flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Description: Restores the image of a movable object after it has been flipped.
   * This function is used to restore the image of a movable object to its original orientation
   * after it has been flipped using the `flipImage` function. It updates the object's x-coordinate
   * to its original value and then restores the rendering context to the state before the image was flipped.
   * This function should be used after rendering the flipped image to ensure subsequent rendering is correct.
   * @param {any} mo - The movable object whose flipped image will be restored.
   */ flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Resets the game state and returns to the start screen if the game is currently in progress.
   * If the game is running, it stops the game, clears various game-related data structures, and
   * pauses any background music. Finally, it navigates the user back to the start screen.
   */ returnToStartScreen() {
    if (this.isGameStarted) {
      stopGame();
      this.character = null;
      this.setStatusBarsNull();
      this.deleteAllMoveableObjects();
      if (this.backgroundmusic_sound) {
        this.backgroundmusic_sound.pause();
        this.backgroundmusic_sound.currentTime = 0;
        this.muteImage.src = "img/mute.png";
      }
      clearInterval(this.intervalId);
      this.startScreen();
    }
  }

  /**
   * Resets the game's status bars to null values.
   * This function is used to clear the references to various status bars in the game, effectively hiding them.
   */ setStatusBarsNull() {
    this.statusBar = null;
    this.bottleStatusBar = null;
    this.coinStatusBar = null;
    this.endbossStatusBar = null;
  }

  /**
   * Clears all arrays containing movable objects in the game's level.
   * This function removes all small chickens, chickens, salsa bottles, coins, end bosses,
   * clouds, and background objects from their respective arrays within the game's level.
   * It is typically used when resetting the game or starting a new level.
   */ deleteAllMoveableObjects() {
    this.level.smallChicken.splice(0, this.level.smallChicken.length);
    this.level.chicken.splice(0, this.level.chicken.length);
    this.level.salsaBottle.splice(0, this.level.salsaBottle.length);
    this.level.coin.splice(0, this.level.coin.length);
    this.level.endboss.splice(0, this.level.endboss.length);
    this.level.clouds.splice(0, this.level.clouds.length);
    this.level.backgroundObjects.splice(0, this.level.backgroundObjects.length);
  }
}
