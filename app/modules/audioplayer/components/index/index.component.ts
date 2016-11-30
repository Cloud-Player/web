import {Component, OnInit} from '@angular/core';
import {PlayQueueComponent} from "../playqueue/playqueue.component";
import {PlayerControlsComponent} from "../controls/controls.component";

@Component ({
    moduleId: module.id,
    selector: 'audio-player',
    templateUrl: 'index.template.html',
    styleUrls: ['index.style.css']

})

export class AudioPlayerComponent implements OnInit{
    title: string = "This is our awesome Soundcloud Audioplayer!!!"

    private playQueue: PlayQueueComponent;
    private playerControls: PlayerControlsComponent;

    constructor() {
        this.playerControls = new PlayerControlsComponent();
        this.playQueue = new PlayQueueComponent();
    }

    ngOnInit(): void {
    }

}