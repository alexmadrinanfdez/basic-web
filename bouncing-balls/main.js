const WALL_THICKNESS = 1;
const NUM_BALLS = 25;
const SPEED_LIMIT = 10;
const MAX_SIZE = 25;
const MIN_SIZE = 10;


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const animationButton = document.querySelector("#animation");
const animationIcon = animationButton.querySelector("#animation span");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}


const { Engine, Bodies, Body, Composite } = Matter;

const engine = Engine.create();
engine.world.gravity.y = 0;

const walls = [
  Bodies.rectangle(width / 2, 0, width, WALL_THICKNESS, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, WALL_THICKNESS, { isStatic: true }),
  Bodies.rectangle(0, height / 2, WALL_THICKNESS, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, WALL_THICKNESS, height, { isStatic: true }),
]

Composite.add(engine.world, walls);

const balls = [];
for (let i = 0; i < NUM_BALLS; i++) {
  const size = rand(MIN_SIZE, MAX_SIZE);
  const ball = Bodies.circle(
    // ball position drawn at least one ball width from the edge of the canvas
    rand(0 + size, width - size),
    rand(0 + size, height - size),
    size,
    {
      restitution: 1,
      friction: 0,
      frictionAir: 0
    }
  );
  Body.setVelocity(ball, {
    x: rand(-SPEED_LIMIT, SPEED_LIMIT),
    y: rand(-SPEED_LIMIT, SPEED_LIMIT)
  });
  Body.setInertia(ball, Infinity);

  Composite.add(engine.world, ball);
  balls.push(ball);
}


let isRunning = true;
let animationFrameId = null;

function updateButtonState() {
  animationIcon.textContent = isRunning ? "pause" : "play_arrow";
  animationButton.setAttribute("aria-label", `${isRunning ? "Pause" : "Play"} animation`);
}

animationButton.addEventListener("click", () => {
  isRunning = !isRunning;
  updateButtonState();

  if (isRunning) {
    animationFrameId = window.requestAnimationFrame(run);
  } else {
    animationFrameId = window.cancelAnimationFrame(animationFrameId);
  }
});

function run() {
  if (!isRunning) {
    return;
  }

  // cover last frame with a semi-transparent color to create a fading trail effect
  ctx.fillStyle = "rgb(34 34 34 / 35%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    const { x, y } = ball.position;
    ctx.beginPath();
    ctx.fillStyle = ball.render.fillStyle;
    ctx.arc(x, y, ball.circleRadius, degToRad(0), degToRad(360));
    ctx.fill();
  }

  Engine.update(engine);
  animationFrameId = window.requestAnimationFrame(run);
}

updateButtonState();
animationFrameId = window.requestAnimationFrame(run);