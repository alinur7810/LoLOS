const clockEl = document.getElementById('clock');

function updateClock(){
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);

let highestZIndex = 10;

function bringToFront(windowEl) {
    highestZIndex++;
    windowEl.style.zIndex = highestZIndex;
}

function makeDrag(windowEl) {
    const header = windowEl.querySelector('.window-header');
    if (!header) return;

    let isDrag = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener('mousedown', (event) => {
        isDrag = true;
        offsetX = event.clientX - windowEl.offsetLeft;
        offsetY = event.clientY - windowEl.offsetTop;
        header.style.cursor = 'grabbing';
        bringToFront(windowEl);
        event.preventDefault();
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDrag) return;
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;
        windowEl.style.left = newX + 'px';
        windowEl.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (!isDrag) return;
        isDrag = false;
        header.style.cursor = 'grab';
    });
}

const windowAbout = document.getElementById('window-about');
const windowNotepad = document.getElementById('window-notepad');

if (windowAbout) makeDrag(windowAbout);
if (windowNotepad) makeDrag(windowNotepad);

function setWinCtrl(shortcutId, windowEl, closeBtnID) {
    const shortcut = document.getElementById(shortcutId);
    const closeBtn = document.getElementById(closeBtnID);
    if (!shortcut || !closeBtn || !windowEl) return;

    closeBtn.addEventListener('click', () => {
        windowEl.style.display = 'none';
    });

    shortcut.addEventListener('dblclick', () => {
        windowEl.style.display = 'flex';
        bringToFront(windowEl);
    });
}

setWinCtrl('shortcut-about', windowAbout, 'close-about');
setWinCtrl('shortcut-notepad', windowNotepad, 'close-notepad');


const windowPlayer = document.getElementById('window-player');

makeDrag(windowPlayer);
setWinCtrl('shortcut-player', windowPlayer, 'close-player');

const audioEl=document.getElementById('audio-element');
const playBtn = document.getElementById('btn-play');
const pauseBtn = document.getElementById('btn-pause');
const playerScreen = document.getElementById('player-screen');
const playlistItems = document.querySelectorAll('.playlist-item');


let currActiveSong = null;

playlistItems.forEach(item => {
    item.addEventListener('click', () => {
        if (currActiveSong) {
            currActiveSong.classList.remove('active');
        }

        currActiveSong = item;
        item.classList.add('active');

        const songUrl = item.getAttribute('data-src');
        audioEl.src = songUrl;
        audioEl.play();

        playerScreen.textContent = 'Playing: ' + item.textContent; 
    });
});


playBtn.addEventListener('click', () => {
    if (audioEl.src){
        audioEl.play();
        if (currActiveSong){
            playerScreen.textContent = "Playing: " + currActiveSong.textContent;
        }
        else{
            playerScreen.textContent = "Select a song first!";
        }
    }
});

pauseBtn.addEventListener('click', () => {
    audioEl.pause();
    playerScreen.textContent = "Paused";
}); 
