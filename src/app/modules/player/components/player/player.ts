import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LogoService} from '../../../shared/services/logo.service';
import {debounce, throttle} from 'underscore';
import {PlayerStatus} from '../../src/player-status.enum';
import {PlayQueueItemStatus} from '../../src/playqueue-item-status.enum';
import {PlayerManagerComponent} from '../player-manager/player-manager';
import {FullScreenEventType, FullScreenService} from '../../../shared/services/fullscreen.service';
import {LayoutService, WindowElementTypes} from '../../../shared/services/layout';
import {filter, first} from 'rxjs/internal/operators';
import {PlayqueueAuxappModel} from '../../../api/playqueue/playqueue-auxapp.model';
import {SocketMessageService} from '../../../shared/services/socket-message';
import {PlayqueueItemAuxappModel} from '../../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';
import {MessageMethodTypes} from '../../../shared/services/message';
import {SocketPlayerService} from '../../services/socket-player';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {NavigationStart, Router, UrlTree} from '@angular/router';
import {PlayerFactory} from '../../src/player-factory.class';
import {SocketBackboneSender} from '../../../shared/services/socket-backbone-sender';
import {BaseModel} from '../../../backbone/models/base.model';
import {SessionsCollection} from '../../../api/authenticated-user/sessions/sessions.collection';
import {SessionModel} from '../../../api/authenticated-user/sessions/session.model';

@Component({
  selector: 'app-player',
  styleUrls: ['./player.scss'],
  templateUrl: './player.html'
})
export class PlayerComponent implements OnInit {
  public playQueue: PlayqueueAuxappModel;
  public isBuffering: boolean;
  public isHeadlessPlayer: boolean;

  @ViewChild('playerManager')
  private playerManager: PlayerManagerComponent;

  private authenticatedUser: AuthenticatedUserModel;

  private sessions: SessionsCollection<SessionModel>;

  constructor(private router: Router,
              private logoService: LogoService,
              private el: ElementRef,
              private layoutService: LayoutService,
              private fullScreenService: FullScreenService,
              private socketMessageService: SocketMessageService,
              private socketPlayerService: SocketPlayerService,
              private cdr: ChangeDetectorRef,
              private socketBackboneSender: SocketBackboneSender) {
    this.authenticatedUser = AuthenticatedUserModel.getInstance();
    this.sessions = this.authenticatedUser.getAuxappAccount().sessions;
  }

  private enteredFullScreen() {
    this.el.nativeElement.classList.add('fullscreen-player');
  }

  private leftFullScreen() {
    this.el.nativeElement.classList.remove('fullscreen-player');
  }

  private setInitialTrackFromUrlParams(queryParams) {
    const listenParam = queryParams.listen;
    if (listenParam) {
      const [provider, trackId, progress] = listenParam.split(':');
      if (provider && trackId && PlayerFactory.hasPlayerForProvider(provider)) {
        const newPlayQueueItem = new PlayqueueItemAuxappModel({
          track: {
            provider: provider,
            id: trackId
          },
          progress: progress || 0
        });
        this.playQueue.items.setInitialItem(newPlayQueueItem);
      }
    }
  }

  public changePlayerStatus(playerStatus: PlayerStatus): void {
    switch (playerStatus) {
      case PlayerStatus.Waiting:
        this.isBuffering = true;
        this.cdr.detectChanges();
        break;
      case PlayerStatus.Ready:
      case PlayerStatus.Paused:
      case PlayerStatus.Playing:
        this.isBuffering = false;
        this.cdr.detectChanges();
        break;
    }

    switch (playerStatus) {
      case PlayerStatus.Waiting:
      case PlayerStatus.Paused:
      case PlayerStatus.Stopped:
        this.logoService.pause();
        break;
      case PlayerStatus.Playing:
        this.logoService.play();
        break;
    }
  }

  public setInHeadlessMode(isHeadless: boolean) {
    this.playerManager.setInHeadlessMode(isHeadless);
    this.isHeadlessPlayer = this.playerManager.isInHeadlessMode();
  }

  public setVolume(volume: number) {
    this.playerManager.setVolume(volume / 100);
  }

  public enterPlayerControls() {
    this.el.nativeElement.classList.add('player-controls-active');
  }

