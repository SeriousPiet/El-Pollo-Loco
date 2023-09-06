let canvas;
let world;
let fullscreenToggled = false;
let keyboard = new Keyboard();
let intervalIds = [];

function setStoppableInterval(id) {
  intervalIds.push(id);
}

function stopGame() {
  intervalIds.forEach(clearInterval);
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
}

function enterFullscreen(fullscreen) {
  if (fullscreen.requestFullscreen) {
    fullscreen.requestFullscreen();
  } else if (fullscreen.msRequestFullscreen) {
    fullscreen.msRequestFullscreen();
  } else if (fullscreen.webkitRequestFullscreen) {
    fullscreen.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msRequestExitFullscreen) {
    document.msRequestExitFullscreen();
  } else if (document.webkitRequestExitFullscreen) {
    document.webkitRequestExitFullscreen();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toggleFullscreen").addEventListener("click", (e) => {
    if (!fullscreenToggled) {
      this.fullscreen();
      document.getElementById("toggleFullscreenImage").src = "img/fullscreen-exit.png";
      fullscreenToggled = true;
    } else {
      this.exitFullscreen();
      document.getElementById("toggleFullscreenImage").src = "img/fullscreen.png";
      fullscreenToggled = false;
    }
  });
  document.getElementById("toggleRight").addEventListener(
    "touchstart",
    (e) => {
      console.log("rechts");
      keyboard.RIGHT = true;
    },
    { passive: true }
  );

  document.getElementById("toggleRight").addEventListener(
    "touchend",
    (e) => {
      keyboard.RIGHT = false;
    },
    { passive: true }
  );

  document.getElementById("toggleLeft").addEventListener(
    "touchstart",
    (e) => {
      console.log("links");
      keyboard.LEFT = true;
    },
    { passive: true }
  );

  document.getElementById("toggleLeft").addEventListener(
    "touchend",
    (e) => {
      keyboard.LEFT = false;
    },
    { passive: true }
  );

  document.getElementById("toggleJump").addEventListener(
    "touchstart",
    (e) => {
      console.log("springen");
      keyboard.SPACE = true;
    },
    { passive: true }
  );

  document.getElementById("toggleJump").addEventListener(
    "touchend",
    (e) => {
      keyboard.SPACE = false;
    },
    { passive: true }
  );

  document.getElementById("toggleDrop").addEventListener(
    "touchstart",
    (e) => {
      console.log("werfen");
      keyboard.D = true;
    },
    { passive: true }
  );

  document.getElementById("toggleDrop").addEventListener(
    "touchend",
    (e) => {
      keyboard.D = false;
    },
    { passive: true }
  );
});

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
