import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../../users/models/user.model';
import {Session} from '../../../session/models/session.model';

@Component({
  selector: 'cloud-player',
  styles: [require('./main.style.scss')],
  template: require('./main.template.html'),
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {
  private isAuthenticated: boolean = false;
  private session: Session;

  constructor() {
    this.session = Session.getInstance();
  }

  ngOnInit(): void {
    this.session.get('user').on('change:authenticated', (user: User) => {
      this.setAuthenticated(user);
    });

    if (this.session.isValid()) {
      this.setAuthenticated(this.session.get('user'));
    }
  }

  private setAuthenticated(user: User) {
    if (user.get('authenticated')) {
      user.fetch().then(() => {
        this.isAuthenticated = true;
        user.get('likes').fetch();
      });
    } else {
      this.isAuthenticated = false;
    }
  };
}
