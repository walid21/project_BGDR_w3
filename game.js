const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1980;
canvas.height = 1024;
const insideTimer = document.getElementById("timer");
const p1_lifebar = document.getElementById("p1-lost-life");
const p2_lifebar = document.getElementById("p2-lost-life");
const endMessage = document.querySelector(".endMessage");
const restartBtn = document.querySelector("#restart-btn");
let time = 120;
let frame = 0;

class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    // this.height = 500;
    // this.width = 100;
    this.image = new Image();
    this.image.src = imageSrc;
    this.frameCurrent = 0;
    this.framesMax = 6;
    this.framesElapsed = 0;
    this.framesHold = 15;
  }
  draw() {
    // ctx.drawImage(image, startCropX, startCropY, endCropX, endCropY, whereToDrawX, whereToDrawY, playerWidth, playerHeight);
    // ctx.drawImage(this.image, 0, 0, 43, 140, this.position.x, this.position.y, this.width, this.height);
    //ctx.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
    ctx.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    console.log(this.image.height, this.height);
    //  this.image.height = this.height;

    this.animate();
  }
  animate() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCurrent < this.framesMax - 1) {
        this.frameCurrent++;
      } else {
        this.frameCurrent = 0;
      }
    }
  }
}

class Player extends Sprite {
  constructor({ position, velocity, keys, turnBack, imageSrc, sprites }) {
    super({
      imageSrc,
    });
    this.position = position;
    this.velocity = velocity;
    this.height = 500;
    this.width = 200;
    this.gravity = 6.81;
    this.keys = keys;
    this.arm = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 0,
      height: 80,
    };
    this.turnBack = turnBack;
    this.health = 100;
    this.frameCurrent = 0;
    this.framesMax = 6;
    this.framesElapsed = 0;
    this.framesHold = 20;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  move() {
    this.draw();
    this.animate();
    if (this.position.x + this.velocity.x < 0) {
      this.position.x = 0;
      this.velocity.x = 0;
    } else if (this.position.x + this.velocity.x + this.width >= canvas.width) {
      this.position.x = canvas.width - this.width;
      this.velocity.x = 0;
    } else {
      this.position.x += this.velocity.x;
    }

    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 100) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += this.gravity;
    }
    this.arm.position.x = this.position.x - this.turnBack.x;
    this.arm.position.y = this.position.y;
  }

  setSpeed(key) {
    switch (key) {
      case this.keys[0]:
        this.velocity.x = -20;
        player1.image = player1.sprites.moveLeft.image;
        player2.image = player2.sprites.moveLeft.image;
        break;
      case this.keys[1]:
        this.velocity.y = -70;
        this.framesMax = player1.sprites.jump.framesMax;
        player1.image = player1.sprites.jump.image;
        player2.image = player2.sprites.jump.image;
        break;
      case this.keys[3]:
        //this.height = 222;
        player1.image = player1.sprites.crouch.image;
        player2.image = player2.sprites.crouch.image;
        break;
      case this.keys[2]:
        this.velocity.x = 20;
        player1.image = player1.sprites.moveRight.image;
        player2.image = player2.sprites.moveRight.image;
        break;
      default:
        break;
    }
  }

  stop(key) {
    switch (key) {
      case this.keys[3]:
        //this.position.y -= 500;
        //this.height = 500;
        player1.image = player1.sprites.idle.image;
        player2.image = player2.sprites.idle.image;

        break;
      case this.keys[0]:
      case this.keys[2]:
        this.velocity.x = 0;
        player1.image = player1.sprites.idle.image;
        player2.image = player2.sprites.idle.image;
        break;
      case this.keys[1]:
        this.velocity.y = 60;
        this.position.y -= 60;
        player1.image = player1.sprites.idle.image;
        player2.image = player2.sprites.idle.image;
        this.framesMax = player1.sprites.idle.framesMax;
    }
  }

  attack(key) {
    switch (key) {
      case this.keys[4]:
        this.arm.width = 250;
        player1.image = player1.sprites.punch.image;
        this.framesMax = 5;
        break;
    }
  }

  cover(key) {
    switch (key) {
      case this.keys[4]:
        this.arm.width = 0;
        player1.image = player1.sprites.idle.image;
        this.framesMax = player1.sprites.idle.framesMax;

        break;
    }
  }
}

