class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 250;
  speed = 3;
  intervalID;
  i = 0;
  triggered = false;

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
   */ animate() {
    let moveLeftInterval = setInterval(
      () => this.motion(moveLeftInterval),
      1000 / 60
    );
    setInterval(() => this.state(), 100);
  }

  motion(moveLeftInterval) {
    if (this.isEnrage() && !this.isAboveGround()) {
      this.jump(15);
    } else if (this.isFollow()) {
      this.moveLeft();
      this.intervalID = moveLeftInterval;
    }
  }

  state() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      clearInterval(this.intervalID);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
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
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  isAlert1() {
    return (
      this.world.distanceCharToBoss < 1280 &&
      this.world.distanceCharToBoss > 1000 &&
      !this.triggered
    );
  }
  isAlert2() {
    return (
      this.world.distanceCharToBoss < 1000 &&
      this.world.distanceCharToBoss > 800 &&
      !this.triggered
    );
  }
  isAlert3() {
    return (
      this.world.distanceCharToBoss < 800 &&
      this.world.distanceCharToBoss > 600 &&
      !this.triggered
    );
  }

  isEnrage() {
    return this.world.distanceCharToBoss < 350 && this.triggered;
  }

  isFollow() {
    return this.world.distanceCharToBoss < 5116 && this.triggered;
  }
}
