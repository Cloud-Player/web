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

@Component({
  selector: 'app-player',
  styleUrls: ['./player.scss'],
  templateUrl: './player.html'
})
export class PlayerComponent implements OnInit {
  public playQueue: PlayqueueAuxappModel;
  public isBuffering: boolean;

  @ViewChild('playerManager')
  private playerManager: PlayerManagerComponent;

  constructor(private logoService: LogoService,
              private el: ElementRef,
              private layoutService: LayoutService,
              private fullScreenService: FullScreenService,
              private cdr: ChangeDetectorRef) {
  }

  private enteredFullScreen() {
    this.el.nativeElement.classList.add('fullscreen-player');
  }

  private leftFullScreen() {
    this.el.nativeElement.classList.remove('fullscreen-player');
  }

  private setLastPlayingQueue() {
    localforage.getItem('cp_playqueue').then((lastPlayingQueue: Array<any>) => {
      if (lastPlayingQueue) {
        this.playQueue.items.add(lastPlayingQueue);
      }
    });
  }

  private setLastPlayingItem() {
    localforage.getItem('cp_currentItem').then((lastPlayingItem: any) => {
      if (lastPlayingItem) {
        lastPlayingItem.status = PlayQueueItemStatus.Paused;
        this.playQueue.items.add(lastPlayingItem, {at: 0});
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

  public setVolume(volume: number) {
    this.playerManager.setVolume(volume / 100);
  }

  ngOnInit(): void {
    this.playQueue = PlayqueueAuxappModel.getInstance();

    this.setLastPlayingQueue();
    this.setLastPlayingItem();

    const debouncedPlayQueueSave = debounce(() => {
      localforage.setItem('cp_playqueue', this.playQueue.items.getScheduledItemsJSON(30));
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
        localforage.setItem('cp_currentItem', currentItem.toMiniJSON());
      }
    }, 10000);

    const throttledViewUpdate = throttle(() => {
      this.cdr.detectChanges();
    }, 1000);

    this.playQueue.items.on('add remove reset change:status', debouncedPlayQueueSave);
    this.playQueue.items.on('update remove reset change:status', debouncedPlayQueueSave);
    this.playQueue.items.on('update remove reset', debouncedSetHasPlayer);
    this.playQueue.items.on('change:progress', throttledProgressUpdate);
    this.playQueue.items.on('change:progress', throttledViewUpdate);

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
