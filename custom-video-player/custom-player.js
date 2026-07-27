const media = document.querySelector("video");
const controls = document.querySelector(".controls");

const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const rwd = document.querySelector(".rwd");
const fwd = document.querySelector(".fwd");

const timerWrapper = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer div");

// switch controls programmatically so that if the JavaScript doesn't load, 
// users can still use the video with the native controls
media.removeAttribute("controls");
controls.style.visibility = "visible";

play.addEventListener("click", playPauseMedia);
stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);
rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);
media.addEventListener("timeupdate", setTime);
timerWrapper.addEventListener("click", seekBar);

function playPauseMedia() {
  stopBackward();
  stopForward();

  if (media.paused) {
    play.setAttribute("data-icon", "u");
    media.play();
  } else {
    play.setAttribute("data-icon", "P");
    media.pause();
  }
}

function stopMedia() {
  stopBackward();
  stopForward();

  media.pause();
  media.currentTime = 0;
  play.setAttribute("data-icon", "P");
}

let intervalFwd;
let intervalRwd;

function mediaBackward() {
  stopForward();

  if (rwd.classList.contains("active")) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add("active");
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  stopBackward();

  if (fwd.classList.contains("active")) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add("active");
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward() {
  if (media.currentTime <= 3) {
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function windForward() {
  if (media.currentTime >= media.duration - 3) {
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}

function stopBackward() {
  clearInterval(intervalRwd);
  rwd.classList.remove("active");
}

function stopForward() {
  clearInterval(intervalFwd);
  fwd.classList.remove("active");
}

function setTime() {
  const minutes = Math.floor(media.currentTime / 60).toString();
  const seconds = Math.floor(media.currentTime - minutes * 60).toString();

  timer.textContent = `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;

  const barLength =
    timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = `${barLength}px`;
}

function seekBar(e) {
  const timerBounds = timerWrapper.getBoundingClientRect();
  const seekTime = (e.x - timerBounds.x) / timerBounds.width;
  media.currentTime = seekTime * media.duration;
}