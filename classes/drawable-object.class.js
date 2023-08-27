class DrawableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Description: Loads an image using the specified image path and returns the image source path as a string.
   * @param {string} path The path to the image to load.
   * @returns {string} The path of the loaded image as a string.
   */ loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Description: Iterates through the specified array of paths to images and stores the images in the imageCache array.
   * @param {Array} arr An array of paths to images to load.
   * @returns {Void} This method does not return a value (string).
   */ loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Description: Displays the drawn image on the canvas.
   * @param {CanvasRenderingContext2D} ctx The 2D Canvas context on which to draw the image.
   * @returns {Void} This method does not return a value.
   */ draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Description: Draws an object's border onto the specified Canvas context.
   * This method draws a blue border around the object if it is an
   * instance of Character, Chicken, Endboss, ThrowableObject, or SmallChicken.
   * @param {CanvasRenderingContext2D} ctx The 2D Canvas context on which to draw the image.
   * @returns {Void} This method does not return a value.
   */ drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof SmallChicken ||
      this instanceof SalsaBottle
    ) {
      ctx.beginPath();
      ctx.lindeWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
