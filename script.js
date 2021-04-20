const image = document.getElementById('album-art');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.getElementById('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'Seven-Nation-Army',
        displayName: 'Seven Nation Army',
        artist: 'The White Stripes',
    },
    {
        name: 'Ziddi-Dil',
        displayName: 'Ziddi Dil',
        artist: 'Vishal Dadlani',
    },
    {
        name: 'Zinda',
        displayName: 'Zinda',
        artist: 'Siddharth Mahadevan',
    },
    {
        name: 'Hey-There-Delilah',
        displayName: 'Hey There Delilah',
        artist: `Plain White T's`,
    },
    {
        name: 'Woh-Ladki',
        displayName: 'Woh Ladki',
        artist: 'Arijit Singh',
    },
];

let isPlaying = false;
let currentSongIndex = 0;


// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

function playSong() {
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
}

function pauseSong() {
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

// Update DOM of progress bar as the song progresses
function updateProgressBar(event) {
    if (isPlaying) {
        const { duration, currentTime } = event.srcElement;

        // Update Progress Bar width in CSS
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Get duration and currentTime in minutes to 2 decimal places, convert to String, replace . with :, check for NaN, and update DOM 
        const durationMinutes = (duration / 60).toFixed(2);
        const currentTimeMinutes = (currentTime / 60).toFixed(2);
        durationElement.textContent = isNaN(durationMinutes) ? '00:00' : durationMinutes.toString().replace('.', ':');
        currentTimeElement.textContent = currentTimeMinutes.toString().replace('.', ':');
    }
}

// Click anywhere on the progress Bar to play from there
function setProgressBar(event) {
    const clientWidth = this.clientWidth;
    const { offsetX } = event;
    const { duration } = music;
    music.currentTime = (offsetX / clientWidth) * duration;  // set the current time of the audio element (in seconds)
}

//  Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

//  On load - select first song
loadSong(songs[currentSongIndex]);