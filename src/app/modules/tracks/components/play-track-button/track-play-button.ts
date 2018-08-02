import {Component, Input} from '@angular/core';
import {ITrack} from '../../../api/tracks/track.interface';
import {ITracks} from '../../../api/tracks/tracks.interface';
import {PlayqueueAuxappModel} from '../../../api/playqueue/playqueue-auxapp.model';

@Component({
  selector: 'app-track-play-button',
  styleUrls: ['./track-play-button.scss'],
  templateUrl: './track-play-button.html'
})
export class TrackPlayButtonComponent {
  private _playQueue: PlayqueueAuxappModel;

  @Input()
  track: ITrack;

  @Input()
  tracks: ITracks<ITrack>;

  constructor() {
    this._playQueue = PlayqueueAuxappModel.getInstance();
  }

  isPlaying(): boolean {
    const playingItem = this._playQueue.items.getPlayingItem();
    return (playingItem && playingItem.track.id === this.track.id);
  }
}
