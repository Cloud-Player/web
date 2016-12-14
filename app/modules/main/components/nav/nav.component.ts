import {Component} from '@angular/core';
import {User} from '../../../users/models/user.model';
import {Session} from '../../../session/models/session.model';

@Component({
  moduleId: module.id,
  selector: 'nav-sidebar',
  templateUrl: 'nav.template.html',
  styleUrls: ['nav.style.css']
})

export class NavComponent {
  private user: User;

  constructor() {
    this.user = Session.getInstance().get('user');
  }
}
