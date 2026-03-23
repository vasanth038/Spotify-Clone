/* ==== MAIN ===== */

let play = document.getElementById("play");
let progressBar = document.getElementById("progress-bar");
let forward = document.getElementById("forward");
let backward = document.getElementById("backward");
let shuffle = document.getElementById("shuffle");
let repeat = document.getElementById("repeat");
let nowbar = document.querySelector('.now-bar');

let audio = new Audio();
let currentPlaying = null;
let currentSong = 1;
let songOnShuffle = false;
let songOnRepeat = false;


/* ========== SONG'S ========= */

let songs = [
    { songName: 'Song 1', songDes: 'This is the description for song 1', songImage: 'images/1.jpeg', songPath: 'Audio/1.mp3' },
    { songName: 'Song 2', songDes: 'This is the description for song 2', songImage: 'images/2.jpeg', songPath: 'Audio/2.mp3' },
    { songName: 'Song 3', songDes: 'This is the description for song 3', songImage: 'images/3.jpeg', songPath: 'Audio/3.mp3' },
    { songName: 'Song 4', songDes: 'This is the description for song 4', songImage: 'images/4.jpeg', songPath: 'Audio/4.mp3' },
    { songName: 'Song 5', songDes: 'This is the description for song 5', songImage: 'images/5.jpeg', songPath: 'Audio/5.mp3' },
    { songName: 'Song 6', songDes: 'This is the description for song 6', songImage: 'images/6.jpeg', songPath: 'Audio/6.mp3' },
    { songName: 'Song 7', songDes: 'This is the description for song 7', songImage: 'images/7.jpeg', songPath: 'Audio/7.mp3' },
    { songName: 'Song 8', songDes: 'This is the description for song 8', songImage: 'images/8.jpeg', songPath: 'Audio/8.mp3' },
    { songName: 'Song 9', songDes: 'This is the description for song 9', songImage: 'images/9.jpeg', songPath: 'Audio/9.mp3' },
    { songName: 'Song 10', songDes: 'This is the description for song 10', songImage: 'images/10.jpeg', songPath: 'Audio/10.mp3' },
    { songName: 'Song 11', songDes: 'This is the description for song 11', songImage: 'images/11.jpeg', songPath: 'Audio/11.mp3' },
    { songName: 'Song 12', songDes: 'This is the description for song 12', songImage: 'images/12.jpeg', songPath: 'Audio/12.mp3' },
    { songName: 'Song 13', songDes: 'This is the description for song 13', songImage: 'images/13.jpeg', songPath: 'Audio/13.mp3' },
    { songName: 'Song 14', songDes: 'This is the description for song 14', songImage: 'images/14.jpeg', songPath: 'Audio/14.mp3' },
    { songName: 'Song 15', songDes: 'This is the description for song 15', songImage: 'images/15.jpeg', songPath: 'Audio/15.mp3' },
    { songName: 'Song 16', songDes: 'This is the description for song 16', songImage: 'images/16.jpeg', songPath: 'Audio/16.mp3' },
    { songName: 'Song 17', songDes: 'This is the description for song 17', songImage: 'images/17.jpeg', songPath: 'Audio/17.mp3' },
    { songName: 'Song 18', songDes: 'This is the description for song 18', songImage: 'images/18.jpeg', songPath: 'Audio/18.mp3' },
];

let order = [...songs];


/* ========  SETUP ========= */

let allMusics = Array.from(document.getElementsByClassName('music-card'));
let playmusic = Array.from(document.getElementsByClassName("musicplay"));

allMusics.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('image-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('image-description')[0].innerText = songs[i].songDes;
});

audio.src = songs[0].songPath;
updateNowBar();


/* ======= ICON CONTROL ============ */

const setPlayIcon = () => {
    play.classList.add('fa-circle-play');
    play.classList.remove('fa-circle-pause');
    if (currentPlaying) {
        currentPlaying.classList.add('fa-circle-play');
        currentPlaying.classList.remove('fa-circle-pause');
    }
};

const setPauseIcon = () => {
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
    if (currentPlaying) {
        currentPlaying.classList.remove('fa-circle-play');
        currentPlaying.classList.add('fa-circle-pause');
    }
};

