class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  /**
   * Description: simulates gravity
   */ applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Description: lets objects fall through the bottom
   */ isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Description: lets objects move to the right
   */ moveRight() {
    this.x += this.speed;
  }

  /**
   * Description: lets objects move to the left
   */ moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Description: lets objects jump
   */ jump() {
    this.speedY = 30;
  }

  /**
   * Description: iterates through the image arrays randomly, because currentImage is going to increased from the beginning
   */ playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Description: testing if objects colliding each other
   */ isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  /**
   * Description: set the character energy after hit and set a time stamp
   */ hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Description: returns true, if character energy is zero
   */ isDead() {
    return this.energy == 0;
  }

  /**
   * Description: character got damage if timePassed (difference of isHurt-function time stamp and hit-function time stamp) is less then one second
   */ isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }
}
