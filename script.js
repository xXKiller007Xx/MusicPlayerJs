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
//Declare Var Control
var index = 0;
var isPlaying = false;
var isLoop = false;
var isShuffle = audio.loop;
//Declare Main Component
const Music_Player = [
  {
    id: 0,
    title: "Là ai từ bỏ, là ai vô tình",
    song_path: "data/mp3/La Ai Tu Bo, La Ai Vo Tinh.mp3",
    song_img: "data/img/La Ai Tu Bo, La Ai Vo Tinh.jpg",
    singer: "Hương Ly, Jombie",
    album: "Là ai từ bỏ, là ai vô tình (Single)",
  },
  {
    id: 1,
    title: "Em của ngày hôm qua",
    song_path: "/data/mp3/Em Cua Ngay Hom Qua.mp3",
    song_img: "/data/img/Em Cua Ngay Hom Qua.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em của ngày hôm qua (Single)",
  },
  {
    id: 2,
    title: "We don't talk Anymore",
    song_path: "/data/mp3/We Dont Talk Anymore.mp3",
    song_img: "/data/img/We Dont Talk Anymore.jpg",
    singer: "Charlie Puth, Selena Gomez",
    album: "Nine Track Mile",
  },
  {
    id: 3,
    title: "Em của ngày hôm qua",
    song_path: "/data/mp3/La Ai Tu Bo, La Ai Vo Tinh.mp3",
    song_img: "/data/img/La Ai Tu Bo, La Ai Vo Tinh.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em của ngày hôm qua (Single)",
  },
  {
    id: 4,
    title: "Em của ngày hôm qua",
    song_path: "/data/mp3/La Ai Tu Bo, La Ai Vo Tinh.mp3",
    song_img: "/data/img/La Ai Tu Bo, La Ai Vo Tinh.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em của ngày hôm qua (Single)",
  },
  {
    id: 5,
    title: "Em của ngày hôm qua",
    song_path: "/data/mp3/La Ai Tu Bo, La Ai Vo Tinh.mp3",
    song_img: "/data/img/La Ai Tu Bo, La Ai Vo Tinh.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em của ngày hôm qua (Single)",
  },
  {
    id: 6,
    title: "Em của ngày hôm qua",
    song_path: "/data/mp3/La Ai Tu Bo, La Ai Vo Tinh.mp3",
    song_img: "/data/img/La Ai Tu Bo, La Ai Vo Tinh.jpg",
    singer: "Sơn Tùng M-TP",
    album: "Em của ngày hôm qua (Single)",
  },
];
//Event Handler
shuffle_btn.addEventListener("click", () => {
  shuffle_btn.classList.toggle("active");
});
replay_btn.addEventListener("click", () => {
  replay_btn.classList.toggle("active");
  isLoop = !isLoop;
  window.alert(isLoop);
});
audio.addEventListener("ended", () => {
  range_btn.value = 0;
  if (isLoop) {
    audio.loop = isLoop;
    audio.play();
  } else {
    if (index == Music_Player.length - 1) {
      index = 0;
    } else {
      index++;
    }
  }
  playMusic(index);
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
  console.log(playedPercentage);
});
range_btn.addEventListener("change", (e) => {
  audio.currentTime = (range_btn.value / 100) * audio.duration;
});

songs.innerHTML = Music_Player.map(
  (e) =>
    `<li value="${e.id}" onclick="this.classList.add('title_active')"><p>${e.title}</p><p>${e.singer}</p></li>`
).join("");
next_btn.addEventListener("click", () => {
  if (index == Music_Player.length - 1) {
    index = 0;
  } else {
    index++;
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
