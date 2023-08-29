class CoinStatusbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 80;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Description: Updates the status bar animation to reflect the energy level of the coin.
   * This function takes a percentage value and updates the coin's energy level accordingly.
   * It determines the appropriate image path based on the energy percentage using the resolveImageIndex() method,
   * and then updates the image using the cached image reference.
   * @param {integer} percentage The energy level percentage.
   */ setPercentage(percentage) {
    this.percentage = percentage;
    if (this.percentage < 0) {
      this.percentage = 0;
    }
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Description: Determines an image index from 5 to 0 based on the energy percentage.
   * The function returns a corresponding index based on the energy level.
   * @returns {number} An number representing the image index.
   */ resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
