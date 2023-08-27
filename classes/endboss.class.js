class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 250;
  intervalID;
  i=0;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 5200;
    this.speed = 0.15;
    this.animate();
  }

  /**
   * Description: Handles animation and movement behavior for the endboss.
   */ animate() {
    let moveLeftInterval = setInterval(() => {
      if (this.isAboveGround()) {
      this.moveLeft();
    } else {
      this.jump(20);
    }
      this.intervalID = moveLeftInterval;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        clearInterval(this.intervalID);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.calculateDistance() < 100) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
