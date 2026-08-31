const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");
const albumArt = document.getElementById("album-art");

const progress = document.getElementById("progress");

const currentTimeDisplay =
    document.getElementById("current-time");

const durationDisplay =
    document.getElementById("duration");

const volume = document.getElementById("volume");

const playlistElement =
    document.getElementById("playlist");

const player =
    document.querySelector(".music-player");


// --------------------------------------------------
// Playlist
// --------------------------------------------------

const songs = [

    {
        title: "Dreams",
        artist: "Benjamin Tissot",
        // audio: "https://www.bensound.com/bensound-music/bensound-dreams.mp3",
        audio: "https://www.bensound.com/royalty-free-music/track/dreams-chill-out",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
    },

    {
        title: "Energy",
        artist: "Benjamin Tissot",
        audio: "https://www.bensound.com/bensound-music/bensound-energy.mp3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
    },

    {
        title: "Sunny",
        artist: "Benjamin Tissot",
        audio: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
    },

    {
        title: "Acoustic Breeze",
        artist: "Benjamin Tissot",
        audio: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
        image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b"
    }

];

let currentSong = 0;


// --------------------------------------------------
// Load Song
// --------------------------------------------------

function loadSong(index) {

    const song = songs[index];

    title.textContent = song.title;

    artist.textContent = song.artist;

    albumArt.src = song.image;

    audio.src = song.audio;

    progress.value = 0;

    currentTimeDisplay.textContent = "0:00";

    durationDisplay.textContent = "0:00";

    updatePlaylist();
}


// --------------------------------------------------
// Play Song
// --------------------------------------------------

function playSong() {

    audio.play();

    playButton.textContent = "⏸";

    player.classList.add("playing");
}


// --------------------------------------------------
// Pause Song
// --------------------------------------------------

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

    player.classList.remove("playing");
}


// --------------------------------------------------
// Play / Pause Button
// --------------------------------------------------

playButton.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// --------------------------------------------------
// Next Song
// --------------------------------------------------

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    playSong();
}

nextButton.addEventListener("click", nextSong);


// --------------------------------------------------
// Previous Song
// --------------------------------------------------

function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    playSong();
}

previousButton.addEventListener(
    "click",
    previousSong
);


// --------------------------------------------------
// Update Progress Bar
// --------------------------------------------------

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) {
        return;
    }

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

    currentTimeDisplay.textContent =
        formatTime(audio.currentTime);

});


// --------------------------------------------------
// Song Duration
// --------------------------------------------------

audio.addEventListener("loadedmetadata", () => {

    durationDisplay.textContent =
        formatTime(audio.duration);

});


// --------------------------------------------------
// Seek
// --------------------------------------------------

progress.addEventListener("input", () => {

    if (!audio.duration) {
        return;
    }

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


// --------------------------------------------------
// Volume
// --------------------------------------------------

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// --------------------------------------------------
// Automatically Play Next Song
// --------------------------------------------------

audio.addEventListener("ended", () => {

    nextSong();

});


// --------------------------------------------------
// Format Time
// --------------------------------------------------

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}


// --------------------------------------------------
// Create Playlist
// --------------------------------------------------

function updatePlaylist() {

    playlistElement.innerHTML = "";

    songs.forEach((song, index) => {

        const li =
            document.createElement("li");

        if (index === currentSong) {
            li.classList.add("active");
        }

        li.innerHTML = `
            <strong>${song.title}</strong>
            <span>${song.artist}</span>
        `;

        li.addEventListener("click", () => {

            currentSong = index;

            loadSong(currentSong);

            playSong();

        });

        playlistElement.appendChild(li);

    });

}


// --------------------------------------------------
// Keyboard Controls
// --------------------------------------------------

document.addEventListener("keydown", (event) => {

    // Space = Play/Pause
    if (event.code === "Space") {

        event.preventDefault();

        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }

    }

    // Right arrow = Next
    if (event.key === "ArrowRight") {
        nextSong();
    }

    // Left arrow = Previous
    if (event.key === "ArrowLeft") {
        previousSong();
    }

});


// --------------------------------------------------
// Start Player
// --------------------------------------------------

loadSong(currentSong);
audio.volume = volume.value;