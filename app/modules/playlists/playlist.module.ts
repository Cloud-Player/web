import {NgModule}      from '@angular/core';
import {TracksModule} from '../tracks/tracks.module';
import {PlaylistsRoutingModule}     from './playlist.routes';
import {BrowserModule} from '@angular/platform-browser';
import {AudioPlayerModule} from '../audioplayer/audio-player.module';
import {PlayListViewComponent} from './components/playlist-view/playlist-view.component';

@NgModule({
  imports: [
    BrowserModule,
    TracksModule,
    PlaylistsRoutingModule,
    AudioPlayerModule
  ],
  declarations: [
    PlayListViewComponent
  ]
})

export class PlaylistModule {
}
