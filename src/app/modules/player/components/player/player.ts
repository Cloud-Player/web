import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CloudPlayerLogoService} from '../../../shared/services/cloud-player-logo.service';
import * as localforage from 'localforage';
import {debounce, throttle} from 'underscore';
import {PlayerStatus} from '../../src/player-status.enum';
import {PlayQueueItemStatus} from '../../src/playqueue-item-status.enum';
import {PlayQueue} from '../../collections/play-queue';
import {PlayQueueItem} from '../../models/play-queue-item';
import {PlayerManagerComponent} from '../player-manager/player-manager';
import {FullScreenEventType, FullScreenService} from '../../../shared/services/fullscreen.service';
import {LayoutService, WindowElementTypes} from '../../../shared/services/layout';

@Component({
  selector: 'app-player',
  styleUrls: ['./player.scss'],
  templateUrl: './player.html'
})
export class PlayerComponent implements OnInit {
  public playQueue: PlayQueue<PlayQueueItem>;
  public isBuffering: boolean;

  @ViewChild('playerManager')
  private playerManager: PlayerManagerComponent;

  constructor(private cloudPlayerLogoService: CloudPlayerLogoService,
              private el: ElementRef,
              private layoutService: LayoutService,
              private fullScreenService: FullScreenService) {
  }

  private enteredFullScreen() {
    this.el.nativeElement.classList.add('fullscreen-player');
  }

  private leftFullScreen() {
    this.el.nativeElement.classList.remove('fullscreen-player');
  }

  private setLastPlayingQueue() {
    // TODO remove this, only to support backwards compatibility from v4 to v5
    localforage.getItem('sc_playqueue').then((lastPlayingQueue: Array<any>) => {
      if (lastPlayingQueue) {
        lastPlayingQueue.forEach(function (item) {
          item.track.provider = item.track.provider.toLowerCase();
        });
        this.playQueue.add(lastPlayingQueue);
        localforage.removeItem('sc_playqueue');
      }
    });

    localforage.getItem('cp_playqueue').then((lastPlayingQueue: Array<any>) => {
      if (lastPlayingQueue) {
        this.playQueue.add(lastPlayingQueue);
      }
    });
  }

  private setLastPlayingItem() {
    // TODO remove this, only to support backwards compatibility from v4 to v5
    localforage.getItem('sc_currentItem').then((lastPlayingItem: any) => {
      if (lastPlayingItem) {
        lastPlayingItem.track.provider = lastPlayingItem.track.provider.toLowerCase();
        lastPlayingItem.status = PlayQueueItemStatus.Paused;
        const item = this.playQueue.add(lastPlayingItem, {at: 0});
        localforage.setItem('cp_currentItem', item.toMiniJSON());
        localforage.removeItem('sc_currentItem');
      }
    });

    localforage.getItem('cp_currentItem').then((lastPlayingItem: any) => {
      if (lastPlayingItem) {
        lastPlayingItem.status = PlayQueueItemStatus.Paused;
        this.playQueue.add(lastPlayingItem, {at: 0});
      }
    });
  }

  public changePlayerStatus(playerStatus: PlayerStatus): void {
    switch (playerStatus) {
      case PlayerStatus.Waiting:
        this.isBuffering = true;
        break;
      case PlayerStatus.Ready:
      case PlayerStatus.Paused:
      case PlayerStatus.Playing:
        this.isBuffering = false;
        break;
    }

    switch (playerStatus) {
      case PlayerStatus.Waiting:
      case PlayerStatus.Paused:
      case PlayerStatus.Stopped:
        this.cloudPlayerLogoService.pause();
        break;
      case PlayerStatus.Playing:
        this.cloudPlayerLogoService.play();
        break;
    }
  }

  public setVolume(volume: number) {
    this.playerManager.setVolume(volume / 100);
  }

  ngOnInit(): void {
    this.playQueue = PlayQueue.getInstance();

    this.setLastPlayingQueue();
    this.setLastPlayingItem();

    const debouncedPlayQueueSave = debounce(() => {
      localforage.setItem('cp_playqueue', this.playQueue.getScheduledItemsJSON(30));
    }, 1000);

    const debouncedSetHasPlayer = debounce(() => {
      if (this.playQueue.hasCurrentItem()) {
        this.layoutService.registerWindowElement(WindowElementTypes.MusicPlayer);
      } else {
        this.layoutService.unRegisterWindowElement(WindowElementTypes.MusicPlayer);
      }
    }, 1000);

    const throttledCurrentItemSave = throttle((currentItem) => {
      if (currentItem) {
        localforage.setItem('cp_currentItem', currentItem.toMiniJSON());
      }
    }, 10000);

    this.playQueue.on('update remove reset change:status', debouncedPlayQueueSave);
    this.playQueue.on('update remove reset', debouncedSetHasPlayer);
    this.playQueue.on('change:progress', throttledCurrentItemSave);

    this.fullScreenService.getObservable()
      .filter(eventType => eventType === FullScreenEventType.Enter)
      .subscribe(this.enteredFullScreen.bind(this));

    this.fullScreenService.getObservable()
      .filter(eventType => eventType === FullScreenEventType.Leave)
      .subscribe(this.leftFullScreen.bind(this));
  }
}
