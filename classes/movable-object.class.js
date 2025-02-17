class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Description: Creates an audio element with the specified source and volume settings.
   * @param {string} src The URL of the audio file.
   * @param {number} volume The desired volume level for the audio (0 to 1).
   * @returns {HTMLAudioElement} The created audio element.
   */ audioVolume(src, volume) {
    let audio = new Audio(src);
    audio.volume = volume;
    return audio;
  }

  /**
   * Description: Applies gravity to the object by returning the position (y coordinate) as a number
   * and the acceleration (speedY) as an number.
   * @returns {number} The y position as an number and the acceleration speedY as a number.
   */ applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 40);
  }

  /**
   * Description: Checks whether the object is above the ground. Returns true if it is a
   * throwable object or if it is another movable object above y=180.
   * @returns {boolean} true if the object is above the ground, false otherwise.
   */ isAboveGround() {
    return this.y + this.height < 650;
  }

  /**
   * Description: Moves the object in the positive x direction (to the right) and returns the speed as a number.
   * @returns {number} The velocity in the positive x-direction as a number.
   */ moveRight() {
    this.x += this.speed;
  }

  /**
   * Description: Moves the object in the negative x direction (to the left) and returns the speed as a number.
   * @returns {number} The velocity in the negtive x-direction as a number.
   */ moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Description: Sets the speed in the y-direction (up) and thus enables a jump. Returns the speed as a number.
   * @returns {number} The speed in the y-direction as a number.
   */ jump(jumpHeight) {
    this.speedY = jumpHeight;
  }

  /**
   * Description: Plays an animation using random image sources and returns the image source path as a string.
   * @param {Array} images An array of paths to image sources for animation.
   * @returns {string} The image source path as a string.
   */ playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Description: Checks whether the movable object collides with another object and meets the specified conditions.
   * @param {MovableObject} mo The other movable object to check collision against.
   * @returns {boolean} true if collision occurs and conditions are met, otherwise false.
   */ isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Description: Inflicts damage to the object's energy and records the timestamp of the last hit.
   * @param {number} damage The amount of damage to be inflicted.
   * @returns {number} The remaining energy of the object after the hit.
   */ hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Description: Checks if the energy level is 0, indicating that the object is dead.
   * @returns {boolean} true if the energy level is 0, otherwise false.
   */ isDead() {
    return this.energy == 0;
  }

  /**
   * Description: Checks if the time since the last hit is less than 1 second, indicating that the object is hurt.
   * @returns {boolean} true if the time since last hit is less than 1 second, otherwise false.
   */ isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }
}
