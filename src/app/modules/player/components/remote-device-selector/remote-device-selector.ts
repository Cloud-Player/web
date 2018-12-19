import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {SessionModel} from '../../../api/authenticated-user/sessions/session.model';
import {SessionsCollection} from '../../../api/authenticated-user/sessions/sessions.collection';
import {SocketBackboneSender} from '../../../shared/services/socket-backbone-sender';

@Component({
  selector: 'app-remote-device-selector',
  styleUrls: ['./remote-device-selector.scss'],
  templateUrl: './remote-device-selector.html'
})
export class RemoteDeviceSelectorComponent {
  private _authenticatedUser: AuthenticatedUserModel;
  public sessions: SessionsCollection<SessionModel>;

  constructor(private cdr: ChangeDetectorRef,
              private socketBackboneSender: SocketBackboneSender) {
    this._authenticatedUser = AuthenticatedUserModel.getInstance();
    this.sessions = this._authenticatedUser.getAuxappAccount().sessions;
    this.sessions.on('update change', () => {
      this.cdr.detectChanges();
    });
  }

  public getMySessionId() {
    if (this.sessions.getMySession()) {
      return this.sessions.getMySession().id;
    }
  }

  public isConnected() {
    return this._authenticatedUser.accounts
      .filter(account => account.isConnected()).length > 1;
  }

  public playOnDevice(session) {
    session.is_player = true;
    this.socketBackboneSender.decorate(session);
    session.save();
  }
}
