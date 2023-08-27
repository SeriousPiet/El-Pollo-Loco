class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  throwableObjects = [];
  chickenList = [];
  smallChickenList = [];
  bossList = [];
  salsaBottleList = [];
  statusBar = new StatusBar();
  bottleStatusBar = new BottleStatusbar();
  endbossStatusBar = new EndbossStatusbar();

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.startScreen();
  }

  /**
   * Description: Renders the game scene on the canvas, including background objects, status bar, character, and movable objects.
   * This function is called recursively using requestAnimationFrame for continuous rendering.
   */ draw() {
    this.level = level1;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.endbossStatusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addMovableObjekts();
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Description: Adds various movable objects to the game scene by rendering them on the canvas.
   * This function includes rendering clouds, small chickens, chickens, end bosses, and throwable objects.
   */ addMovableObjekts() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.level.chicken);
    this.addObjectsToMap(this.level.salsaBottle);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
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
   * Description: Initiates the start of the game by setting up game elements and starting the gameplay loop.
   * This function initializes the game level, sets up the keyboard controls,
   * creates the main character, plays background music, starts the rendering loop,
   * configures the game world for the character, and initiates the game loop.
   */ startGame() {
    initLevel();
    this.keyboard = keyboard;
    this.character = new Character();
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
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      calculateDistance(this.character, this.level.endboss[0]);
    }, 100);
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
  }

  /**
   * Description
   * @returns {any}
   */ pepeFindsBottle() {
    this.level.salsaBottle.forEach((bottle) => {
      if (
        this.bottleStatusBar.percentage < 100 &&
        this.character.isColliding(bottle)
      ) {
        bottle.hit(100);
        const newBottlePercentage = this.bottleStatusBar.percentage + 10;
        this.bottleStatusBar.setPercentage(newBottlePercentage);
        removeBottle(bottle, salsaBottleList);
      }
    });
  }

  /**
   * Description
   * @returns {any}
   */ chickenHitPepe() {
    this.level.chicken.forEach((enemy) => {
      if (enemy.energy > 0 && this.character.isColliding(enemy)) {
        enemy.hit(100);
        this.character.hit(20);
        this.statusBar.setPercentage(this.character.energy);
        setTimeout(() => {
          removeChicken(enemy, chickenList);
        }, 1000);
      }
    });
  }

  /**
   * Description
   * @returns {any}
   */ smallChickenHitPepe() {
    this.level.smallChicken.forEach((enemy) => {
      if (enemy.energy > 0 && this.character.isColliding(enemy)) {
        enemy.hit(100);
        this.character.hit(20);
        this.statusBar.setPercentage(this.character.energy);
        setTimeout(() => {
          removeSmallChicken(enemy, smallChickenList);
        }, 1000);
      }
    });
  }

  /**
   * Description
   * @returns {any}
   */ endbossHitPepe() {
    this.level.endboss.forEach((enemy) => {
      if (enemy.energy > 0 && this.character.isColliding(enemy)) {
        enemy.hit(100);
        this.character.hit(20);
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Description
   * @returns {any}
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
   * Description
   * @param {any} chicken
   * @param {any} throwableObject
   * @returns {any}
   */ chickenGotHit(chicken, throwableObject) {
    chicken.hit(100);
    throwableObject.hit(100);
    this.removeThrowObjects(throwableObject, this.throwableObjects);
    setTimeout(() => {
      removeChicken(chicken, chickenList);
    }, 1000);
  }

  /**
   * Description
   * @returns {any}
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
   * Description
   * @param {any} smallChicken
   * @param {any} throwableObject
   * @returns {any}
   */ SmallChickenGotHit(smallChicken, throwableObject) {
    smallChicken.hit(100);
    throwableObject.hit(100);
    this.removeThrowObjects(throwableObject, this.throwableObjects);
    setTimeout(() => {
      removeSmallChicken(smallChicken, smallChickenList);
    }, 1000);
  }

  /**
   * Description
   * @returns {any}
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
   * Description
   * @param {any} endboss
   * @param {any} throwableObject
   * @returns {any}
   */ bossGotHit(endboss, throwableObject) {
    endboss.hit(20);
    throwableObject.hit(100);
    this.endbossStatusBar.setPercentage(endboss.energy);
    this.removeThrowObjects(throwableObject, this.throwableObjects);
    if (endboss.energy == 0) {
      setTimeout(() => {
        removeEndboss(endboss, bossList);
      }, 1000);
    }
  }

  /**
   * Description
   * @returns {any}
   */ checkThrowObjects() {
    if (this.keyboard.D && this.character.energy > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      const newBottlePercentage = this.bottleStatusBar.percentage - 10;
      this.bottleStatusBar.setPercentage(newBottlePercentage);
      return bottle;
    }
  }

  /**
   * Description
   * @param {any} bottleToRemove
   * @param {any} throwableObjects
   * @returns {any}
   */ removeThrowObjects(bottleToRemove, throwableObjects) {
    const index = throwableObjects.indexOf(bottleToRemove);
    if (index !== -1) {
      throwableObjects.splice(index, 1);
    }
  }

  /**
   * Description: Calculates the horizontal distance between the character and the end boss.
   * @param {Character} character - The character object.
   * @param {Endboss} endboss - The end boss object.
   * @returns {number} The absolute horizontal distance between the character and the end boss.
   */ calculateDistance(character, endboss) {
    return Math.abs(character.x - endboss.x);
  }

  /**
   * Description
   * @param {any} objects
   * @returns {any}
   */ addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Description
   * @param {any} mo
   * @returns {any}
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
   * Description
   * @param {any} mo
   * @returns {any}
   */ flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Description
   * @param {any} mo
   * @returns {any}
   */ flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
