/**
 * Created by kaischulz on 23.11.16.
 */

import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {BrowserModule} from "@angular/platform-browser";
import {AudioPlayerComponent} from "./components/index/index.component";
import {AudioPlayerRoutingModule} from "./audio-player.routes";

@NgModule ({
    imports: [
        BrowserModule,
        FormsModule,
        AudioPlayerRoutingModule
    ],
    declarations: [
        AudioPlayerComponent
    ],
    exports: [
        AudioPlayerComponent
    ]
})

export class AudioPlayerModule {

}