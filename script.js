const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.lineCap = "round";
ctx.lineWidth = 1.0;

function drawPoint(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
}

function genRandomCord() {
  return Math.floor(Math.random() * canvas.width);
}

function rollDice() {
  return Math.floor(Math.random() * 5) + 1;
}

function Point(text = "", x, y) {
  this.x = x ?? genRandomCord();
  this.y = y ?? genRandomCord();

  this.draw = function (text) {
    drawPoint(this.x, this.y);
    if (typeof text === "string") ctx.strokeText(text, this.x + 1, this.y - 5);
  };

  this.midPoint = function (point, shouldDraw = true) {
    return new Point(
      shouldDraw,
      (this.x + point.x) / 2,
      (this.y + point.y) / 2
    );
  };

  if (text) this.draw(text);
}

let M, Q, L, R;

function simulate(times = 100) {
  for (let i = 0; i < times; i++) {
    const roll = rollDice();
    let mdpt;
    if (roll < 3) {
      mdpt = M.midPoint(R);
    } else if (roll < 5) {
      mdpt = Q.midPoint(R);
    } else {
      mdpt = L.midPoint(R);
    }
    R.x = mdpt.x;
    R.y = mdpt.y;
  }
}

function simulateWithDelay(times = 100, delay = 10) {
  let count = 0;
  window.interval = setInterval(() => {
    const roll = rollDice();
    let mdpt;
    if (roll < 3) {
      mdpt = M.midPoint(R);
    } else if (roll < 5) {
      mdpt = Q.midPoint(R);
    } else {
      mdpt = L.midPoint(R);
    }
    R.x = mdpt.x;
    R.y = mdpt.y;
    count++;
    if (count > times) clearInterval(window.interval);
  }, delay);
}

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  const mx = Number(document.getElementById("m-x").value);
  const my = Number(document.getElementById("m-y").value);
  const qx = Number(document.getElementById("q-x").value);
  const qy = Number(document.getElementById("q-y").value);
  const lx = Number(document.getElementById("l-x").value);
  const ly = Number(document.getElementById("l-y").value);
  const rx = Number(document.getElementById("r-x").value);
  const ry = Number(document.getElementById("r-y").value);
  M = new Point("M", mx, my);
  Q = new Point("Q", qx, qy);
  L = new Point("L", lx, ly);
  R = new Point("R", rx, ry);
  simulateWithDelay(10000, 2);
});
