class SmallChicken extends MovableObject {
  height = 60;
  width = 70;
  y = 590;
  offset = {
    top: 0,
    bottom: 0,
    left: 25,
    right: 25,
  };
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
   * Description: Handles animation and movement behavior for a small chicken.
   * This function sets up intervals for animation and movement, determining whether the small chicken is walking or dead.
   * It also plays appropriate sound effects based on the chicken's state.
   */ animate() {
    this.intervalID = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setStoppableInterval(this.intervalID);

    this.statusIntervalID = setInterval(() => {
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
    setStoppableInterval(this.statusIntervalID);
  }
}
