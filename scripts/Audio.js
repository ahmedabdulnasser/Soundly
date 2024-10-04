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
  "../assets/audio/1/محاكاة المنشاوي - عبدالرحمن الزواوي.m4a",
  "../assets/audio/1/thumbnail.jpg",
  "Abdelrahman El-Zawawy"
);
const newAudio2 = new Audio(
  "El Muminoon",
  "../assets/audio/2/سورة المؤمنون - ياسر الدوسري - (كاملة).mp3",
  "../assets/audio/2/thumbnail.jpg",
  "Yasser El-Dossary"
);