  public leavePlayerControls() {
    this.el.nativeElement.classList.remove('player-controls-active');
  }

  ngOnInit(): void {
    this.playQueue = PlayqueueAuxappModel.getInstance();

    const saveItem = (item) => {
      this.socketBackboneSender.decorate(item);
      switch (item.status) {
        case PlayQueueItemStatus.RequestedPlaying:
          const playerSession = this.sessions.findWhere({state: 'player'});
          if (this.socketMessageService.isOpen() &&
            !playerSession &&
            /* When set to playing by socket do not to this session as player */
            !(item.socketData && item.socketData.status === 'playing')
          ) {
            const sessions = this.authenticatedUser.getAuxappAccount().sessions;
            const mySession = sessions.getMySession();
            if (mySession) {
              mySession.is_player = true;
              this.socketBackboneSender.decorate(mySession);
              mySession.save();
            }
          }
          item.save();
          break;
        case PlayQueueItemStatus.RequestedPause:
        case PlayQueueItemStatus.Queued:
        case PlayQueueItemStatus.Stopped:
          item.save();
          break;
        case PlayQueueItemStatus.Scheduled:
          if (item.previousAttributes().status === PlayQueueItemStatus.Queued) {
            item.save();
          }
          break;
      }
    };

    const debouncedPlayQueueSave = debounce(() => {
      this.playQueue.save();
    }, 1000);

    const debouncedSetHasPlayer = debounce(() => {
      if (this.playQueue.items.hasCurrentItem()) {
        this.layoutService.registerWindowElement(WindowElementTypes.MusicPlayer);
      } else {
        this.layoutService.unRegisterWindowElement(WindowElementTypes.MusicPlayer);
      }
    }, 1000);

    const throttledProgressUpdate = throttle((currentItem) => {
      /*
       * Use setTimeout to make sure all changes are set before calling save
       * Model is triggering change for each attribute immediatly so when progress and
       * status is updated this method is called even though status has not been updated yet
       */
      setTimeout(currentItem.save.bind(currentItem));
    }, 10000);

    const throttledViewUpdate = throttle(() => {
      this.cdr.detectChanges();
    }, 1000);

    this.playQueue.items.on('change:progress', throttledViewUpdate);
    this.playQueue.items.on('change:progress', throttledProgressUpdate);
    this.playQueue.items.on('change:status', (item) => {
      if (item.status === PlayQueueItemStatus.Playing) {
        this.playQueue.items.fetchRecommendedItems();
      }
      saveItem(item);
    });

    this.playQueue.items.on('update', debouncedPlayQueueSave);
    this.playQueue.items.on('update remove reset', debouncedSetHasPlayer);
    this.playQueue.items.once('update', () => {
      this.playQueue.items.fetchRecommendedItems();
    });

    this.playQueue.items.on('remove', item => item.destroy());

    this.isHeadlessPlayer = this.playerManager.isInHeadlessMode();

    this.socketPlayerService.setPlayqueue(this.playQueue);

    this.fullScreenService.getObservable()
      .pipe(
        filter(eventType => eventType === FullScreenEventType.Enter)
      )
      .subscribe(this.enteredFullScreen.bind(this));

    this.fullScreenService.getObservable()
      .pipe(
        filter(eventType => eventType === FullScreenEventType.Leave)
      )
      .subscribe(this.leftFullScreen.bind(this));

    this.sessions.on('add change:state', (session) => {
      const playerSession = this.sessions.getPlayerSession();
      const mySession = this.sessions.getMySession();
      if (playerSession && mySession && playerSession !== mySession) {
        this.playerManager.setInHeadlessMode(true);
      }
    });

    this.sessions.on('remove', (session) => {
      if (session.state === 'player') {
        this.playerManager.setInHeadlessMode(false);
        this.authenticatedUser.session.is_player = true;
        this.authenticatedUser.session.save();
      }
    });

    this.router.events
      .pipe(
        filter(ev => ev instanceof NavigationStart),
        first()
      )
      .subscribe((ev: NavigationStart) => {
        const tree: UrlTree = this.router.parseUrl(ev.url);
        this.setInitialTrackFromUrlParams(tree.queryParams);
      });
  }
}
