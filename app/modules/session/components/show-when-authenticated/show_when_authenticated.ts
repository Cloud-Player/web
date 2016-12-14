import {Component} from '@angular/core';
import {Session} from '../../models/session.model';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../users/models/user.model';

@Component({
  moduleId: module.id,
  selector: 'show-when-authenticated',
  templateUrl: 'show_when_authenticated.html',
})
export class ShowWhenAuthenticatedComponent {
  private session = Session.getInstance();

  private isAuthenticated = false;

  ngOnInit(): void {
    this.session.get('user').on('change:authenticated', (user: User) => {
      if (user.get('authenticated')) {
        user.fetch().then(() => {
          this.isAuthenticated = true;
        });
      } else {
        this.isAuthenticated = false;
      }
    });
  };
}
