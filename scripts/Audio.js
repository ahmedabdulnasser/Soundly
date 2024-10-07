export default class Audio {
  static audioList = [];
  constructor(title, src, imgSrc, performer) {
    this.title = title;
    this.src = src;
    this.imgSrc = imgSrc;
    this.performer = performer;
    Audio.audioList.push(this);
  }
}

const newAudio1 = new Audio(
  "El Menshawy Simulation",
  "../assets/audio/1/El-Menshawy-Abdelrahman_El-Zawary.m4a",
  "../assets/audio/1/thumbnail.jpg",
  "Abdelrahman El-Zawawy"
);
const newAudio2 = new Audio(
  "El Muminoon",
  "../assets/audio/2/surah_al_muminoon_yasser_dossary.mp3",
  "../assets/audio/2/thumbnail.jpg",
  "Yasser El-Dossary"
);
const newAudio3 = new Audio(
  "El Muminoon",
  "../assets/audio/3/surah_al_muminoon_yasser_dossary.mp3",
  "../assets/audio/3/thumbnail.jpg",
  "Yasser El-Dossary"
);

new Audio(
  "El Muminoon",
  "../assets/audio/3/surah_al_muminoon_yasser_dossary.mp3",
  "../assets/audio/3/thumbnail.jpg",
  "Yasser El-Dossary"
);

new Audio(
  "El Muminoon",
  "../assets/audio/3/surah_al_muminoon_yasser_dossary.mp3",
  "../assets/audio/3/thumbnail.jpg",
  "Yasser El-Dossary"
);

new Audio(
  "El Muminoon",
  "../assets/audio/3/surah_al_muminoon_yasser_dossary.mp3",
  "../assets/audio/3/thumbnail.jpg",
  "Yasser El-Dossary"
);

new Audio(
  "El Muminoon",
  "../assets/audio/3/surah_al_muminoon_yasser_dossary.mp3",
  "../assets/audio/3/thumbnail.jpg",
  "Yasser El-Dossary"
);
