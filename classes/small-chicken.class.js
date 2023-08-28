class SmallChicken extends MovableObject {
  height = 40;
  width = 50;
  y = 610;
  intervalID;
  intervalSplashID;
  dead_sound = this.audioVolume("audio/deadChicken.mp3", 0.005);

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead-1.png",
    "img/3_enemies_chicken/chicken_small/2_dead/dead-2.png",
  ];

  constructor(randomX) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = randomX;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Description: Handles animation and movement behavior for the character.
   */ animate() {
    let moveLeftInterval = setInterval(() => {
      this.moveLeft();
      this.intervalID = moveLeftInterval;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        if (!this.hasPlayedDeadSound) {
          this.dead_sound.play();
          this.hasPlayedDeadSound = true;
        }
        this.playAnimation(this.IMAGES_DEAD);
        clearInterval(this.intervalID);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
