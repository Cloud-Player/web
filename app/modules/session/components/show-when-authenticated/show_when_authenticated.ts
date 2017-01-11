import {Component} from '@angular/core';
import {Session} from '../../models/session.model';
import {User} from '../../../users/models/user.model';

@Component({
  moduleId: module.id,
  selector: 'show-when-authenticated',
  templateUrl: 'show_when_authenticated.html',
})
export class ShowWhenAuthenticatedComponent {
  private session = Session.getInstance();

  private isAuthenticated = false;

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

  ngOnInit(): void {
    this.session.get('user').on('change:authenticated', (user: User) => {
      this.setAuthenticated(user);
    });

    if (this.session.get('user').get('authenticated')) {
      this.setAuthenticated(this.session.get('user'));
    }
  };
}
