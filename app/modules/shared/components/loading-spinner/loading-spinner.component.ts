import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {PlayQueue} from '../../../audioplayer/collections/play_queue.collection';
import {PlayQueueItem} from '../../../audioplayer/models/play_queue_item.model';

@Component({
  selector: 'loading-spinner',
  styles: [require('./loading-spinner.style.scss')],
  template: require('./loading-spinner.template.html')
})

export class LoadingSpinnerComponent {
  @Input()
  public isLoading: boolean = true;

  @Input()
  public isIdle: boolean = true;
}
