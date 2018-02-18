import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nav-divider',
  styleUrls: ['./nav-divider.scss'],
  templateUrl: './nav-divider.html'
})

export class NavDividerComponent {
  @Input()
  public title: string;

  @Input()
  public icon: string;
}
