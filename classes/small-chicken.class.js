class SmallChicken extends MovableObject {
  y = 390;
  height = 40;
  width = 50;
  intervalID;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead-1.png",
    "img/3_enemies_chicken/chicken_small/2_dead/dead-2.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 1000;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    let moveLeftInterval = setInterval(() => {
      this.moveLeft();
      this.intervalID = moveLeftInterval;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        clearInterval(this.intervalID);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
