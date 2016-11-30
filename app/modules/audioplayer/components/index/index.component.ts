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
    private playList: string[];

    constructor() {
    }

    ngOnInit(): void {
        this.audio = new Audio();
        this.playList = Config.testPlaylist;
        this.audio.src = this.playList[0];
    }

    playSong(): void {
        this.audio.play();
    }

    pauseSong(): void {
        this.audio.pause();
    }

    previousSong(): void {
        var index: any = this.playList.indexOf(this.audio.src);
        this.audio.src = this.playList[index - 1];
        this.audio.play();
    }

    nextSong(): void {
        var index: any = this.playList.indexOf(this.audio.src);
        this.audio.src = this.playList[index + 1];
        this.audio.play();
    }

    onSongSelect(song: string): void {
        this.audio.src = song;
        this.audio.play();
    }
    
    setVolume(volume: string): void {
        this.audio.volume = volume;
    }

}