import {Component} from '@angular/core';

@Component({
    selector: 'cloud-player',
    template: require('./main.template.html'),
    styleUrls: ['/main.style.css']
})

export class MainComponent {
  title = 'Awesome Soundcloud Audioplayer';
}
