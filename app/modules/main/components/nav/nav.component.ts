import {Component, trigger, state, style, transition, animate} from '@angular/core';
import {User} from '../../../users/models/user.model';
import {Session} from '../../../session/models/session.model';

@Component({
  selector: 'nav-sidebar',
  styles: [require('./nav.style.scss')],
  template: require('./nav.template.html'),
  animations: [
    trigger('toggle', [
      state('in', style({
        width: '125px'
      })),
      state('out', style({
        width: '250px'
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),
  ]
})

export class NavComponent {

  private user: User;
  private toggleState: string = 'in';

  constructor() {
    this.user = Session.getInstance().get('user');
  }

  toggle() {
    this.toggleState = this.toggleState === 'out' ? 'in' : 'out';
  }
}
