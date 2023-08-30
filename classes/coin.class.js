class Coin extends MovableObject {
  height = 100;
  width = 100;
  y;
  token_sound = this.audioVolume("audio/coin.mp3", 0.005);

  IMAGES_MOTION = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(randomY, randomX) {
    super().loadImage(this.IMAGES_MOTION[0]);
    this.loadImages(this.IMAGES_MOTION);
    this.x = randomX;
    this.y = randomY;
    this.animate();
  }

  /**
   * Description: Handles animation and movement behavior for the Coins.
   * This function sets up an interval to control the animation and movement of coins. It checks if the coin is dead
   * (e.g., collected by the player) and plays a sound effect if it's the case. If the coin is not dead, it triggers
   * the animation by invoking the `playAnimation` method with the appropriate images. The animation interval is set to
   * 200 milliseconds.
   */ animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_MOTION);
    }, 200);
  }
}
