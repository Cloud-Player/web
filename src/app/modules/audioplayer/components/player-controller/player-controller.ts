import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {SoundcloudPlayerComponent} from '../soundcloud-player/soundcloud-player';
import {IPlayer} from '../../interfaces/player';
import {PlayerStatus} from '../../enums/player-status';
import {PlayQueueItemStatus} from '../../enums/playqueue-item-status';
import {Players} from '../../collections/players';
import {PlayerModel} from '../../models/player';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-player-controller',
  styleUrls: ['./player-controller.scss'],
  templateUrl: './player-controller.html',
  entryComponents: [
    SoundcloudPlayerComponent
  ]
})

export class PlayerControllerComponent implements OnInit {
  private _fadeInDuration = 10;
  private _fadeOutDuration = 10;
  private _prepareTime = 30;
  private _volume = 1;
  private _playerStatus;
  private _errorOccured = false;
  private _playerSubscriptions;


  @Input()
  public playQueue: PlayQueue<PlayQueueItem>;

  @Output()
  public playerStatusChange: EventEmitter<PlayerStatus> = new EventEmitter();

  @ViewChild('playerContainer', {read: ViewContainerRef}) private container;

  constructor(private resolver: ComponentFactoryResolver) {
    this._playerSubscriptions = new Subscription();
    this._playerFactory = new PlayerFactory(this.resolver);
  }

  private bindListeners(player: IPlayer): void {
    this._playerSubscriptions.unsubscribe();
    this._playerSubscriptions = new Subscription();

    this._playerSubscriptions.add(player.currentTimeChange
      .subscribe(currentTime => {
        this.playQueue.get(player.track.id).progress = currentTime;
      })
    );

    this._playerSubscriptions.add(
      player.currentTimeChange
        .filter((currentTime: number) => {
          if (player.duration) {
            return currentTime >= (player.duration - this._prepareTime);
          }
        })
        .subscribe(currentTime => {
          this.prepareNextPlayer();
        })
    );

    const crossFadeSubscription = this._playerSubscriptions.add(
      player.currentTimeChange
        .filter(currentTime => {
          const maxFadeDuration = Math.max(this._fadeInDuration, this._fadeOutDuration);

          if (player.duration > maxFadeDuration) {
            return currentTime >= player.duration - maxFadeDuration;
          } else {
            return false;
          }
        })
        .subscribe(currentTime => {
          crossFadeSubscription.unsubscribe();
          this.crossFade();
        })
    );

    this._playerSubscriptions.add(
      player.statusChange
        .subscribe((status: PlayerStatus) => {
          if (!this.players.get(player.track.id)) {
            console.warn('WRONG LISTENER');
            return;
          }
          switch (status) {
            case PlayerStatus.Playing:
              this._errorOccured = false;
              this.playQueue.getCurrentItem().play();
              break;
            case PlayerStatus.Paused:
              this.playQueue.getCurrentItem().pause();
              break;
            case PlayerStatus.Ended:
              if (this.playQueue.hasNextItem()) {
                this.playQueue.getNextItem().play();
              } else {
                this.playQueue.getCurrentItem().stop();
              }
              break;
            case PlayerStatus.Error:
              this._errorOccured = true;
              this.playQueue.getCurrentItem().pause();
              break;
          }
          this._playerStatus = status;
          this.playerStatusChange.emit(status);
        })
    );

    if (player.duration > 0) {
      this.playQueue.get(player.track.id).duration = player.duration;
    } else {
      this._playerSubscriptions.add(
        player.durationChange
          .subscribe(() => {
            this.playQueue.get(player.track.id).duration = player.duration;
          })
      );
    }
  }

  private crossFade() {
    const currentPlayer = this.players.first();
    const nextPlayer = this.players.at(1);

    if (nextPlayer && nextPlayer.instance.canPlay) {
      const maxDurationTime = Math.max(this._fadeOutDuration, this._fadeInDuration);
      const minDurationTime = Math.min(this._fadeOutDuration, this._fadeInDuration);
      const waitTimeFadeIn = this._fadeInDuration === maxDurationTime ? 0 : maxDurationTime - minDurationTime;
      const waitTimeFadeOut = this._fadeOutDuration === maxDurationTime ? 0 : maxDurationTime - minDurationTime;

      setTimeout(() => {
        currentPlayer.instance.fadeOut(this._fadeOutDuration * 1000);
      }, waitTimeFadeOut);

      setTimeout(() => {
        nextPlayer.instance.play();
        nextPlayer.instance.fadeIn(this._fadeInDuration * 1000);
      }, waitTimeFadeIn);
    } else {
      console.warn('NEXT PALYER IS NOT READY');
    }
  }


  private prepareNextPlayer() {
    const upcoming: PlayQueueItem = this.playQueue.getNextItem();
    if (upcoming && !this.players.get(upcoming.id)) {
      let nextPlayer = this.players.get(upcoming.id);
      if (!nextPlayer) {
        nextPlayer = this.createPlayer(upcoming);
      }
      this.players.addAsNext(nextPlayer);
    }
  }

    }
  }

  private startPlayerFor(playQueueItem: PlayQueueItem, startTime: number = 0) {
    const activePlayer = this.players.first();
    let player: PlayerModel = this.players.get(playQueueItem.id);

    // For continuous playback we have to reuse the same playerinstance
    // Browsers don't allow to start a new audio/video player when the tab is in the background
    if (this.shallReusePlayerInstance(activePlayer, player)) {
      this._playerSubscriptions.unsubscribe();
      activePlayer.instance.updateTrack(playQueueItem.track);
      this.bindListeners(activePlayer.instance);
      return;
    }

    // No player instance is available so create a new component
    if (!player) {
      player = this.createPlayer(playQueueItem);
      this.players.add(player);
    }

    // Another player is currently active so it has to be stopped
    if (activePlayer && activePlayer !== player) {
      if (this._playerSubscriptions) {
        this._playerSubscriptions.unsubscribe();
      }
      activePlayer.instance.deInitialize();
      activePlayer.component.destroy();
      this.players.remove(activePlayer);
    }

    if (this._errorOccured) {
      player.instance.deInitialize();
      player.instance.initialise();
    }

    // Set new player active
    this.players.setActive(player);
    if (player.instance.status !== PlayerStatus.Playing) {
      player.instance.play(startTime);
    }
    this.bindListeners(player.instance);
  }

  private pausePlayerFor(playQueueItem: PlayQueueItem) {
    const player = this.players.get(playQueueItem.id);
    if (player) {
      player.instance.pause();
    }
  }

  private stopPlayerFor(playQueueItem: PlayQueueItem) {
    const player = this.players.get(playQueueItem.id);
    if (player) {
      player.instance.stop();
    }
  }

  private reactOnPlayQueueChange(item: PlayQueueItem): void {
    switch (item.status) {
      case PlayQueueItemStatus.Playing:
        this.startPlayerFor(item, item.progress);
        break;
      case PlayQueueItemStatus.Stopped:
        this.stopPlayerFor(item);
        break;
      case PlayQueueItemStatus.Paused:
        this.pausePlayerFor(item);
        break;
    }
  }

  ngOnInit(): void {
    this.playQueue.on('change:status', this.reactOnPlayQueueChange, this);
    this.playQueue.on('add', () => {
      const currentItem = this.playQueue.getCurrentItem();
      if (currentItem && this.players.length === 0) {
        const player = this.createPlayer(currentItem);
        this.players.add(player);
      }
    });
  }
}
