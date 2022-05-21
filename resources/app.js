import Timer from './timer.js';

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempoText');
const decreaseBPMButton = document.querySelector('.decreaseBPM');
const increaseBPMButton = document.querySelector('.increaseBPM');
const tempoSlider = document.querySelector('.slider');
const startStopButton = document.querySelector('.startStop');
const subBeat = document.querySelector('.subBeat');
const addBeat = document.querySelector('.addBeat');
const measureCount = document.querySelector('.measureCount');

const click1 = new Audio('./resources/assets/KickSample.wav');
const click2 = new Audio('./resources/assets/SnareSample.wav');
const click3 = new Audio('./resources/assets/HiHatSample.wav');
const click4 = new Audio('./resources/assets/SticksSample.wav');

let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = 'Fast';

decreaseBPMButton.addEventListener('click', () => {
  bpm--;
  validTempo();
  updateMetronome();
});

increaseBPMButton.addEventListener('click', () => {
  bpm++;
  validTempo();
  updateMetronome();
});

tempoSlider.addEventListener('input', () => {
  bpm = tempoSlider.value;
  validTempo();
  updateMetronome();
});

subBeat.addEventListener('click', () => {
  if (beatsPerMeasure <= 2) {
    return;
  }

  beatsPerMeasure--;
  measureCount.textContent = beatsPerMeasure;
  count = 0;
});

addBeat.addEventListener('click', () => {
  if (beatsPerMeasure >= 12) {
    return;
  }

  beatsPerMeasure++;
  measureCount.textContent = beatsPerMeasure;
});

startStopButton.addEventListener('click', () => {
  count = 0;
  if (!isRunning) {
    metronome.start();
    isRunning = true;
    startStopButton.textContent = 'STOP';
  } else {
    metronome.stop();
    isRunning = false;
    startStopButton.textContent = 'START';
  }
});

function updateMetronome() {
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  metronome.timeInterval = 60000 / bpm; //60000ms divided by bpm for tempo

  if (bpm <= 40) { tempoTextString = 'Really Slow'; }

  if (bpm > 40 && bpm <= 60) { tempoTextString = 'Slow'; }

  if (bpm > 60 && bpm <= 100) { tempoTextString = 'Regular'; }

  if (bpm > 100 && bpm <= 160) { tempoTextString = 'Fast'; }

  if (bpm > 160 && bpm <= 200) { tempoTextString = 'Really Fast'; }

  if (bpm > 200 && bpm <= 280) { tempoTextString = 'Shred'; }

  tempoText.textContent = tempoTextString;
}

function validTempo() {
  if (bpm <= 20 || bpm >= 280) {
    return;
  }
}

function playClick() {
  if (count === beatsPerMeasure) {
    count = 0;
  }

  if (count === 0) {
    click1.play();
    click1.currentTime = 0;
  } else {
    click3.play();
    click3.currentTime = 0;
  }

  count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });
