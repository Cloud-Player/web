import {Component, OnInit} from '@angular/core';
import {PlayQueueComponent} from '../playqueue/playqueue.component';

@Component ({
    moduleId: module.id,
    selector: 'audio-player-controls',
    templateUrl: 'controls.template.html',
    styleUrls: ['controls.style.css']

})

export class PlayerControlsComponent implements OnInit {
    private playQueue: PlayQueueComponent;
    private audio: any;

    constructor() {
        this.audio = new Audio();
        // this.audio.src = this.playQueue.getFirstSong();
    }

    ngOnInit(): void {
    }

    playSong(song: string): void {
        this.audio.src = song;
        this.audio.play();
    }

    pauseSong(): void {
        this.audio.pause();
    }

    previousSong(): void {
        this.playSong(this.playQueue.getPreviousSong());
    }

    nextSong(): void {
        this.playSong(this.playQueue.getNextSong());
    }

    setVolume(volume: string): void {
        this.audio.volume = volume;
    }

}
