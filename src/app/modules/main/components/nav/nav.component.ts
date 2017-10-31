import {Component, trigger, state, style, transition, animate, ContentChild} from '@angular/core';
import {User} from '../../../users/models/user.model';
import {Session} from '../../../session/models/session.model';
import {AuthService} from '../../../shared/services/auth.service';
import {ClientDetector, OsNames, Result, ClientNames} from '../../../shared/services/client-detector.service';

@Component({
  selector: 'nav-sidebar',
  styles: [require('./nav.style.scss')],
  template: require('./nav.template.html')
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

  showDesktopAppEntry(): boolean {
    let os: Result = ClientDetector.getOs(),
        client: Result = ClientDetector.getClient();
    return (
     client.name !== ClientNames.Electron &&
      ( (os.name === OsNames.MacOs && os.version > 0) || (os.name === OsNames.Windows && os.version >= 7) )
    );
  }
}
