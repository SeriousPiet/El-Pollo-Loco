class SalsaBottle extends MovableObject {
  height = 80;
  width = 80;
  y = 570;
  intervalID;
  token_sound = this.audioVolume("audio/bottle-taken.mp3", 0.005);

  IMAGES_STAND = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_STAND[0]);
    this.loadImages(this.IMAGES_STAND);
    this.x = 1279 + Math.random() * 3000;
    this.behavior();
  }

  /**
   * Description: Handles animation and movement behavior for the Chicken.
   */ behavior() {
    setInterval(() => {
      if (this.isDead()) {
        if (!this.hasPlayedTokenSound) {
          this.token_sound.play();
          this.hasPlayedTokenSound = true;
        }
        clearInterval(this.intervalID);
      } else {
        this.hasPlayedTokenSound = false;
        this.playAnimation(this.IMAGES_STAND);
      }
    }, 200);
  }
}
