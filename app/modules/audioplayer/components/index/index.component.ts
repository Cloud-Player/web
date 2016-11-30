import {Component, OnInit} from '@angular/core';
import {PlayQueueComponent} from "../playqueue/playqueue.component";

@Component ({
    moduleId: module.id,
    selector: 'audio-player',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.css']

})

export class AudioPlayerComponent implements OnInit{
    title: string = "This is our awesome Soundcloud Audioplayer!!!"

    private playQueue: PlayQueueComponent;
    private audio: any;

    constructor() {

    }

    ngOnInit(): void {
        this.playQueue = new PlayQueueComponent();

        this.audio = new Audio();
        this.audio.src = this.playQueue.getFirstSong();
    }

    playSong(song: string): void {
        this.audio.src = song;
        this.audio.play();
    }

    pauseSong(): void {
        this.audio.pause();
    }

    previousSong(): void {
        this.audio.src = this.playQueue.getPreviousSong();
        this.audio.play();
    }

    nextSong(): void {
        this.audio.src = this.playQueue.getNextSong();
        this.audio.play();
    }

    setVolume(volume: string): void {
        this.audio.volume = volume;
    }

}