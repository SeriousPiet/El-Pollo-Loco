class SalsaBottle extends MovableObject {
  height = 80;
  width = 80;
  y = 570;
  token_sound = this.audioVolume("audio/bottle-taken.mp3", 0.005);

  IMAGES_STAND = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor(imageIndex, randomX) {
    super().loadImage(this.IMAGES_STAND[imageIndex]);
    this.x = randomX;
    this.behavior();
  }

  /**
   * Description: Handles animation and movement behavior for the Chicken.
   */ behavior() {
    setInterval(() => {
      if (this.isDead()) {
        this.token_sound.play();
      }
    }, 200);
  }
}
