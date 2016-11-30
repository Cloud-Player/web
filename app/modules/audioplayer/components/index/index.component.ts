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

    constructor() {
    }

    ngOnInit(): void {
    }

}