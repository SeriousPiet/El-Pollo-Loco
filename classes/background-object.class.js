class BackgroundObject extends MovableObject {
  width = 1280;
  height = 720;
  speed = 10;

  IMAGES1 = [
    "img/5_background/layers/air.png",
    "img/5_background/layers/3_third_layer/1.png",
    "img/5_background/layers/2_second_layer/1.png",
    "img/5_background/layers/1_first_layer/1.png",
  ];

  IMAGES2 = [
    "img/5_background/layers/air.png",
    "img/5_background/layers/3_third_layer/2.png",
    "img/5_background/layers/2_second_layer/2.png",
    "img/5_background/layers/1_first_layer/2.png",
  ];

  constructor(imageIndex, x, arrayIndex) {
    if (arrayIndex == 1) {
      super().loadImage(this.IMAGES1[imageIndex]);
    } else {
      super().loadImage(this.IMAGES2[imageIndex]);
    }
    this.x = x * 1279;
    this.y = 720 - this.height;
  }
}
