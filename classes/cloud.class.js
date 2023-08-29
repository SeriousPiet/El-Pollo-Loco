class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;
  IMAGES_CLOUDS = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];

  constructor(imageIndex, randomX) {
    super().loadImage(this.IMAGES_CLOUDS[imageIndex]);
    this.x = randomX;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Description: Handles animation and movement behavior for the Clouds.
   * This function sets up an interval to continuously move the clouds to the left, creating an animated effect.
   * The interval is triggered every 1/60th of a second (approx. 60 frames per second) by invoking the `moveLeft` method.
   * As a result, the clouds appear to move smoothly across the screen from right to left.
   */ animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
