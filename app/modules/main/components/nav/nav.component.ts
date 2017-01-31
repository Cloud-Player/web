import {Component, trigger, state, style, transition, animate} from '@angular/core';
import {User} from '../../../users/models/user.model';
import {Session} from '../../../session/models/session.model';
import {AuthService} from '../../../shared/services/auth.service';

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
  private session: Session;
  private isAuthenticated: boolean;
  private toggleState: string = 'in';
  private imgUrl: string = 'https://a-v2.sndcdn.com/assets/images/header/cloud@2x-e5fba4.png';

  constructor(private authService: AuthService) {
    this.session = Session.getInstance();
    this.user = this.session.get('user');
  }

  toggle() {
    this.toggleState = this.toggleState === 'out' ? 'in' : 'out';
  }

  connect() {
    this.authService.connect();
  }

  disconnect() {
    this.authService.disconnect();
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

  ngOnInit(): void {
    this.session.get('user').on('change:authenticated', (user: User) => {
      this.setAuthenticated(user);
    });

    if (this.session.isValid()) {
      this.setAuthenticated(this.session.get('user'));
    }
  };
}
