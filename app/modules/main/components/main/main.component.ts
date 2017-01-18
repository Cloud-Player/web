import {Component} from '@angular/core';
import './main.style.scss';

@Component({
    selector: 'cloud-player',
    template: require('./main.template.html')
})

export class MainComponent {
  title = 'Awesome Soundcloud Audioplayer';
}
