import {Component, OnInit} from '@angular/core';
import {CloudPlayerLogoService} from '../../../shared/services/cloud-player-logo.service';
import * as localforage from 'localforage';
import {debounce, throttle} from 'underscore';
import {PlayerStatus} from '../../src/player-status.enum';
import {PlayQueueItemStatus} from '../../src/playqueue-item-status.enum';
import {PlayQueue} from '../../collections/play-queue';
import {PlayQueueItem} from '../../models/play-queue-item';

@Component({
  selector: 'app-player',
  styleUrls: ['./player.scss'],
  templateUrl: './player.html'
})
export class PlayerComponent implements OnInit {
  public playQueue: PlayQueue<PlayQueueItem>;
  public isPlaying: boolean;
  public isBuffering: boolean;

  constructor(private cloudPlayerLogoService: CloudPlayerLogoService) {

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

  ngOnInit(): void {
    this.playQueue = PlayQueue.getInstance();

    const playQueue = PlayQueue.getInstance();

    localforage.getItem('sc_playqueue').then((lastPlayingQueue: Array<any>) => {
      if (lastPlayingQueue) {
        this.playQueue.add(lastPlayingQueue);
      }
    });

    localforage.getItem('sc_currentItem').then((lastPlayingItem: any) => {
      if (lastPlayingItem) {
        lastPlayingItem.status = PlayQueueItemStatus.Paused;
        this.playQueue.add(lastPlayingItem, {at: 0});
      }
    });

    const debouncedPlayQueueSave = debounce(() => {
      localforage.setItem('sc_playqueue', this.playQueue.getScheduledItemsJSON(30));
    }, 1000);

    const throttledCurrentItemSave = throttle((currentItem) => {
      if (currentItem) {
        localforage.setItem('sc_currentItem', currentItem.toMiniJSON());
      }
    }, 10000);

    this.playQueue.on('add remove reset change:status', debouncedPlayQueueSave);
    this.playQueue.on('change:progress', throttledCurrentItemSave);

  }

}
