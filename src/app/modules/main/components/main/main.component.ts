import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../../users/models/user.model';
import {Session} from '../../../session/models/session.model';
import {AuthenticatedUser} from '../../../session/models/authenticated_user.model';
const packageJSON = require('../../../../../../package.json');

@Component({
  selector: 'app-cloud-player',
  templateUrl: './main.template.html',
  styleUrls: ['./main.style.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {
  private isAuthenticated = false;
  private session: Session;

  constructor() {
  public version = packageJSON.version;
    this.session = Session.getInstance();
  }

  ngOnInit(): void {
    this.session.user.on('change:authenticated', (user: AuthenticatedUser) => {
      this.setAuthenticated(user);
    });

    if (this.session.isValid()) {
      this.setAuthenticated(this.session.user);
    }
  }

  private setAuthenticated(user: AuthenticatedUser) {
    if (user.authenticated) {
      user.fetch().then(() => {
        this.isAuthenticated = true;
        user.likes.fetch();
      });
    } else {
      this.isAuthenticated = false;
    }
  }
}
