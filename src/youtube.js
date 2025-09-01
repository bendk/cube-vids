const params = new URLSearchParams(document.location.search);
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videoInfo = null, apiReady = false, player = null, interval = null;
window["onYouTubeIframeAPIReady"] = function() {
  apiReady = true;
  if(videoInfo) {
    doLoadVideo();
  }
}

export function loadVideo(videoInfoToLoad) {
  videoInfo = videoInfoToLoad;
  if(apiReady) {
    player.stopVideo();
    doLoadVideo();
    player.seekTo(videoInfo.start, true);
    player.pauseVideo();
  }
}

function doLoadVideo() {
  if (!player) {
    player = new YT.Player('video', {
      videoId: videoInfo.id,
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
    player.loadVideoById(videoInfo.videoId);
  }
}

function onPlayerReady() {
  if(videoInfo) {
    player.seekTo(videoInfo.start, true);
    player.pauseVideo();
  }
}

function onPlayerStateChange(event) {
  if (event.data == 1) {
    // playing
    if (!interval) {
      interval = setInterval(checkTime, 100);
    }
  } else {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
}

function checkTime() {
  const time = player.getCurrentTime();
  if(time > videoInfo.end) {
    player.pauseVideo();
  } else if (videoInfo.skip) {
    for(const [start, end] of videoInfo.skip) {
      if (time > start && time < end) {
        player.seekTo(end);
        return;
      }
    }
  }
}

const play = document.getElementById('play');
play.addEventListener("click", () => {
  player.seekTo(videoInfo.start);
  player.playVideo();
});

if (params.has("dev")) {
  const playEnd = document.createElement("button");
  playEnd.textContent = "Play End";
  playEnd.addEventListener("click", () => {
    player.seekTo(videoInfo.end - 1);
    player.playVideo();
  });
  play.parentNode.appendChild(playEnd);
}
