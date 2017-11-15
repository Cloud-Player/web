import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {SoundcloudPlayerComponent} from '../soundcloud-player/soundcloud-player';
import {IPlayer} from '../../interfaces/player';
import {PlayerStatus} from '../../enums/player-status';
import {PlayQueueItemStatus} from '../../enums/playqueue-item-status';

@Component({
  selector: 'app-player-controller',
  styleUrls: ['./player-controller.scss'],
  templateUrl: './player-controller.html',
  entryComponents: [
    SoundcloudPlayerComponent
  ]
})

export class PlayerControllerComponent implements OnInit {
  private playerComponentMap = {
    SOUNDCLOUD: SoundcloudPlayerComponent
  };

  public playerComponents: ComponentRef<IPlayer>[];

  @Input()
  public playQueue: PlayQueue<PlayQueueItem>;

  @ViewChild('playerContainer', {read: ViewContainerRef}) container;

  constructor(private resolver: ComponentFactoryResolver) {
    this.playerComponents = [];
  }

  private reactOnPlayQueueChange(item: PlayQueueItem): void {
    switch (item.status) {
      case PlayQueueItemStatus.Playing:
        this.play(item);
        break;
      case PlayQueueItemStatus.Stopped:
        this.removePlayerComponent(this.getPlayerComponent(item));
        break;
      case PlayQueueItemStatus.Paused:
        this.pause();
        break;
    }
  }

  private bindListeners(player: IPlayer): void {
    player.currentTimeChange.subscribe((time: number) => {
      if (time > player.duration - 10) {
        const upcoming: PlayQueueItem = this.playQueue.getNextItem();
        if (upcoming && !this.getPlayerComponent(upcoming)) {
          console.warn('PREPARE', upcoming.track.title);
          this.addPlayerComponent(this.createPlayerComponent(upcoming));
        }
      }
    });
    player.statusChange
      .filter(event => event === PlayerStatus.Ended)
      .subscribe(() => {
        if (this.playerComponents.length > 1) {
          this.playQueue.getNextItem().play();
        } else {
          this.playQueue.getCurrentItem().stop();
        }
      });
  }

  private addPlayerComponent(playerComponent: ComponentRef<IPlayer>) {
    this.playerComponents.push(playerComponent);
  }

  private removePlayerComponent(playerComponent: ComponentRef<IPlayer>) {
    if (playerComponent) {
      const existingPlayerIndex = this.playerComponents.indexOf(playerComponent);
      playerComponent.destroy();
      this.playerComponents.splice(existingPlayerIndex, 1);
    }
  }

  private createPlayerComponent(item: PlayQueueItem): ComponentRef<IPlayer> {
    const factory: ComponentFactory<IPlayer> = this.resolver.resolveComponentFactory(SoundcloudPlayerComponent);
    const playerComponent: ComponentRef<IPlayer> = this.container.createComponent(factory);
    playerComponent.instance.track = item.track;
    playerComponent.instance.initialise();
    return playerComponent;
  }

  private setPlayerComponent(player: ComponentRef<IPlayer>): void {
    const indexOfPlayer = this.playerComponents.indexOf(player);
    if (indexOfPlayer !== -1) {
      if (indexOfPlayer > 0) {
        this.playerComponents.splice(indexOfPlayer, 1);
        this.playerComponents[0] = player;
      }
    } else {
      this.playerComponents.push(player);
    }
    this.bindListeners(player.instance);
  }

  private getPlayerComponent(playQueueItem): ComponentRef<IPlayer> {
    let existingPlayerComponent: ComponentRef<IPlayer> = null;
    this.playerComponents.every((playerComponent: ComponentRef<IPlayer>) => {
      if (playerComponent.instance.track.id === playQueueItem.track.id) {
        existingPlayerComponent = playerComponent;
        return false;
      } else {
        return true;
      }
    });
    return existingPlayerComponent;
  }

  private activatePlayerComponent(newPlayerComponent: ComponentRef<IPlayer>, from: number = 0) {
    const currentActivePlayerComponent = this.playerComponents[0];
    if (newPlayerComponent === currentActivePlayerComponent) {
      newPlayerComponent.instance.play();
    } else if (currentActivePlayerComponent) {
      const indexOfExisting = this.playerComponents.indexOf(newPlayerComponent);
      this.removePlayerComponent(currentActivePlayerComponent);
      this.playerComponents.splice(indexOfExisting, 1);
      this.playerComponents[0] = newPlayerComponent;
      newPlayerComponent.instance.play(from);
    }
    this.bindListeners(newPlayerComponent.instance);
  }

  public play(playQueueItem: PlayQueueItem, from?: number) {
    let playerComponent = this.getPlayerComponent(playQueueItem);
    if (!playerComponent) {
      playerComponent = this.createPlayerComponent(playQueueItem);
      this.addPlayerComponent(playerComponent);
    }
    playQueueItem.set('status', PlayQueueItemStatus.Playing, {silent: true});
    this.activatePlayerComponent(playerComponent, from);
  }

  public pause() {
    const currentPlayer = this.playerComponents[0];
    const currentPlayingItem = this.playQueue.getPlayingItem();

    if (currentPlayingItem) {
      currentPlayingItem.set('status', PlayQueueItemStatus.Paused, {silent: true});
    }

    if (currentPlayer && currentPlayer.instance.status === PlayerStatus.Playing) {
      currentPlayer.instance.pause();
    }
  }

  public togglePlayPause(): void {
    const currItem = this.playQueue.getCurrentItem();
    if (currItem) {
      if (currItem.isPlaying()) {
        currItem.pause();
      } else {
        currItem.play();
      }
    }
  }

  public previous(): void {
    const currItem = this.playQueue.getCurrentItem();
    if (currItem && currItem.status === PlayQueueItemStatus.Playing) {
      this.play(currItem, 0);
    } else {
      if (this.playQueue.hasPreviousItem()) {
        this.play(this.playQueue.getPreviousItem());
      }
    }
  }

  public next(): void {
    if (this.playQueue.hasNextItem()) {
      this.play(this.playQueue.getNextItem());
    }
  }

  ngOnInit(): void {
    this.playQueue.on('change:status', this.reactOnPlayQueueChange, this);
  }
}
