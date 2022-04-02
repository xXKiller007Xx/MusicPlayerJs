//Declare Selector
const $ = document.querySelector.bind(this.document);
const $$ = document.querySelectorAll.bind(this.document);
//Declare Element
const img = $("#song_img");
const pause = `<i class="bi bi-pause-circle"></i>`;
const play = `<i class="bi bi-play-circle"></i>`;
const play_pause_btn = $("#play_pause_btn");
const shuffle_btn = $("#shuffle_btn");
const singer = $("#singer");
const album = $("#album");
const songs = $("#songs");
const audio = $("#aud");
const range_btn = $("#range_btn");
const replay_btn = $("#replay_btn");
const next_btn = $("#next_btn");
const prev_btn = $("#prev_btn");
//Declare Var Control
var index = 0;
var isPlaying = false;
var isLoop = false;
var isShuffle = false;
//Declare Main Component
const Music_Player = [
  {
    id: 0,
    title: "Là Ai Từ Bỏ, Là Ai Vô Tình",
    song_path: "data/mp3/0.mp3",
    song_img: "data/img/0.jpg",
    singer: "Hương Ly, Jombie",
    album: "Là Ai Từ Bỏ, Là Ai Vô Tình (Single)",
  },
  {
    id: 1,
    title: "Em Của Ngày Hôm Qua",
    song_path: "data/mp3/1.mp3",
    song_img: "data/img/1.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em Của Ngày Hôm Qua (Single)",
  },
  {
    id: 2,
    title: "We Don't Talk Anymore",
    song_path: "data/mp3/2.mp3",
    song_img: "data/img/2.jpg",
    singer: "Charlie Puth, Selena Gomez",
    album: "Nine Track Mile",
  },
  {
    id: 3,
    title: "Let The Battle Begin!-A Merc's Job",
    song_path: "data/mp3/3.mp3",
    song_img: "data/img/3.jpg",
    singer: "",
    album: "FINAL FANTASY VII REMAKE ORIGINAL SOUNDTRACK",
  },
  {
    id: 4,
    title: "Haru Haru",
    song_path: "data/mp3/4.mp3",
    song_img: "data/img/4.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em của ngày hôm qua (Single)",
  },
  {
    id: 5,
    title: "Some Thing Just Like This",
    song_path: "data/mp3/5.mp3",
    song_img: "data/img/5.jpg",
    singer: "The Chainsmokers, ColdpLay",
    album: "Em Của Ngày Hôm Qua (Single)",
  },
  {
    id: 6,
    title: "Faded",
    song_path: "data/mp3/6.mp3",
    song_img: "data/img/6.jpg",
    singer: "Alan Walker",
    album: "Faded (Single)",
  },
];
//Event Handler
shuffle_btn.addEventListener("click", () => {
  shuffle_btn.classList.toggle("active");
  isShuffle = !isShuffle;
  console.log(isShuffle);
});
replay_btn.addEventListener("click", () => {
  replay_btn.classList.toggle("active");
  isLoop = !isLoop;
  console.log(isLoop);
});
audio.addEventListener("ended", () => {
  range_btn.value = 0;
  if (isLoop) {
    audio.loop = isLoop;
    audio.play();
  }
  if (isShuffle) {
  } else {
    if (index == Music_Player.length - 1) {
      index = 0;
    } else {
      index++;
    }
    playMusic(index);
  }
});
play_pause_btn.addEventListener("click", () => {
  if (!isPlaying) {
    play_pause_btn.innerHTML = pause;
    audio.play();
  } else {
    play_pause_btn.innerHTML = play;
    audio.pause();
  }
  isPlaying = !isPlaying;
  if (isPlaying) {
    img.classList.remove("pause");
  } else {
    img.classList.add("pause");
  }
});
audio.addEventListener("timeupdate", () => {
  let playedPercentage = Math.floor((audio.currentTime / audio.duration) * 100);
  if (audio) range_btn.value = playedPercentage;
});
range_btn.addEventListener("change", () => {
  audio.currentTime = (range_btn.value / 100) * audio.duration;
});

songs.innerHTML = Music_Player.map(
  (e) =>
    `<li class="list title_no_active" value="${e.id}"><div><p><b>${e.title}</b></p><p>${e.singer}</p></div></li>`
).join("");
next_btn.addEventListener("click", () => {
  if (index == Music_Player.length - 1) {
    index = 0;
  } else {
    index++;
  }
  if (isShuffle) {
    playMusic(shuffleMusic(Music_Player));
  } else {
    setActive(index);
    playMusic(index);
  }
  isPlaying = true;
  if (isPlaying) {
    play_pause_btn.innerHTML = pause;
  }
});
prev_btn.addEventListener("click", () => {
  if (audio.currentTime > 2) {
    audio.currentTime = 0;
  } else {
    if (index == 0) {
      index = Music_Player.length - 1;
    } else {
      index--;
    }
    if (isShuffle) {
      playMusic(shuffleMusic(Music_Player));
    } else {
      setActive(index);
      playMusic(index);
    }
    isPlaying = true;
    if (isPlaying) {
      play_pause_btn.innerHTML = pause;
    }
  }
});

function set(index) {
  img.src = Music_Player[index].song_img;
  title.innerHTML = Music_Player[index].title;
  audio.src = Music_Player[index].song_path;
  singer.innerHTML = Music_Player[index].singer;
  album.innerHTML = Music_Player[index].album;
}
function playMusic(index) {
  set(index);
  audio.load();
  audio.play();
}
set(index);

const list = $$(".list");
//
function setActive(index) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("title_active")) {
      list[i].classList.add("title_no_active");
      list[i].classList.remove("title_active");
    }
  }
  list[index].classList.remove("title_no_active");
  list[index].classList.add("title_active");
}
for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", () => {
    setActive(list[i].value);
    playMusic(list[i].value);
  });
}
function eraseActive() {
  for (let i = 0; i < list.length; i++) {
    list[i].classList.remove("title_active");
    list[i].classList.add("title_no_active");
  }
}

setActive(index);
