import {Component} from "@angular/core";

@Component ({
    moduleId: module.id,
    selector: 'audio-player',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.css']

})

export class AudioPlayerComponent {
    title: string = "This is our awesome Soundcloud Audioplayer!!!"
}