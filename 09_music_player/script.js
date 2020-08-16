const musicContainer = document.getElementById('music-container');
const playButton = document.getElementById('play');
const previousButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 0;

function loadSong (songName) {
  title.innerText = songName;
  audio.src = `music/${songName}.mp3`;
  cover.src = `images/${songName}.jpg`;
}

function playSong () {
  musicContainer.classList.add('play');
  playButton.querySelector('i.fas').classList.remove('fa-play');
  playButton.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong () {
  musicContainer.classList.remove('play');
  playButton.querySelector('i.fas').classList.add('fa-play');
  playButton.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong () {
  songIndex === 0 ? songIndex : songIndex--;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong () {
  songIndex === songs.length - 1 ? songIndex : songIndex++;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress (e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;

  progress.style.width = `${progressPercentage}%`;
}

function setProgress (e) {
  const totalWidth = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  const progressRequest = (clickX / totalWidth) * duration;
  audio.currentTime = progressRequest;
}

playButton.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

previousButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

progressContainer.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);

loadSong(songs[songIndex]);

audio.addEventListener('ended', nextSong);
