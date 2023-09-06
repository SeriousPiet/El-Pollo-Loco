class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, direction) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.direction = direction;
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 60;
    this.throw();
  }

  /**
   * Description: Handles the behavior of a thrown salsa bottle.
   * This function initializes the speed and behavior of a thrown salsa bottle,
   * causing it to move upwards and then rotate as it travels horizontally.
   * It sets an interval to update the bottle's position and rotation while applying gravity.
   */ throw() {
    this.speedY = 25;
    this.applyGravity();
    setInterval(() => {
      if (this.y >= 600 || this.isDead()) {
        if (this.isDead()) {
          this.speedY = 0;
          this.y = this.y;
          this.playAnimation(this.IMAGES_SPLASH);
        } else {
          this.energy = 0;
          this.x = this.x;
          this.y = 600;
          this.playAnimation(this.IMAGES_SPLASH);
        }
      } else {
        if (this.direction == "right") {
          this.x += 20;
          this.playAnimation(this.IMAGES_ROTATION);
        } else {
          this.x -= 20;
          this.playAnimation(this.IMAGES_ROTATION);
        }
      }
    }, 50);
  }
}
