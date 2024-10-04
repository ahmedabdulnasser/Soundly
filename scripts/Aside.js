import Audio from './Audio.js'; // Import Audio module
import { player } from './Player.js';



export default class AudioListDisplay {
    constructor() {
    this.container = document.querySelector('.Aside-list');
    this.displayList();
}


    displayList() {
    // Check if there a data in the list
    if (Audio.audioList.length > 0) {
        Audio.audioList.forEach((audio, index) => {
        // Create a div for each audio item
        const musicItem = document.createElement('div');
        musicItem.classList.add('music-item');

        const img = document.createElement('img');
        img.src = audio.imgSrc;
        img.alt = `${audio.title} thumbnail`;

        const title = document.createElement('h3');
        title.textContent = audio.title;

        const performer = document.createElement('p');
        performer.textContent = `Performed by: ${audio.performer}`;

        // Append elements to the music item div
        musicItem.appendChild(title);
        musicItem.appendChild(performer);
        musicItem.appendChild(img);
        
        musicItem.addEventListener('click', () => {
            this.setActiveMusicItem(musicItem); // Set active music item
            player.setActiveAudioIndex(index);
            });

            // Append the music item to the list container
        this.container.appendChild(musicItem);

        if (index === player.getActiveAudioIndex()) {
            this.setActiveMusicItem(musicItem);
        }
        });


    }else {
      // If no music is available, display a message
        const noMusicMsg = document.createElement('p');
        noMusicMsg.textContent = 'No music available to display.';
        this.container.appendChild(noMusicMsg);
    }
    }
    
    setActiveMusicItem(activeItem) {
        // Remove 'active' class from all music items
        const allItems = this.container.querySelectorAll('.music-item');
        allItems.forEach(item => {
            item.classList.remove('active');
        });
        // Add 'active' class to the currently clicked item
        activeItem.classList.add('active');
        }

}



