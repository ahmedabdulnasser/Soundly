import Audio from "./Audio.js";
import { throttle } from "./utils.js";
export default class Player {
  constructor(
    audioElement,
    titleElement,
    performerElement,
    playerThumbnail,
    playBtn,
    nextBtn,
    prevBtn,
    progressContainer,
    volumeSlider
  ) {
    this.audioElement = audioElement;
    this.titleElement = titleElement;
    this.performerElement = performerElement;
    this.playerThumbnail = playerThumbnail;
    this.progressContainer = progressContainer;
    this.playBtn = playBtn;
    this.volumeSlider = volumeSlider;
    this.isDragging = false;
    this.isRepeatClicked = false;

    this.activeAudioIdx = Math.floor(Math.random() * Audio.audioList.length);
    this.loadAudio(this.activeAudioIdx);

    // Events
    audioElement.addEventListener("timeupdate", (e) => {
      this.updateProgress(e);
    });
    nextBtn.addEventListener("click", () => {
      this.next();
    });
    prevBtn.addEventListener("click", () => {
      this.back();
    });
    playBtn.addEventListener("click", () => {
      const isPlaying = this.audioElement.classList.contains("play");
      isPlaying ? this.pause() : this.play();
    });
    progressContainer.addEventListener("click", (e) => {
      this.setProgress(e);
    });
    progressContainer.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.handleProgressDrag(e);
    });
    document.querySelector("#shuffle").addEventListener("click", () => {
      this.randomize();
      console.log("New Playlist:", Audio.audioList);
    });
    document.querySelector("#repeat").addEventListener("click", () => {
      this.repeat();
      console.log("Repeat Mode: ", this.isRepeatClicked);
    });
    /* To prevent performance issues, where the event is triggered many times per second,
     * we apply throttle of 50 seconds to make sure the function can only run every 50 ms
     *  which reduces unnecessary calls and make it faster and smoother.
     */
    document.addEventListener(
      "mousemove",
      throttle((e) => {
        if (this.isDragging) {
          this.handleProgressDrag(e);
        }
      }, 50)
    );

    document.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    volumeSlider.addEventListener("input", (e) => {
      this.changeVolume(e.target.value);
    });
  }
  loadAudio(activeAudioIdx) {
    const activeAudio = Audio.audioList[activeAudioIdx];
    this.audioElement.src = activeAudio.src;
    this.playerThumbnail.src = activeAudio.imgSrc;
    this.titleElement.innerText = activeAudio.title;
    this.performerElement.innerText = activeAudio.performer;
  }
  play() {
    this.audioElement.classList.add("play");
    this.playBtn.innerText = "||";
    this.audioElement.play();
  }
  pause() {
    this.audioElement.classList.remove("play");
    this.playBtn.innerText = ">";
    this.audioElement.pause();
  }
  next() {
    this.activeAudioIdx = (this.activeAudioIdx + 1) % Audio.audioList.length;
    this.loadAudio(this.activeAudioIdx);
    this.play();
  }
  back() {
    this.activeAudioIdx = Math.abs(
      (this.activeAudioIdx - 1) % Audio.audioList.length
    );
    this.loadAudio(this.activeAudioIdx);
    this.play();
  }
  updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    // Go to next automatically
    const currentAudioIdx = this.activeAudioIdx;
    // check if repeat button clicked
    if (currentTime === duration && this.isRepeatClicked) {
      this.currentTime = 0;
      this.activeAudioIdx = currentAudioIdx;
      this.loadAudio(this.activeAudioIdx);
      this.play();
    } else if (currentTime === duration) {
      this.next();
    }

    let timeInMinutes = Math.floor(currentTime / 59);
    let timeInSeconds = Math.round(currentTime % 59);
    timeInMinutes =
      String(timeInMinutes).length < 2 ? `0${timeInMinutes}` : timeInMinutes;
    timeInSeconds =
      String(timeInSeconds).length < 2 ? `0${timeInSeconds}` : timeInSeconds;
    const progressBar = this.progressContainer.children[0];
    const progressCurrentTime = this.progressContainer.children[1];
    progressBar.style.width = `${progressPercent}%`;
    progressCurrentTime.innerText = `${timeInMinutes}:${timeInSeconds}
    `;
  }
  setProgress(e) {
    const width = this.progressContainer.clientWidth || 1;
    const clickX = e.offsetX;
    const duration = this.audioElement.duration;
    const clickTime = (clickX / width) * duration;
    this.audioElement.currentTime = clickTime;
  }

  handleProgressDrag(e) {
    const progressContainer = this.progressContainer;
    const rect = progressContainer.getBoundingClientRect(); // Get the bounding box of the progress container
    const offsetX = e.clientX - rect.left; // Calculate the X offset relative to the container's start
    const width = progressContainer.clientWidth; // Get the width of the progress container

    // Ensure the drag doesn't go out of bounds
    const validOffsetX = Math.max(0, Math.min(offsetX, width));

    const duration = this.audioElement.duration;
    const newTime = (validOffsetX / width) * duration; // Calculate the new audio time

    // Update the audio's current time and the progress bar
    if (!isNaN(newTime)) {
      this.audioElement.currentTime = newTime;
    }

    // Update progress bar width
    const progressBar = this.progressContainer.children[0];
    const progressPercent = (newTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }
  randomize() {
    let array = Audio.audioList;
    for (var i = array.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    this.loadAudio(this.activeAudioIdx);
  }
  repeat() {
    this.isRepeatClicked
      ? (this.isRepeatClicked = false)
      : (this.isRepeatClicked = true);
  }

  changeVolume(val) {
    this.audioElement.volume = val;
  }
}

new Player(
  document.querySelector(".player audio"),
  document.querySelector(".player #title"),
  document.querySelector(".player #performer"),
  document.querySelector(".player #cover"),
  document.querySelector(".player #play"),
  document.querySelector(".player #next"),
  document.querySelector(".player #prev"),
  document.querySelector(".player .progress-container"),
  document.querySelector(".player #volume-slider")
);
