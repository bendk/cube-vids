import './style.css'

import {loadVideo} from './youtube.js';

const cases = [
  ["nnnnygnng wrnngnnnn nnrnrnnnn", '3B_oB2YrLvk', 186, 191.5],
]

function loadCase() {
  const selectedCase = cases[Math.floor(Math.random() * cases.length)];
  const [cubeCase, videoId, startTime, endTime] = selectedCase;
  const fc = cubeCase.replace(/ /g, "") + "n".repeat(27);
  document.querySelector('#cube').src = `https://cube.rider.biz/visualcube.php?fmt=svg&size=200&pzl=3&fc=${fc}`;
  loadVideo(videoId, startTime, endTime);
}

loadCase();
