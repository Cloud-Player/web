import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {filter} from 'rxjs/internal/operators';

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
        this.playQueue.add(lastPlayingQueue);
      }
    });
  }

  private setLastPlayingItem() {
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

    //this.setLastPlayingQueue();
    //this.setLastPlayingItem();

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

    const throttledProgressUpdate = throttle((currentItem) => {
      if (currentItem) {
        localforage.setItem('cp_currentItem', currentItem.toMiniJSON());
      }
      this.cdr.detectChanges();
    }, 10000);

    this.playQueue.on('update remove reset change:status', debouncedPlayQueueSave);
    this.playQueue.on('update remove reset', debouncedSetHasPlayer);
    this.playQueue.on('change:progress', throttledProgressUpdate);

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

    this.playQueue.add({
      track: {
        provider: 'mixcloud',
        id: '/matsumoto-kentaro/dj-k3npy-party-time-mix/',
        title: 'Party Time Mix',
        user: {
          title: 'matsumoto-kentaro'
        },
        image: {
          high: {
            url: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/6/6/b/f/d97a-c170-4aa0-868d-b49d1b400d11.jpg'
          },
          medium: {
            url: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/6/6/b/f/d97a-c170-4aa0-868d-b49d1b400d11.jpg'
          },
          default: {
            url: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/6/6/b/f/d97a-c170-4aa0-868d-b49d1b400d11.jpg'
          }
        }
      }
    });
    this.playQueue.add({
      track: {
        provider: 'mixcloud',
        id: '/DJMimi_Taiwan/%E5%92%AA%E5%92%AA%E5%A4%A7%E8%88%9E%E5%BB%B3-elecrto-house-party-time-by-dj-mimi-taiwan/',
        title: 'Party Time Mix 2',
        user: {
          title: 'DJMimi_Taiwan'
        },
        image: {
          high: {
            url: 'https://thumbnailer.mixcloud.com/unsafe/600x600/profile/1/0/1/c/5459-5295-46da-9193-2960ce2ab7ea.jpg'
          },
          medium: {
            url: 'https://thumbnailer.mixcloud.com/unsafe/300x300/profile/1/0/1/c/5459-5295-46da-9193-2960ce2ab7ea.jpg'
          },
          default: {
            url: 'https://thumbnailer.mixcloud.com/unsafe/100x100/profile/1/0/1/c/5459-5295-46da-9193-2960ce2ab7ea.jpg'
          }
        }
      }
    });
  }
}
