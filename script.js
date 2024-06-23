// script.js
let timer;
let isRunning = false;
let elapsedTime = 0;
let lapCounter = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');
const lapSound = document.getElementById('lapSound');
const resetSound = document.getElementById('resetSound');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        timer = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        lapCounter++;
        lapTimes.push({ lap: lapCounter, time: lapTime });
        updateLapList();
        lapSound.currentTime = 0;
        lapSound.play();
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 0;
    lapTimes = [];
    display.textContent = formatTime(0);
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    resetSound.currentTime = 0;
    resetSound.play();
});

function updateTime() {
    elapsedTime++;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function updateLapList() {
    laps.innerHTML = '';
    lapTimes.forEach(lap => {
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.textContent = `Lap ${lap.lap}: ${lap.time}`;
        laps.appendChild(lapElement);
    });
}
