import {Component} from '@angular/core';

@Component({
  selector: 'cloud-player',
  styles: [require('./main.style.scss')],
  template: require('./main.template.html')
})

export class MainComponent {
  title = 'Awesome Soundcloud Audioplayer';
}
