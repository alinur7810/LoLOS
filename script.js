const clockEl = document.getElementById('clock');

function updateClock(){
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);

const windowAbout = document.getElementById('window-about');
const windowHeader = windowAbout.querySelector('.window-header');

let isDrag = false;
let x = 0;
let y = 0;

if (windowHeader) {
    windowHeader.addEventListener('mousedown', (event) => {
        isDrag = true;
        x = event.clientX - windowAbout.offsetLeft;
        y = event.clientY - windowAbout.offsetTop;
        windowHeader.style.cursor = 'grabbing';
    });
}

document.addEventListener('mousemove', (event) => {
    if (!isDrag) return;
    const newX = event.clientX - x;
    const newY = event.clientY - y;
    windowAbout.style.left = newX + 'px';
    windowAbout.style.top = newY + 'px';
});

document.addEventListener('mouseup', () => {
    if (!isDrag) return;
    isDrag = false;
    if (windowHeader) windowHeader.style.cursor = 'grab';
});


