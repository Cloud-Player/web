import {Component, OnInit} from '@angular/core';

@Component ({
    moduleId: module.id,
    selector: 'audio-player',
    templateUrl: 'index.template.html',
    styleUrls: ['index.style.css']

})

export class AudioPlayerComponent implements OnInit {
    title: string = 'This is our awesome Soundcloud Audioplayer!!!';

    constructor() {
    }

    ngOnInit(): void {
    }

}
