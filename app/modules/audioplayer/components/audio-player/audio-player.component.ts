import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';

@Component ({
  selector: 'audio-player',
  styles: [ require('./audio-player.style.scss') ],
  template: require('./audio-player.template.html')
})

export class AudioPlayerComponent{

  @Input() track: Track;

}