const player1 = new Player({
  position: {
    x: 320,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  keys: ["q", "z", "d", "s", "r"],
  turnBack: {
    x: 0,
    y: 0,
  },
  imageSrc: "./sprite/ken_sprite/idle.png",
  sprites: {
    crouch: {
      imageSrc: "./sprite/ken_sprite/crouch_ken.png",
      framesMax: 6,
    },
    idle: {
      imageSrc: "./sprite/ken_sprite/idle.png",
      framesMax: 6,
    },
    jump: {
      imageSrc: "./sprite/ken_sprite/jump_ken.png",
      framesMax: 8,
    },
    moveRight: {
      imageSrc: "./sprite/ken_sprite/moving_right_ken-removebg-preview.png",
      framesMax: 6,
    },
    moveLeft: {
      imageSrc: "./sprite/ken_sprite/moves_left_ken-removebg-preview.png",
      frameMax: 6,
    },
    punch: {
      imageSrc: "./sprite/ken_sprite/hit_two_ken-removebg-preview.png",
      frameMax: 3,
    },
  },
});

const player2 = new Player({
  position: {
    x: 960,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  keys: ["j", "i", "l", "k", "p"],
  turnBack: {
    x: 170,
    y: 0,
  },
  imageSrc: "./sprite/ken_sprite/idle.png",
  sprites: {
    crouch: {
      imageSrc: "./sprite/wizard_sprite/Fall.png",
      framesMax: 2,
    },
    idle: {
      imageSrc: "./sprite/wizard_sprite/Idle.png",
      framesMax: 6,
    },
    jump: {
      imageSrc: "./sprite/wizard_sprite/Jump.png",
      framesMax: 2,
    },
    moveRight: {
      imageSrc: "./sprite/wizard_sprite/Run.png",
      framesMax: 8,
    },
    moveLeft: {
      imageSrc: "./sprite/wizard_sprite/Run_left.png",
      frameMax: 8,
    },
    punch: {
      imageSrc: "./sprite/wizard_sprite/Attack2.png",
      frameMax: 8,
    },
  },
});

function endGame(animationName) {
  if (insideTimer.textContent === "0" || player2.health === 0 || player1.health === 0) {
    endMessage.classList.remove("invisible");
    if (player2.health === 0) {
      insideTimer.style.height = "90%";
      insideTimer.style.width = "30%";
      insideTimer.textContent = "PLAYER 1 WIN";
    } else if (player1.health === 0) {
      insideTimer.textContent = "PLAYER 2 WIN";
    }
    time = 0;
    window.cancelAnimationFrame(animationName);
    setTimeout(() => {
      endMessage.style.background = "none";
      restartBtn.classList.remove("invisible");
    }, 2000);
  } else {
    endMessage.classList.add("invisible");
  }
}

function handleGame() {
  const animation = window.requestAnimationFrame(handleGame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player1.move();
  player2.move();

  //Timer
  insideTimer.textContent = `${time}`;
  frame++;
  if (frame === 60) {
    if (time > 0) {
      time--;
    }
    frame = 0;
  }

  // player1 hit conditions + health bar handling
  if (
    player1.position.x + player1.arm.width >= player2.position.x &&
    player1.position.x + player1.width <= player2.position.x &&
    player1.position.y + player1.arm.height >= player2.position.y &&
    player2.health > 0
  ) {
    player1.arm.width = 0;
    player2.health -= 5;
    p2_lifebar.style.width = `${player2.health}%`;
  }
  // player2 hit conditions + health bar handling
  if (
    player2.position.x + player2.width - player2.arm.width <= player1.position.x + player1.width &&
    player2.position.x >= player1.position.x + player1.width &&
    player2.position.y + player2.arm.height >= player1.position.y &&
    player1.health > 0
  ) {
    player2.arm.width = 0;
    player1.health -= 5;
    p1_lifebar.style.width = `${player1.health}%`;
  }

  endGame(animation);
}

//initiate game and timer
const initiateGame = handleGame();

// all the event listener
window.addEventListener("keydown", (event) => {
  player1.setSpeed(event.key);
  player2.setSpeed(event.key);
  player1.attack(event.key);
  player2.attack(event.key);
});

window.addEventListener("keyup", (event) => {
  player1.stop(event.key);
  player2.stop(event.key);
  player1.cover(event.key);
  player2.cover(event.key);
});

// window.addEventListener("keydown", (event) => {
//   //setTimeout(() => {
//   player1.attack(event.key);
//   player2.attack(event.key);
//   //}, "100");
// });

// window.addEventListener("keyup", (event) => {
//   //setTimeout(() => {
//   player1.cover(event.key);
//   player2.cover(event.key);
//   //}, "200");
// });

restartBtn.addEventListener("click", () => {
  setTimeout(() => {
    time = 120;
    restartBtn.classList.add("invisible");
    p1_lifebar.style.width = "100%";
    p2_lifebar.style.width = "100%";
    player1.position.x = 320;
    player2.position.x = 960;
    handleGame();
  }, 1000);
});
