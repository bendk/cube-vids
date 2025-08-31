import './style.css'

import {loadVideo} from './youtube.js';

var index = 0;

function loadNextCase() {
  document.querySelector('#counter').textContent = `Case ${index + 1} of ${cases.length}`;
  const [cubeCase, videoId, startTime, endTime] = cases[index];
  index = (index + 1) % cases.length;
  const fc = cubeCase.replace(/ /g, "") + "n".repeat(27);
  document.querySelector('#cube').src = `https://cube.rider.biz/visualcube.php?fmt=svg&size=200&pzl=3&fc=${fc}`;
  loadVideo(videoId, startTime, endTime);
}


// shuffle an array use Knuth shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

if (window["firstCaseOnly"]) {
  cases.splice(1);
} else {
  shuffle(cases);
}
loadNextCase();

document.querySelector('#next').addEventListener("click", () => {
  loadNextCase();
});
