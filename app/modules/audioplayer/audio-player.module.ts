import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {BrowserModule} from '@angular/platform-browser';
import {AudioPlayerComponent} from './components/index/index.component';
import {PlayQueueComponent} from './components/playqueue/playqueue.component';
import {PlayerControlsComponent} from './components/controls/controls.component';

@NgModule ({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AudioPlayerComponent,
        PlayQueueComponent,
        PlayerControlsComponent
    ],
    exports: [
        AudioPlayerComponent
    ]
})

export class AudioPlayerModule {

}
