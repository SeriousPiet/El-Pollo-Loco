class EndbossStatusbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/0.png",
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/20.png",
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/40.png",
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/60.png",
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/80.png",
    "img/7_statusbars/1_statusbar/4_statusbar_endboss/100.png",
  ];

  percentage = 100;

  constructor() { 
    super();
    this.loadImages(this.IMAGES);
    this.x = 1040;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

 /**
 * Description: Updates the status bar animation to reflect the energy level of the character.
 * This function takes a percentage value and updates the character's energy level accordingly.
 * It determines the appropriate image path based on the energy percentage using the resolveImageIndex() method,
 * and then updates the image using the cached image reference.
 * @param {integer} percentage The energy level percentage.
 * @returns {void} This function does not have a specific return value.
 */ setPercentage(percentage) {
    this.percentage = percentage;
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
