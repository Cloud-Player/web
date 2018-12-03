import {AuthenticatedUserModel} from '../../api/authenticated-user/authenticated-user.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IPrivacyManagerEvent, PrivacyManager, PrivacyManagerState} from '../../main/services/privacy-manager';
import {PrivacyConfigModalOpener} from '../../main/components/privacy-config/privacy-config';
import {filter} from 'rxjs/operators';
import {IAuthenticatedUserAccount} from '../../api/authenticated-user/account/authenticated-user-account.interface';
import {SessionModel} from '../../api/sessions/session.model';
import {ClientDetector} from '../../shared/services/client-detector.service';
import {SessionsCollection} from '../../api/sessions/sessions.collection';
import {SocketMessageService} from '../../shared/services/socket-message';
import {PlayqueueAuxappModel} from '../../api/playqueue/playqueue-auxapp.model';
import {Globals} from '../../../../globals';
import {MessageMethodTypes} from '../../shared/services/message';
import {IAccount} from '../../api/account/account.interface';
import {ActivatedRoute} from '@angular/router';
import {PlayqueueItemAuxappModel} from '../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';

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
    this._sessions = SessionsCollection.getInstance();
    this._playQueue = PlayqueueAuxappModel.getInstance();
    this._authenticatedUser.accounts.getAccountForProvider('auxapp')
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
      this._playQueue.setInitialTrack(currentItem.track, currentItem.progress);
    }
    this._playQueue.fetch();
  }

  private activateSession(session) {
    this._sessions.add(session);
    this.socketMessageService.open(Globals.websocketApiUrl);
    this._sessions.fetch();
  }

  private createSession() {
    const userSession = this._authenticatedUser.session;
    userSession.browser = `${ClientDetector.getClient().name}`;
    userSession.system = `${ClientDetector.getOs().name}:${ClientDetector.getOs().version}`;
    userSession.screen = `${screen.availWidth}x${screen.availHeight}`;
    userSession.save().then(this.activateSession.bind(this));
  }

  private addSession(item) {
    this._sessions.add(item);
  }

  private updateSessions(items) {
    items.forEach(this.updateSession.bind(this));
  }

  private updateSession(item) {
    const existingSession = this._sessions.get(item.id);
    if (existingSession) {
      if (item.state === 'idle') {
        this._sessions.remove(existingSession);
      } else {
        existingSession.set(item);
      }
    }
  }

  private subscribeOnSessionChanges() {
    const accountId = this._authenticatedUser.accounts.getAccountForProvider('auxapp').id;
    if (accountId) {
      this.socketMessageService.subscribe(`session.${accountId}`, MessageMethodTypes.POST, this.addSession.bind(this));
      this.socketMessageService.subscribe(`session.${accountId}`, MessageMethodTypes.PUT, this.updateSessions.bind(this));
    }
  }

  private reactOnAccountIdChange(account: IAuthenticatedUserAccount) {
    this.updateAccountPlaylists(account);
  }

  private reactOnAuxAccountIdChange() {
    this.updateUserFavouriteTracks();
    this.updatePlayQueue();
    this.createSession();
    this.subscribeOnSessionChanges();
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
