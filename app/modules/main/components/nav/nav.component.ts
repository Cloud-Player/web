import {Component} from '@angular/core';
import {User} from '../../../users/models/user.model';
import {Session} from '../../../session/models/session.model';

@Component({
  selector: 'nav-sidebar',
  styles: [ require('./nav.style.scss') ],
  template: require('./nav.template.html')
})

export class NavComponent {
  private user: User;

  constructor() {
    this.user = Session.getInstance().get('user');
  }
}
