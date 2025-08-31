var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videoInfo = null, apiReady = false, player = null, ready=false, interval = null;
window["onYouTubeIframeAPIReady"] = function() {
  apiReady = true;
  if(videoInfo) {
    doLoadVideo();
  }
}

export function loadVideo(videoId, start, end) {
  videoInfo = { videoId, start, end };
  if(apiReady) {
    doLoadVideo();
  }
  if (ready) {
    player.seekTo(videoInfo.start, true);
    player.playVideo();
  }
}

function doLoadVideo() {
  if (!player) {
    player = new YT.Player('player', {
      videoId: videoInfo.videoId,
      playerVars: {
        'playsinline': 0,
        'disablekd': 1,
        'fs': 0,
        'controls': 0
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  } else {
    player.playVideoById(videoInfo.videoId);
  }
}

function onPlayerReady() {
  ready = true;
  if(videoInfo) {
    player.seekTo(videoInfo.start, true);
    player.playVideo();
    //player.pauseVideo();
  }
}

function onPlayerStateChange(event) {
  if (event.data == 1) {
    // playinG
    if (!interval) {
      interval = setInterval(checkEndTime, 100);
    }
  } else {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
}

function checkEndTime() {
  if(player.getCurrentTime() > videoInfo.end) {
    player.pauseVideo();
  }
}

document.querySelector('#play').addEventListener("click", (e) => {
  if (window["dev"] && e.ctrlKey) {
    player.seekTo(videoInfo.end - 1);
  } else {
    player.seekTo(videoInfo.start);
  }
  player.playVideo();
});
// document.querySelector('#stop').addEventListener("click", () => {
//   player.pauseVideo();
// });
