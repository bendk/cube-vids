import './style.css'
import { PNG, Type, Colors } from "sr-puzzlegen"

import {loadVideo} from './youtube.js';

const params = new URLSearchParams(document.location.search);

var index = 0;

function loadNextCase() {
  const currentCase = cases[index];
  var label = `<b>Case ${index + 1} of ${cases.length}</b>`;
  if(currentCase.label) {
    label += `<br>(${currentCase.label})`;
  }
  const puzzle = {rotations};
  if (currentCase.stickers !== undefined) {
    puzzle.stickerColors = formatStickerColors(currentCase.stickers);
  } else if (currentCase.algs !== undefined) {
    const alg = currentCase.algs[Math.floor(Math.random() * currentCase.algs.length)];
    puzzle.alg = alg;
    label += `<br>${alg}`;
  }
  index = (index + 1) % cases.length;
  document.querySelector('#counter').innerHTML = label;
  const cube = document.getElementById("cube");
  cube.innerHTML = '';
  PNG(cube, Type.CUBE, {
    puzzle,
    width: 300,
    height: 300
  });
  loadVideo(currentCase.video);
}

function formatStickerColors(cubeSetup) {
  const colorArray = cubeSetup
    .split(" ")
    .map(c => {
      return Array.from(c).map(color => {
        switch (color) {
          case "y":
            return Colors.YELLOW;
          case "r":
            return Colors.RED;
          case "g":
            return Colors.GREEN;
          case "b":
            return Colors.BLUE;
          case "w":
            return Colors.WHITE;
          case "o":
            return Colors.ORANGE;
          default:
            return Colors.BLACK;
        }
      });
    });
  return {
    U: colorArray[0],
    R: colorArray[1],
    F: colorArray[2]
  };
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

if (params.has("dev")) {
  cases.splice(1);
} else {
  shuffle(cases);
}
loadNextCase();

document.querySelector('#next').addEventListener("click", () => {
  loadNextCase();
});
