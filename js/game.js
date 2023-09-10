let canvas;
let world;
let fullscreenToggled = false;
let keyboard = new Keyboard();
let intervalIds = [];

/**
 * Checks the user's device and browser system to determine whether to display certain elements, such as a fullscreen toggle button or a mobile screen element.
 */ function checkForBrowserSystem() {
  let isLandscape = window.matchMedia("(orientation: landscape)").matches;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    document.getElementById("toggleFullscreen").style.display = "none";
    document.getElementById("bottomButtonsAroundContainer").style.display = "flex";
    if (isLandscape == false) {
      document.getElementById("mobileScreen").style.display = "flex";
    } else {
      document.getElementById("mobileScreen").style.display = "none";
    }
  } else {
    document.getElementById("toggleFullscreen").style.display = "flex";
    document.getElementById("mobileScreen").style.display = "none";
    document.getElementById("bottomButtonsAroundContainer").style.display = "none";
  }
}

/**
 * Adds the given interval ID to the list of stoppable intervals.
 * @param {number} id - The interval ID to be added.
 */ function setStoppableInterval(id) {
  intervalIds.push(id);
}

/**
 * Stops all intervals in the list of stoppable intervals.
 */ function stopGame() {
  intervalIds.forEach(clearInterval);
}

/**
 * Initializes the game.
 * This function retrieves the canvas element, creates a new World instance,
 * and sets up a regular interval to check for browser system updates.
 */ function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  setInterval(() => {
    checkForBrowserSystem();
  }, 1000 / 60);
}

/**
 * Activates fullscreen mode by entering it for the specified element.
 */ function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
}

/**
 * Enters fullscreen mode for the given HTML element using compatible APIs.
 * @param {HTMLElement} fullscreen - The HTML element for which fullscreen mode is requested.
 */ function enterFullscreen(fullscreen) {
  if (fullscreen.requestFullscreen) {
    fullscreen.requestFullscreen();
  } else if (fullscreen.msRequestFullscreen) {
    fullscreen.msRequestFullscreen();
  } else if (fullscreen.webkitRequestFullscreen) {
    fullscreen.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode if the current document is in fullscreen.
 * This function checks for browser-specific methods to exit fullscreen.
 */ function exitFullscreen() {
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
      document.getElementById("toggleFullscreenImage").src =
        "img/10_html_design/fullscreen-exit.png";
      fullscreenToggled = true;
    } else {
      this.exitFullscreen();
      document.getElementById("toggleFullscreenImage").src =
        "img/10_html_design/fullscreen.png";
      fullscreenToggled = false;
    }
  });

  document.getElementById("toggleHelp").addEventListener("click", () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("helpMenu").style.display = "flex";
  });

  document
    .getElementById("backToMainMenuHelpMenu")
    .addEventListener("click", () => {
      document.getElementById("mainMenu").style.display = "flex";
      document.getElementById("helpMenu").style.display = "none";
    });

  document.getElementById("toggleDiscription").addEventListener("click", () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("discriptionMenu").style.display = "flex";
  });

  document
    .getElementById("backToMainMenuDiscriptionMenu")
    .addEventListener("click", () => {
      document.getElementById("mainMenu").style.display = "flex";
      document.getElementById("discriptionMenu").style.display = "none";
    });

  document
    .getElementById("backToMainMenuEndScreen")
    .addEventListener("click", () => {
      document.getElementById("mainMenu").style.display = "flex";
      document.getElementById("endScreen").style.display = "none";
    });

  document.getElementById("toggleRight").addEventListener(
    "touchstart",
    (e) => {
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
