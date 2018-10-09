import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LogoService} from '../../../shared/services/logo.service';
import * as localforage from 'localforage';
import {debounce, throttle} from 'underscore';
import {PlayerStatus} from '../../src/player-status.enum';
import {PlayQueueItemStatus} from '../../src/playqueue-item-status.enum';
import {PlayerManagerComponent} from '../player-manager/player-manager';
import {FullScreenEventType, FullScreenService} from '../../../shared/services/fullscreen.service';
import {LayoutService, WindowElementTypes} from '../../../shared/services/layout';
import {filter} from 'rxjs/internal/operators';
import {PlayqueueAuxappModel} from '../../../api/playqueue/playqueue-auxapp.model';
import {SocketMessageService} from '../../../shared/services/socket-message';
import {PlayqueueItemAuxappModel} from '../../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';
import {MessageMethodTypes} from '../../../shared/services/message';
import {SocketPlayerService} from '../../services/socket-player';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';

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

  constructor(private logoService: LogoService,
              private el: ElementRef,
              private layoutService: LayoutService,
              private fullScreenService: FullScreenService,
              private socketMessageService: SocketMessageService,
              private socketPlayerService: SocketPlayerService,
              private cdr: ChangeDetectorRef) {
    this.authenticatedUser = AuthenticatedUserModel.getInstance();
  }

  private enteredFullScreen() {
    this.el.nativeElement.classList.add('fullscreen-player');
  }

  private leftFullScreen() {
    this.el.nativeElement.classList.remove('fullscreen-player');
  }

  private setLastPlayingItem() {
    localforage.getItem('cp_currentItem').then((lastPlayingItem: any) => {
      if (lastPlayingItem && lastPlayingItem.track.id && lastPlayingItem.progress) {
        const lastPlaying = this.playQueue.items.getItemByTrackId(lastPlayingItem.track.id);
        if (lastPlaying) {
          lastPlaying.progress = lastPlayingItem.progress;
          this.playerManager.seekActivePlayerTrackTo(Math.round(lastPlaying.progress));
        }
      }
    });
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
      console.log('[PLAYER] STATUS CHANGE', item.status);
      switch (item.status) {
        case PlayQueueItemStatus.RequestedPlaying:
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
      // this.playQueue.items.off('change:progress', throttledProgressUpdate);
      this.playQueue.items.off('change:status', saveItem);
      this.playQueue.save().then(() => {
        // this.playQueue.items.on('change:progress', throttledProgressUpdate);
        this.playQueue.items.on('change:status', saveItem);
      });
    }, 1000);

    const debouncedSetHasPlayer = debounce(() => {
      if (this.playQueue.items.hasCurrentItem()) {
        this.layoutService.registerWindowElement(WindowElementTypes.MusicPlayer);
      } else {
        this.layoutService.unRegisterWindowElement(WindowElementTypes.MusicPlayer);
      }
    }, 1000);

    const throttledProgressUpdate = throttle((currentItem) => {
      if (currentItem) {
        localforage.setItem('cp_currentItem', {
          progress: currentItem.progress,
          track: {
            id: currentItem.track.id
          }
        });
      }
      currentItem.save();
    }, 10000);

    const throttledStatusUpdate = throttle((currentItem) => {
      currentItem.save();
    }, 500);

    const throttledViewUpdate = throttle(() => {
      this.cdr.detectChanges();
    }, 1000);

    this.playQueue.items.once('add', () => {
      if (this.playQueue.items.getPlayingItem()) {
        this.playQueue.items.getPlayingItem().pause();
      }
      this.setLastPlayingItem();
    });

    this.playQueue.items.on('change:progress', throttledViewUpdate);
    this.playQueue.items.on('change:progress', throttledProgressUpdate);
    this.playQueue.items.on('change:status', (item) => {
      if (item.status === PlayQueueItemStatus.Playing) {
        this.playQueue.items.fetchRecommendedItems();
      }
    });

    this.playQueue.items.on('update', debouncedPlayQueueSave);
    this.playQueue.items.on('update remove reset', debouncedSetHasPlayer);
    this.playQueue.items.once('update', () => {
      this.playQueue.items.fetchRecommendedItems();
    });

    this.playQueue.items.on('remove', item => item.destroy());

    this.isHeadlessPlayer = this.playerManager.isInHeadlessMode();

    if (!this.authenticatedUser.isNew()) {
      this.playQueue.fetch();
    } else {
      this.authenticatedUser.once('change:id', () => {
        this.playQueue.fetch();
      });
    }
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
  }
}
