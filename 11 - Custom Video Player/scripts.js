// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");

const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll(".player__slider");

// Build out functions
function togglePlay() {
    const method = video.paused ? "play" : "pause";
    video[method]();
}

function updateButton() {
    const icon = video.paused ? "▶" : "⏸";
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;

}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
}
//Hook out event listeners

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = true);