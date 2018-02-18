import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nav-item',
  styleUrls: ['./nav-item.scss'],
  templateUrl: './nav-item.html'
})

export class NavItemComponent {
  @Input()
  public title: string;

  @Input()
  public link: string;

  @Input()
  public icon: string;

  @Input()
  public image: string;

  @Input()
  public exact: boolean;
}
