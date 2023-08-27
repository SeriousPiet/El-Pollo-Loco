class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 60;
    this.throw();
  }

  throw() {
    this.speedY = 25;
    this.applyGravity();
    setInterval(() => {
      this.x += 20;
      this.playAnimation(this.IMAGES_ROTATION);
    }, 50);
  }
}
