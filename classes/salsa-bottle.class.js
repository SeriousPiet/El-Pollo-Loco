class SalsaBottle extends MovableObject {
  height = 80;
  width = 80;
  y = 570;
  bottleToken_sound = this.audioVolume("audio/bottle-taken.mp3", 0.005);

  IMAGES_STAND = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor(imageIndex, randomX) {
    super().loadImage(this.IMAGES_STAND[imageIndex]);
    this.x = randomX;
  }
}
