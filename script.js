const PADDLE_MOVE_DELTA = 40;
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;

const BOARD_HEIGHT = 400;
const BOARD_WIDTH = 600;
const BOARD_PADDING = 0;

const BALL_TIME_STEP = 40;
const BALL_MOVE_DELTA = 5;
const BALL_HEIGHT = 15;

const LIVE_CHARACTER = "❤️";

let livesLeft = 3;

const lives = document.getElementById("lives");
lives.innerText = LIVE_CHARACTER.repeat(livesLeft);

const paddle = document.getElementById("paddle");
let paddleTop = 0;

const keydownCallback = (event) => {
  if (event.key === "ArrowUp") {
    if (paddleTop - PADDLE_MOVE_DELTA < BOARD_PADDING) {
      paddleTop = BOARD_PADDING;
    } else {
      paddleTop -= PADDLE_MOVE_DELTA;
    }

    paddle.style.top = paddleTop + "px";
  } else if (event.key === "ArrowDown") {
    if (
      paddleTop + PADDLE_MOVE_DELTA >=
      BOARD_HEIGHT - BOARD_PADDING - PADDLE_HEIGHT
    ) {
      paddleTop = BOARD_HEIGHT - BOARD_PADDING - PADDLE_HEIGHT;
    } else {
      paddleTop += PADDLE_MOVE_DELTA;
    }

    paddle.style.top = paddleTop + "px";
  } else if (event.key === "l") {
    if (document.body.style.background == "blue") {
      document.body.style.background = "white";
    } else {
      document.body.style.background = "blue";
    }
  }
};

document.addEventListener("keydown", keydownCallback);

let ballTop = 40;
let ballLeft = 40;

let xSpeed = 1;
let ySpeed = -1;

let ball = document.getElementById("ball");

let updateTask;

const moveBallCallback = () => {
  if (ballTop + ySpeed * BALL_MOVE_DELTA > BOARD_HEIGHT - BALL_HEIGHT) {
    ySpeed = -ySpeed;
  }

  if (ballTop + ySpeed * BALL_MOVE_DELTA < 0) {
    ySpeed = -ySpeed;
  }

  if (ballLeft + xSpeed * BALL_MOVE_DELTA < 0) {
    xSpeed = -xSpeed;
  }

  if (
    ballLeft + xSpeed * BALL_MOVE_DELTA >= BOARD_WIDTH - PADDLE_WIDTH - 5 &&
    ballTop + ySpeed * BALL_MOVE_DELTA >= paddleTop &&
    ballTop + ySpeed * BALL_MOVE_DELTA <= paddleTop + PADDLE_HEIGHT
  ) {
    xSpeed = -xSpeed;
  } else if (ballLeft + xSpeed * BALL_MOVE_DELTA > BOARD_WIDTH) {
    if (livesLeft === 0) {
      clearInterval(updateTask);
    } else {
      livesLeft -= 1;

      ball.classList.remove("animate-ball");

      ballTop = 40;
      ballLeft = 40;

      xSpeed = 1;
      ySpeed = -1;

      setTimeout(() => ball.classList.add("animate-ball"), 100);
      lives.innerText = LIVE_CHARACTER.repeat(livesLeft);
    }
  }

  ballTop = ballTop + ySpeed * BALL_MOVE_DELTA;
  ballLeft = ballLeft + xSpeed * BALL_MOVE_DELTA;

  ball.style.top = ballTop + "px";
  ball.style.left = ballLeft + "px";
};

updateTask = setInterval(moveBallCallback, BALL_TIME_STEP);
