import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AudioPlayerComponent} from "./components/index/index.component";

const routes: Routes = [
    {path: 'audio-player', component: AudioPlayerComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AudioPlayerRoutingModule {
    
}
