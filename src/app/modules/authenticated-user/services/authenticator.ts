import {AuthenticatedUserModel} from '../../api/authenticated-user/authenticated-user.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IPrivacyManagerEvent, PrivacyManager, PrivacyManagerState} from '../../main/services/privacy-manager';
import {PrivacyConfigModalOpener} from '../../main/components/privacy-config/privacy-config';
import {filter} from 'rxjs/operators';
import {IAuthenticatedUserAccount} from '../../api/authenticated-user/account/authenticated-user-account.interface';
import {SocketMessageService} from '../../shared/services/socket-message';
import {PlayqueueAuxappModel} from '../../api/playqueue/playqueue-auxapp.model';
import {MessageMethodTypes} from '../../shared/services/message';
import {ActivatedRoute} from '@angular/router';
import {SessionsCollection} from '../../api/authenticated-user/sessions/sessions.collection';
import {SessionModel} from '../../api/authenticated-user/sessions/session.model';
import {Globals} from '../../../../globals';
import {ITrack} from '../../api/tracks/track.interface';

@Injectable()
export class Authenticator {
  private _authenticatedUser: AuthenticatedUserModel;
  private _subject: Subject<any>;
  private _sessions: SessionsCollection<SessionModel>;
  private _playQueue: PlayqueueAuxappModel;

  constructor(private privacyManager: PrivacyManager,
              private privacyConfigModalOpener: PrivacyConfigModalOpener,
              private socketMessageService: SocketMessageService,
              private activatedRoute: ActivatedRoute) {
    this._authenticatedUser = AuthenticatedUserModel.getInstance();
    this._subject = new Subject<any>();
    this._sessions = this._authenticatedUser.getAuxappAccount().sessions;
    this._playQueue = PlayqueueAuxappModel.getInstance();
    this._authenticatedUser.getAuxappAccount()
      .on('change:id', this.reactOnAuxAccountIdChange.bind(this));
    this._authenticatedUser.accounts.each((account) => {
      account.on('change:id', this.reactOnAccountIdChange.bind(this));
    });
  }

  private updateAccountPlaylists(account: IAuthenticatedUserAccount) {
    account.playlists.reset();
    if (account.isConnected()) {
      account.playlists.fetch();
    }
  }

  private updateUserFavouriteTracks() {
    const auxAccount = this._authenticatedUser.accounts.getAccountForProvider('auxapp');
    auxAccount.favouriteTracks.clear();
    auxAccount.favouriteTracks.fetch();
  }

  private updatePlayQueue() {
    const currentItem = this._playQueue.items.getCurrentItem();
    this._playQueue.clear();
    if (currentItem) {
      this._playQueue.setInitialTrack(<ITrack>currentItem.track.clone(), currentItem.progress);
    }
    this._playQueue.fetch();
  }

  private addSession(item) {
    this._sessions.add(item);
  }

  private updateSessions(items) {
    items.forEach(this.updateSession.bind(this));
  }

  private deleteSessions(items) {
    items.forEach(this.deleteSession.bind(this));
  }

  private updateSession(item) {
    const existingSession = this._sessions.get(item.id);
    if (existingSession) {
      existingSession.set(item);
    } else {
      this.addSession(item);
    }
  }

  private deleteSession(item) {
    this._sessions.remove(item);
  }

  private subscribeOnSessionChanges() {
    const accountId = this._authenticatedUser.getAuxappAccount().id;
    if (accountId) {
      /* check out aux.app */
    }
  }

  private reactOnAccountIdChange(account: IAuthenticatedUserAccount) {
    this.updateAccountPlaylists(account);
  }

  private reactOnAuxAccountIdChange() {
    if (this.socketMessageService.isOpen()) {
      this.socketMessageService.close();
    }
    this.updateUserFavouriteTracks();
    this.updatePlayQueue();
    this.subscribeOnSessionChanges();
    this._authenticatedUser.getAuxappAccount().sessions.reset();
    this.socketMessageService.open(Globals.websocketApiUrl);
  }

  public login() {
    this.privacyManager.getObservable()
      .pipe(
        filter(privacyManagerEv => privacyManagerEv.state === PrivacyManagerState.Changed)
      )
      .subscribe((privacyManagerEv: IPrivacyManagerEvent) => {
        if (privacyManagerEv.settings.allowIdCookie) {
          this._authenticatedUser.fetch();
        }
      });
    this.privacyManager.getObservable()
      .pipe(
        filter(privacyManagerEv => privacyManagerEv.state === PrivacyManagerState.UnknownSettings)
      )
      .subscribe(() => {
        this.privacyConfigModalOpener.open();
      });
    this.privacyManager.getPrivacySettings();
  }

  public getObservable(): Subject<any> {
    return this._subject;
  }
}
