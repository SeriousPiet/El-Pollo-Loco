class Character extends MovableObject {
  height = 250;
  y = 400;
  speed = 10;
  i = 0;
  intervalID;
  hasPlayedDeadSound = false;
  world;
  offset = {
    top: 120,
    bottom: 20,
    left: 15,
    right: 15,
  };
  walking_sound = this.audioVolume("audio/walk.mp3", 0.05);
  jumping_sound = this.audioVolume("audio/jump.mp3", 0.025);
  hurt_sound = this.audioVolume("audio/hitPepe.mp3", 0.05);
  dead_sound = this.audioVolume("audio/dead.mp3", 0.025);

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_DEAD_ABOVE_BOTTOM = [
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_DEAD_ABOVE_BOTTOM);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
  }

  /**
   * Description: Handles state and motion behavior for the character.
   */ animate() {
    this.intervalID = setInterval(() => this.motion(), 1000 / 60);
    setStoppableInterval(this.intervalID);
    this.statusIntervalID = setInterval(() => this.status(), 150);
    setStoppableInterval(this.statusIntervalID);
  }

  /**
   *  Discription: Manages character motion. Pauses the walking sound and checks for available movement actions.
   * If possible, the character moves right, left, or jumps. Adjusts the camera position accordingly.
   */ motion() {
    if (this.y > 400) {
      this.y = 400;
    }
    this.walking_sound.pause();
    if (this.canMoveRight()) {
      this.moveRight();
    }
    if (this.canMoveLeft()) {
      this.moveLeft();
    }
    if (this.canJump()) {
      this.jump(30);
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Discription: Checks if the character can move to the right.
   * @returns {boolean} Returns true if the right arrow key is pressed and
   * the character's position is within the level's right boundary, otherwise false.
   */ canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Discription: Moves the character to the right.
   * Sets the character's direction, triggers the rightward movement and
   * plays the walking sound if the character is on the ground.
   */ moveRight() {
    this.otherDirection = false;
    super.moveRight();
    if (!this.isAboveGround()) {
      this.walking_sound.play();
    }
  }

  /**
   * Description: Checks if the character can move to the left.
   * @returns {boolean} Returns true if the left arrow key is pressed and
   * the character's position is greater than the minimum x-coordinate for movement, otherwise false.
   */ canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 100;
  }

  /**
   * Description: Moves the character to the left.
   * Sets the character's direction, triggers the leftward movement and
   * plays the walking sound if the character is on the ground.
   */ moveLeft() {
    this.otherDirection = true;
    super.moveLeft();
    if (!this.isAboveGround()) {
      this.walking_sound.play();
    }
  }

  /**
   * Description: Checks if the character can perform a jump.
   * @returns {boolean} Returns true if the spacebar key is pressed and the character is on the ground, otherwise false.
   */ canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Description: Makes the character jump.
   * Initiates a jump with a specified height and plays the jumping sound.
   */ jump(height) {
    super.jump(height);
    this.jumping_sound.play();
  }

  /**
   * Description: Manages the character's status and animations.
   * Determines the appropriate animation based on the character's state and input.
   */ status() {
    if (this.isDead()) {
      this.dead();
    } else {
      this.hasPlayedDeadSound = false;
      if (this.isHurt()) {
        this.hurt_sound.play();
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.i = 0;
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.i < 30) {
        this.playAnimation(this.IMAGES_IDLE);
        this.i = this.i + 1;
      } else if (this.i >= 30) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      }
    }
  }

  /**
   * Description: Handles the character's death.
   * Plays the death sound and switches to the appropriate death animation.
   * Clears the interval and stops character movement.
   */ dead() {
    if (!this.hasPlayedDeadSound) {
      this.dead_sound.play();
      this.hasPlayedDeadSound = true;
      setTimeout(() => {this.world.returnToEndScreen()}, 1500);
    }
    clearInterval(this.intervalID);
    if (this.isAboveGround(this.pepe)) {
      this.playAnimation(this.IMAGES_DEAD_ABOVE_BOTTOM);
    } else {
      this.playAnimation(this.IMAGES_DEAD);
    }
  }
}
