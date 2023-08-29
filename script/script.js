const img = document.querySelector('img');
const player = document.querySelector('#player');
const musicName = document.querySelector('.music-name p');
const track = document.querySelector('.track');
const trackTime = document.querySelector('.track .time');
const btnPlay = document.querySelector('.btn-pause');
const btnNextAndBack = document.querySelectorAll('.btn-next-and-back');
const reloadBtn = document.querySelector('.reload');
const fiveSecBtn = document.querySelectorAll('.five-sec-btn');

const music = [
  {
    name: 'STARGAZING',
    img: './images/Screen.png',
    src: './music/Travis-Scott-STARGAZING.mp3',
    type: 'audio/mpeg'
  },
  {
    name: 'ElBakht',
    img: './images/maxresdefault.jpg',
    src: './music/Albumaty.Com_wygz_albkht.mp3',
    type: 'audio/mpeg'
  },
  {
    name: 'Denamet',
    img: './images/Denamet.jpg',
    src: './music/Molotof-ft-Pablo-Denamet.mp3',
    type: 'audio/mpeg'
  }
]

let musicIndex = 0;

btnNextAndBack.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.getAttribute("class") === 'btn-next-and-back next') {
      musicIndex = musicIndex < music.length - 1 ? musicIndex + 1 : 0;
    }
    if (btn.getAttribute("class") === 'btn-next-and-back back') {
      musicIndex = musicIndex > 0 ? musicIndex - 1 : music.length - 1;
    }
    img.src = music[musicIndex].img;
    player.src = music[musicIndex].src;
    musicName.innerHTML = music[musicIndex].name;
    player.type = music[musicIndex].type;
    player.play();
    btnPlay.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  })
});

player.addEventListener('timeupdate', () => {
  let currentTime = (player.currentTime / player.duration) * 100;
  trackTime.style = `width: ${currentTime}%`;
  if (player.currentTime === player.duration) {
    musicIndex = musicIndex < music.length - 1 ? musicIndex + 1 : 0;
    img.src = music[musicIndex].img;
    player.src = music[musicIndex].src;
    musicName.innerHTML = music[musicIndex].name;
    player.type = music[musicIndex].type;
    player.play();
    btnPlay.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  }
});

btnPlay.addEventListener('click', (event) => {
  if (btnPlay.getAttribute("class") === 'btn-play') {
    btnPlay.className = 'btn-pause';
    btnPlay.innerHTML = `<i class="fa-solid fa-play"></i>`;
    player.pause();
  }
  else {
    btnPlay.className = 'btn-play';
    btnPlay.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    player.play();
  }
});

track.addEventListener('click', (e) => {
  let position = e.clientX - track.getBoundingClientRect().left;
  player.currentTime = (position / 300) * player.duration;
});

reloadBtn.addEventListener('click', (e) => {
  player.currentTime = 0;
});

fiveSecBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.getAttribute("class") === 'five-sec-btn plus') {
      player.currentTime += 5;
    }
    if (btn.getAttribute("class") === 'five-sec-btn sub') {
      player.currentTime -= 5;
    }
  })
});