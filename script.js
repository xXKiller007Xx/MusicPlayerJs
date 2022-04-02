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
    title: "Là Ai Từ Bỏ, Là Ai Vô Yình",
    song_path: "data/mp3/LaAiTuBo,LaAiVoTinh.mp3",
    song_img: "data/img/LaAiTuBo,LaAiVoTinh.jpg",
    singer: "Hương Ly, Jombie",
    album: "Là Ai Từ Bỏ, Là Ai Vô Tình (Single)",
  },
  {
    id: 1,
    title: "Em Của Ngày Hôm Qua",
    song_path: "data/mp3/EmCuaNgayHomQua.mp3",
    song_img: "data/img/EmCuaNgayHomQua.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em Của Ngày Hôm Qua (Single)",
  },
  {
    id: 2,
    title: "We Don't Talk Anymore",
    song_path: "data/mp3/WeDontTalkAnymore.mp3",
    song_img: "data/img/WeDontTalkAnymore.jpg",
    singer: "Charlie Puth, Selena Gomez",
    album: "Nine Track Mile",
  },
  {
    id: 3,
    title: "Let The Battle Begin!-A Merc's Job",
    song_path: "data/mp3/LetTheBattlesBegin!-AMerc'sJob.mp3",
    song_img: "data/img/ff7remake.jpg",
    singer: "",
    album: "FINAL FANTASY VII REMAKE ORIGINAL SOUNDTRACK",
  },
  {
    id: 4,
    title: "Em của ngày hôm qua",
    song_path: "data/mp3/La Ai Tu Bo, La Ai Vo Tinh.mp3",
    song_img: "data/img/La Ai Tu Bo, La Ai Vo Tinh.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em của ngày hôm qua (Single)",
  },
  {
    id: 5,
    title: "Em của ngày hôm qua",
    song_path: "data/mp3/LaAiTuBo,LaAiVoTinh.mp3",
    song_img: "data/img/LaAiTuBo,LaAiVoTinh.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em Của Ngày Hôm Qua (Single)",
  },
  {
    id: 6,
    title: "Em của ngày hôm qua",
    song_path: "data/mp3/La Ai Tu Bo, La Ai Vo Tinh.mp3",
    song_img: "data/img/La Ai Tu Bo, La Ai Vo Tinh.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em của ngày hôm qua (Single)",
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
    for (let i = 0; i < shuffleMusic(Music_Player).length; i++) {
      playMusic(shuffleMusic(Music_Player)[i]);
    }
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
  range_btn.value = playedPercentage;
});
range_btn.addEventListener("change", (e) => {
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
  playMusic(index);
});
prev_btn.addEventListener("click", () => {
  if (index == 0) {
    index = Music_Player.length - 1;
  } else {
    index--;
  }
  playMusic(index);
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

var shuffleMusic = (arr) => {
  var tempArr = new Array();
  tempArr[0] = Math.floor(Math.random() * (arr.length - 1));
  for (let i = 1; i < arr.length - 1; i++) {
    tempArr[i] = Math.floor(Math.random() * (arr.length - 1));
  }
  return tempArr;
};

const list = $$(".list");
function setActive(index) {
  list[index].classList.remove("title_no_active");
  list[index].classList.add("title_active");
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", () => {
      eraseActive();
      if (!list[i].classList.contains("title_active")) {
        list[i].classList.remove("title_no_active");
        list[i].classList.add("title_active");
        isPlaying = true;
        if (isPlaying) {
          play_pause_btn.innerHTML = pause;
        } else {
          play_pause_btn.innerHTML = play;
        }
        playMusic(list[i].value);
      }
    });
  }
}
function eraseActive() {
  for (let i = 0; i < list.length; i++) {
    list[i].classList.remove("title_active");
    list[i].classList.add("title_no_active");
  }
}
setActive(index);
