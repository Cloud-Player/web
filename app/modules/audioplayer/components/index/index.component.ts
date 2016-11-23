import {Component, OnInit} from '@angular/core';
import {Config} from "../../../../config/config";

@Component ({
    moduleId: module.id,
    selector: 'audio-player',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.css']

})

export class AudioPlayerComponent implements OnInit{
    title: string = "This is our awesome Soundcloud Audioplayer!!!"
    private audio: any;

    constructor() {
    }

    ngOnInit(): void {
        this.audio = new Audio();
        this.audio.src = Config.testSongURL;
    }

    playSong(): void {
        this.audio.play();
    }

    stopSong(): void {
        this.audio.pause();
    }

}