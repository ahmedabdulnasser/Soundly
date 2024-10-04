import Player from "./Player.js";
import AudioListDisplay from './Aside.js'; // Importing the default class from Aside.js

window.onload = function() {
    const audioListDisplay = new AudioListDisplay(Player);  // Pass the container selector
};