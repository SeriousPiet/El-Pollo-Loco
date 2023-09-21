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
  IMAGES_DEADSCREEN = [
    "./img/9_intro_outro_screens/game_over/oh no you lost!.png",
    "./img/9_intro_outro_screens/game_over/you lost.png",
  ];
  IMAGES_WINSCREEN = [
    "./img/9_intro_outro_screens/game_over/game over!.png",
    "./img/9_intro_outro_screens/game_over/game over.png",
  ];

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
      document.getElementById("ingameButtons").style.display = "none";
      document.getElementById("startMenu").style.display = "flex";
      this.returnToStartScreen();
    });
    this.startScreen();
  }

  /**
   * Description: Renders the game scene on the canvas, including background objects, status bar, character, and movable objects.
   */ draw() {
    if (this.isGameStarted) {
      this.level = level1;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addMovableObjekts();
      this.ctx.translate(-this.camera_x, 0);
      this.addStatusBars();
      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
   * Description: Adds various movable objects to the game scene by rendering them on the canvas.
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
   */ addStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.endbossStatusBar);
  }

  /**
   * Description: Clears the content of the canvas by performing a rectangular clearing operation.
   */ clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Description: Displays the start screen of the game on the canvas.
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
      this.clickStart();
    };
    this.isGameStarted = false;
    document.getElementById("canvas").style.filter = "blur(0px)";
  }

  /**
   * Description: Listens for a click event and triggers specific actions when the left mouse button is pressed..
   */ clickStart() {
    document.getElementById("toggleStart").addEventListener("click", () => {
      if (!this.isGameStarted) {
        document.getElementById("ingameButtons").style.display = "grid";
        document.getElementById("startMenu").style.display = "none";
        this.clearCanvas();
        this.isGameStarted = true;
        this.startGame();
      }
    });
  }

  /**
   * Description: Initiates the start of the game by setting up game elements and starting the gameplay loop.
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
   */ toggleBackgroundMusic() {
    if (this.isGameStarted) {
      if (this.backgroundmusic_sound.paused) {
        this.backgroundmusic_sound.play();
        this.muteImage.src = "img/10_html_design/mute.png";
      } else {
        this.backgroundmusic_sound.pause();
        this.muteImage.src = "img/10_html_design/volume.png";
      }
    }
  }

  /**
   * Description: Associates the game world with the main character.
   */ setWorld() {
    this.character.world = this;
  }

  /**
   * Description: Initiates a recurring game loop for collision detection and other game mechanics.
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
   */ chickenHitPepe() {
    this.level.chicken.forEach((enemy) => {
      if (enemy.energy > 0 && this.character.isColliding(enemy)) {
        if (
          this.character.isAboveGround() &&
          this.character.y + this.character.height > enemy.y
        ) {
          enemy.hit(100);
          this.character.jump(30);
          this.removaleTimerChicken(enemy);
        } else {
          this.hitCounter(enemy);
          this.removaleTimerChicken(enemy);
        }
      }
    });
  }

  /**
   * Removes a chicken from a list after a specified delay.
   * @param {Object} enemy - The chicken enemy object to be removed.
   */ removaleTimerChicken(enemy) {
    setTimeout(() => {
      removeChicken(enemy, chickenList);
    }, 1000);
  }

  /**
   * Description: Handles the event when a small chicken enemy hits the main character "Pepe."
   */ smallChickenHitPepe() {
    this.level.smallChicken.forEach((enemy) => {
      if (enemy.energy > 0 && this.character.isColliding(enemy)) {
        if (
          this.character.isAboveGround() &&
          this.character.y + this.character.height > enemy.y
        ) {
          enemy.hit(100);
          this.character.jump(30);
          this.removaleTimerSmallChicken(enemy);
        } else {
          this.hitCounter(enemy);
          this.removaleTimerSmallChicken(enemy);
        }
      }
    });
  }

  /**
   * Removes a small chicken from a list after a specified delay.
   */ removaleTimerSmallChicken(enemy) {
    setTimeout(() => {
      removeSmallChicken(enemy, smallChickenList);
    }, 1000);
  }

  /**
   * Handles a hit event, updating character and enemy health, as well as status bars.
   */ hitCounter(enemy) {
    const newCoinPercentage = this.coinStatusBar.percentage - 20;
    enemy.hit(100);
    this.character.hit(20);
    this.statusBar.setPercentage(this.character.energy);
    this.coinStatusBar.setPercentage(newCoinPercentage);
  }

  /**
   * Description: Handles the event when Pepe collides with an end boss enemy.
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
   * Description: Handles the event when a throwable object hits a small chicken enemy.
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
   * Description: Handles the event when a throwable object hits the endboss.
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
   * Description: Handles the collision between a throwable object and the endboss.
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
   */ checkThrowObjects() {
    let bottle;
    if (
      this.throwableObjects.length === 0 &&
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
   * Discription: If an object's energy reaches 0, it will be removed after a delay.
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
   */ removeThrowObjects(bottleToRemove, throwableObjects) {
    const i = throwableObjects.indexOf(bottleToRemove);
    if (i !== -1) {
      throwableObjects.splice(i, 1);
    }
  }

  /**
   * Description: Calculates the absolute horizontal distance between the character and the end boss.
   */ calculateDistance(character, endboss) {
    return Math.abs(character.x - endboss.x);
  }

  /**
   * Description: Adds a list of objects to the game world's rendering map.
   */ addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Description: Adds a movable object to the game world's rendering map and renders it on the canvas.
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
   */ flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Description: Restores the image of a movable object after it has been flipped.
   */ flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Discription: Resets the game state and returns to the start screen if the game is currently in progress.
   */ returnToStartScreen() {
    if (this.isGameStarted) {
      stopGame();
      this.character = null;
      this.setStatusBarsNull();
      this.deleteAllMoveableObjects();
      this.stopBackgroundMusic();
      clearInterval(this.intervalId);
      this.startScreen();
    }
  }

  /**
   * Discription: Returns to the end screen, stopping the game and performing necessary cleanup.
   */ returnToEndScreen() {
    stopGame();
    this.stopBackgroundMusic();
    this.settingsEndScreen();
    clearInterval(this.intervalId);
    document
      .getElementById("backToMainMenuEndScreen")
      .addEventListener("click", () => {
        this.startScreen();
        document.getElementById("startMenu").style.display = "flex";
        this.character = null;
        this.setStatusBarsNull();
        this.deleteAllMoveableObjects();
      });
  }

  /**
   * Discription: This function applies a blur filter to the "canvas" element, hides the "ingameButtons," and displays the "endScreen" element as a flex container. Depending on the character's energy level, it generates either the dead screen path or the win screen path.
   */ settingsEndScreen() {
    document.getElementById("canvas").style.filter = "blur(5px)";
    document.getElementById("ingameButtons").style.display = "none";
    document.getElementById("endScreen").style.display = "flex";
    if (this.character.energy == 0) {
      this.generateDeadScreenPath();
    } else {
      this.generateWinScreenPath();
    }
  }

  /**
   * Discription: Generates a random background image for the dead screen and sets it as the background of the "endScreen" element.
   */ generateDeadScreenPath() {
    let random_image = Math.floor(
      Math.random() * this.IMAGES_DEADSCREEN.length
    );
    let deadScreenPath = '"' + this.IMAGES_DEADSCREEN[random_image] + '"';
    document.getElementById("endScreen").style.backgroundImage =
      "url(" + deadScreenPath + ")";
  }

  /**
   * Discription: Generates a random image path from the IMAGES_WINSCREEN array and sets it as the background image of the "endScreen" element.
   */ generateWinScreenPath() {
    let random_image = Math.floor(Math.random() * this.IMAGES_WINSCREEN.length);
    let deadScreenPath = '"' + this.IMAGES_WINSCREEN[random_image] + '"';
    document.getElementById("endScreen").style.backgroundImage =
      "url(" + deadScreenPath + ")";
  }

  /**
   * Discription: Pauses and resets the background music if it is currently playing and updates the mute button image.
   */ stopBackgroundMusic() {
    if (this.backgroundmusic_sound) {
      this.backgroundmusic_sound.pause();
      this.backgroundmusic_sound.currentTime = 0;
      this.muteImage.src = "img/10_html_design/mute.png";
    }
  }

  /**
   * Discription: This function is used to clear the references to various status bars in the game, effectively resets the game's status bars to null values.
   */ setStatusBarsNull() {
    this.statusBar = null;
    this.bottleStatusBar = null;
    this.coinStatusBar = null;
    this.endbossStatusBar = null;
  }

  /**
   * Discription: Clears all arrays containing movable objects in the game's level.
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
