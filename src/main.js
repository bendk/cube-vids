import './style.css'
import { PNG, Type, Colors } from "sr-puzzlegen"

import {loadVideo} from './youtube.js';

var index = 0;

function loadNextCase() {
  const [cubeColors, videoId, startTime, endTime, extra] = cases[index];
  if(extra) {
    document.querySelector('#counter').textContent = `Case ${index + 1} of ${cases.length} (${extra})`;
  } else {
    document.querySelector('#counter').textContent = `Case ${index + 1} of ${cases.length}`;
  }
  index = (index + 1) % cases.length;
  const stickerColors = cubeColors
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

  const cube = document.getElementById("cube");
  cube.innerHTML = '';
  PNG(cube, Type.CUBE, {
    puzzle: {
      stickerColors: {
        U: stickerColors[0],
        R: stickerColors[1],
        F: stickerColors[2],
      }
    }
  });
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

if (window["dev"]) {
  cases.splice(1);
} else {
  shuffle(cases);
}
loadNextCase();

document.querySelector('#next').addEventListener("click", () => {
  loadNextCase();
});
