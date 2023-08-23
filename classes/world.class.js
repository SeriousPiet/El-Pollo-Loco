class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];
  chickenList = [];
  smallChickenList = [];
  backgroundmusic_sound = this.audioVolume("audio/music.mp3", 0.025);

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
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

  draw() {
    this.level = level1;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.level.chicken);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  audioVolume(src, volume) {
    let audio = new Audio(src);
    audio.volume = volume;
    return audio;
  }

  anyKeyStartScreen() {
    window.addEventListener("keydown", () => {
      if (!this.isGameStarted) {
        this.clearCanvas();
        this.isGameStarted = true;
        this.startGame();
      }
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  startGame() {
    initLevel();
    this.backgroundmusic_sound.play();
    this.keyboard = keyboard;
    this.character = new Character();
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 100);
  }

  checkCollisions() {
    this.chickenHitPepe();
    this.smallChickenHitPepe();
    this.bottleHitChicken();
    this.bottleHitSmallChicken();
    this.bottleHitEndboss();
  }

  chickenHitPepe() {
    this.level.chicken.forEach((enemy) => {
        if (enemy.energy > 0 && this.character.isColliding(enemy)) {
          this.character.hit(20);
          this.statusBar.setPercentage(this.character.energy);
        }
    });
  }

  smallChickenHitPepe() {
    this.level.smallChicken.forEach((enemy) => {
      if (enemy.energy > 0 && this.character.isColliding(enemy)) {
        this.character.hit(20);
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  bottleHitChicken() {
    this.throwableObjects.forEach((throwableObject) => {
      this.level.chicken.forEach((chicken) => {
        if (throwableObject.isColliding(chicken)) {
          chicken.hit(100);
          throwableObject.hit(100);
          this.removeThrowObjects(throwableObject, this.throwableObjects);
          setTimeout(() => {
            removeChicken(chicken, chickenList);
          }, 1000);
        }
      });
    });
  }

  bottleHitSmallChicken() {
    this.throwableObjects.forEach((throwableObject) => {
      this.level.smallChicken.forEach((smallChicken) => {
        if (throwableObject.isColliding(smallChicken)) {
          smallChicken.hit(100);
          throwableObject.hit(100);
          this.removeThrowObjects(throwableObject, this.throwableObjects);
          setTimeout(() => {
            removeSmallChicken(smallChicken, smallChickenList);
          }, 1000);
        }
      });
    });
  }

  bottleHitEndboss() {
    this.throwableObjects.forEach((throwableObject) => {
      this.level.endboss.forEach((endboss) => {
        if (throwableObject.isColliding(endboss)) {
          endboss.hit(20);
          throwableObject.hit(100);
          this.removeThrowObjects(throwableObject, this.throwableObjects);
          if (endboss.energy == 0) {
            setTimeout(() => {
              removeEndboss(endboss, bossList);
            }, 1000);
          }
        }
      });
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      return bottle;
    }
  }

  removeThrowObjects(bottleToRemove, throwableObjects) {
    const index = throwableObjects.indexOf(bottleToRemove);
    if (index !== -1) {
      throwableObjects.splice(index, 1);
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
