import {Component, OnInit} from '@angular/core';
import {User} from '../../../users/models/user.model';
import {Session} from '../../../session/models/session.model';
import {AuthService} from '../../../shared/services/auth.service';
import {ClientDetector, OsNames, Result, ClientNames} from '../../../shared/services/client-detector.service';
import {AuthenticatedUser} from '../../../session/models/authenticated_user.model';

@Component({
  selector: 'app-nav-sidebar',
  styleUrls: ['./nav.style.scss'],
  templateUrl: './nav.template.html'
})

export class NavComponent implements OnInit {
  private session: Session;
  private toggleState = 'in';

  public user: User;

  isAuthenticated: boolean;

  constructor(private authService: AuthService) {
    this.session = Session.getInstance();
    this.user = this.session.user;
  }

  connect() {
    this.authService.connect();
  }

  disconnect() {
    this.authService.disconnect();
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

  ngOnInit(): void {
    this.session.user.on('change:authenticated', (user: AuthenticatedUser) => {
      this.setAuthenticated(user);
    });

    if (this.session.isValid()) {
      this.setAuthenticated(this.session.user);
    }
  }

  showDesktopAppEntry(): boolean {
    const os: Result = ClientDetector.getOs(),
      client: Result = ClientDetector.getClient();
    return (
      client.name !== ClientNames.Electron &&
      ( (os.name === OsNames.MacOs && os.version > 0) || (os.name === OsNames.Windows && os.version >= 7) )
    );
  }
}