const makeAllPause = () => {
    playmusic.forEach(el => {
        el.classList.add('fa-circle-play');
        el.classList.remove('fa-circle-pause');
    });
};


/* ====NOW BAR UPDATE ====== */

function updateNowBar() {
    nowbar.getElementsByTagName('img')[0].src = order[currentSong - 1].songImage;
    nowbar.getElementsByClassName('img-titel-info')[0].innerText = order[currentSong - 1].songName;
    nowbar.getElementsByClassName('img-dis-info')[0].innerText = order[currentSong - 1].songDes;
}


/* ==== MAIN PLAY BUTTON======== */

play.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        updateNowBar();
        setPauseIcon();
    } else {
        audio.pause();
        setPlayIcon();
    }
});


/* ===== CARD PLAY BUTTONS ======== */

playmusic.forEach(element => {
    element.addEventListener('click', (e) => {

        if (currentPlaying === e.target && !audio.paused) {
            audio.pause();
            setPlayIcon();
            return;
        }

        makeAllPause();
        currentPlaying = e.target;
        currentSong = parseInt(e.target.id);

        audio.src = order[currentSong - 1].songPath;
        audio.currentTime = 0;
        audio.play();

        updateNowBar();
        setPauseIcon();
    });
});


/* ====== NEXT / PREVIOUS====== */

function playNextSong() {

    let wasPlaying = !audio.paused;
    currentSong = currentSong >= order.length ? 1 : currentSong + 1;

    audio.src = order[currentSong - 1].songPath;
    audio.currentTime = 0;

    makeAllPause();
    currentPlaying = playmusic.find(el => parseInt(el.id) === currentSong) || null;

    if (wasPlaying) {
        audio.play();
        setPauseIcon();
    } else {
        setPlayIcon();
    }

    updateNowBar();
}

function playPrevSong() {

    let wasPlaying = !audio.paused;
    currentSong = currentSong <= 1 ? order.length : currentSong - 1;

    audio.src = order[currentSong - 1].songPath;
    audio.currentTime = 0;

    makeAllPause();
    currentPlaying = playmusic.find(el => parseInt(el.id) === currentSong) || null;

    if (wasPlaying) {
        audio.play();
        setPauseIcon();
    } else {
        setPlayIcon();
    }

    updateNowBar();
}

forward.addEventListener('click', playNextSong);
backward.addEventListener('click', playPrevSong);


/* ======== PROGRESS BAR======= */

audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

progressBar.addEventListener('input', function () {
    if (!audio.duration) return;
    audio.currentTime = (this.value * audio.duration) / 100;
});


/* ======== REPEAT========== */

audio.addEventListener('ended', () => {
    progressBar.value = 0;

    if (songOnRepeat) {
        audio.currentTime = 0;
        audio.play();
    } else {
        playNextSong();
    }
});


/* ====SHUFFLE======== */

function shuffleSongs(arr) {
    let temp = [...arr];
    for (let i = temp.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    return temp;
}

shuffle.addEventListener('click', () => {

    if (!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;

        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order = shuffleSongs(songs);
        currentSong = 1;
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');
        order = songs;
    }
});

repeat.addEventListener('click', () => {

    if (!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;

        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
});
// timer // 
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

let currentTimeEl = document.getElementById("current-time");
let totalTimeEl = document.getElementById("total-time");

audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});
let volumeBar = document.getElementById("volume-bar");
let volumeIcon = document.getElementById("volume-icon");

volumeBar.addEventListener('input', function () {
    audio.volume = this.value / 100;
    if (this.value == 0) {
        volumeIcon.className = 'fa-solid fa-volume-xmark';
    } else if (this.value < 50) {
        volumeIcon.className = 'fa-solid fa-volume-low';
    } else {
        volumeIcon.className = 'fa-solid fa-volume-high';
    }
});

volumeIcon.addEventListener('click', () => {
    if (audio.volume > 0) {
        audio.volume = 0;
        volumeBar.value = 0;
        volumeIcon.className = 'fa-solid fa-volume-xmark';
    } else {
        audio.volume = 1;
        volumeBar.value = 100;
        volumeIcon.className = 'fa-solid fa-volume-high';
    }
});