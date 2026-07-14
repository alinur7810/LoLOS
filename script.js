const clockEl = document.getElementById('clock');

function updateClock(){
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();


    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes <10 ? '0'+minutes : minutes;
    second = seconds < 10 ? '0' + seconds: seconds;

    clockEl.textContent = `${hours}:${minutes}:${seconds}`;

}

updateClock();

setInterval(updateClock, 1000);