class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 250;
  offset = {
    top: 60,
    bottom: 10,
    left: 40,
    right: 40,
};
  speed = 3;
  i = 0;
  triggered = false;
  hit_sound = this.audioVolume("audio/hitEndboss.mp3", 0.01);
  dead_sound = this.audioVolume("audio/deadChicken.mp3", 0.005);

  IMAGES_ALERT_STAGE_1 = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
  ];

  IMAGES_ALERT_STAGE_2 = [
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
  ];

  IMAGES_ALERT_STAGE_3 = [
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT_STAGE_1);
    this.loadImages(this.IMAGES_ALERT_STAGE_2);
    this.loadImages(this.IMAGES_ALERT_STAGE_3);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 5200;
    this.animate();
    this.applyGravity();
    this.world = world;
  }

  /**
   * Description: Handles animation and movement behavior for the endboss.
   * This function sets up intervals for animation and state updates.
   * The `motion` function handles movement logic, while the `state` function manages different states of the endboss.
   */ animate() {
    this.intervalID = setInterval(
      () => this.motion(),
      1000 / 60
    );
    setStoppableInterval(this.intervalID);
    this.statusIntervalID = setInterval(() => this.status(), 100);
    setStoppableInterval(this.statusIntervalID);
  }

  /**
   * Description: Handles different motion behaviors of the endboss based on its state.
   * This function determines the endboss's actions such as jumping when enraged and following the character.
   */ motion() {
    if (this.isEnrage() && !this.isAboveGround()) {
      this.jump(15);
    } else if (this.isFollow()) {
      this.moveLeft();
    }
  }

  /**
   * Description: Updates the state of the endboss and plays the appropriate animation.
   * This function manages the endboss's different states, such as dead, hurt, alert stages, enrage, and follow.
   */ status() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      if (!this.hasPlayedDeadSound) {
        this.dead_sound.play();
        this.hasPlayedDeadSound = true;
      }
      clearInterval(this.intervalID);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.hit_sound.play();
    } else if (this.isAlert1()) {
      this.playAnimation(this.IMAGES_ALERT_STAGE_1);
    } else if (this.isAlert2()) {
      this.playAnimation(this.IMAGES_ALERT_STAGE_2);
    } else if (this.isAlert3()) {
      this.playAnimation(this.IMAGES_ALERT_STAGE_3);
      setTimeout(() => {
        return (this.triggered = true);
      }, 400);
    } else if (this.isEnrage()) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.isFollow()) {
      this.hasPlayedDeadSound = false;
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Description: Checks if the endboss is in alert stage 1.
   * @returns {boolean} True if the endboss is in alert stage 1, false otherwise.
   */ isAlert1() {
    return (
      this.world.distanceCharToBoss < 1280 &&
      this.world.distanceCharToBoss > 1000 &&
      !this.triggered
    );
  }

  /**
   * Description: Checks if the endboss is in alert stage 2.
   * @returns {boolean} True if the endboss is in alert stage 2, false otherwise.
   */ isAlert2() {
    return (
      this.world.distanceCharToBoss < 1000 &&
      this.world.distanceCharToBoss > 800 &&
      !this.triggered
    );
  }

  /**
   * Description: Checks if the endboss is in alert stage 3.
   * @returns {boolean} True if the endboss is in alert stage 3, false otherwise.
   */ isAlert3() {
    return (
      this.world.distanceCharToBoss < 800 &&
      this.world.distanceCharToBoss > 600 &&
      !this.triggered
    );
  }

  /**
   * Description: Checks if the endboss is in enrage mode.
   * @returns {boolean} True if the endboss is in enrage mode, false otherwise.
   */ isEnrage() {
    return this.world.distanceCharToBoss < 350 && this.triggered;
  }

  /**
   * Description: Checks if the endboss is in follow mode.
   * @returns {boolean} True if the endboss is in follow mode, false otherwise.
   */ isFollow() {
    return this.world.distanceCharToBoss < 5116 && this.triggered;
  }
}
