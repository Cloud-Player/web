import {Component} from '@angular/core';
import '!!style!css!sass!./main.style.scss';

@Component({
    selector: 'cloud-player',
  styles: [ require('./main.style.scss') ],

  template: require('./main.template.html')
})

export class MainComponent {
  title = 'Awesome Soundcloud Audioplayer';
}
