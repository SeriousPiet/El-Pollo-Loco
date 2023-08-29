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
   * This function sets up an interval to continuously check the state of the chicken.
   * If the chicken is dead, it plays a token sound once and updates the `soundAlreadyPlayed` flag.
   * This ensures that the sound is played only once upon the chicken's death.
   * The interval runs every 200 milliseconds to monitor the chicken's state and sound playback.
   */ behavior() {
    setInterval(() => {
      if (this.isDead()) {
        if (!this.soundAlreadyPlayed) {
          this.token_sound.play();
          this.soundAlreadyPlayed = true;
        } else {
          this.soundAlreadyPlayed = false;
        }
      }
    }, 200);
  }
}
