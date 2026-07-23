const WALL_THICKNESS = 1;
const NUM_BALLS = 25;
const SPEED_LIMIT = 10;
const MAX_SIZE = 25;
const MIN_SIZE = 10;


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  const size = random(MIN_SIZE, MAX_SIZE);
  const ball = Bodies.circle(
    // ball position drawn at least one ball width from the edge of the canvas
    random(0 + size, width - size),
    random(0 + size, height - size),
    size,
    {
      restitution: 1,
      friction: 0,
      frictionAir: 0
    }
  );
  Body.setVelocity(ball, { x: random(-SPEED_LIMIT, SPEED_LIMIT), y: random(-SPEED_LIMIT, SPEED_LIMIT) });
  Body.setInertia(ball, Infinity);

  Composite.add(engine.world, ball);
  balls.push(ball);
}

(function run() {
  // cover last frame with a semi-transparent color to create a fading trail effect
  ctx.fillStyle = "rgb(34 34 34 / 35%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    const { x, y } = ball.position;
    ctx.beginPath();
    ctx.fillStyle = ball.render.fillStyle;
    ctx.arc(x, y, ball.circleRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  Engine.update(engine);
  window.requestAnimationFrame(run);
})();