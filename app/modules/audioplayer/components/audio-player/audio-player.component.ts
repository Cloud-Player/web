import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';

@Component ({
  moduleId: module.id,
  selector: 'audio-player',
  templateUrl: 'audio-player.template.html',
  styleUrls: ['audio-player.style.css']
})

export class AudioPlayerComponent{

  @Input() track: Track;

}
