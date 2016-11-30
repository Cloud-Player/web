/**
 * Created by kaischulz on 30.11.16.
 */

import {Component, OnInit} from '@angular/core';
import {Config} from "../../../../config/config";

@Component ({
    moduleId: module.id,
    selector: 'play-queue',
    templateUrl: 'playqueue.template.html',
    styleUrls: ['playqueue.style.css']

})

export class PlayQueueComponent implements OnInit{

    private playQueue: string[];
    private indexCurrentSong: number;

    constructor() {
        this.playQueue = Config.testPlaylist;
        this.indexCurrentSong = 0;
    }

    ngOnInit(): void {

    }

    onSongSelect(song: string): void {
        this.indexCurrentSong = this.playQueue.indexOf(song);
    }

    getFirstSong(): string {
        this.indexCurrentSong = 0;
        return this.playQueue[0];
    }

    getPreviousSong(): string {
        if (this.indexCurrentSong - 1 < 0) {
            return this.playQueue[this.indexCurrentSong];
        } else {
            this.indexCurrentSong -= 1;
            return this.playQueue[this.indexCurrentSong];
        }
    }

    getNextSong(): string {
        if (this.indexCurrentSong + 1 > this.playQueue.length - 1) {
            return this.playQueue[this.playQueue.length - 1];
        } else {
            this.indexCurrentSong += 1;
            return this.playQueue[this.indexCurrentSong];
        }
    }


}