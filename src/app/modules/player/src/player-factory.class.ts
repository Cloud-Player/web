import {
  ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Type,
  ViewContainerRef
} from '@angular/core';
import {IPlayer, IPlayerSize} from './player.interface';
import {SoundcloudPlayerComponent} from '../components/soundcloud-player/soundcloud-player';
import {PlayerStatus} from './player-status.enum';
import {keys} from 'underscore';
import {PlayerStore} from '../collections/player-store';
import {PlayerStoreItem} from '../models/player-store-item';
import {PlayQueueItem} from '../models/play-queue-item';
import {YoutubePlayerComponent} from '../components/youtube-player/youtube-player';
import {Track} from '../../tracks/models/track';

@Injectable()
export class PlayerFactory {
  public static playerWidth = 320;

  private _resolver: ComponentFactoryResolver;
  private _container: ViewContainerRef;
  private _playerComponentMap;
  private _playerStore: PlayerStore<PlayerStoreItem>;

  constructor(resolver: ComponentFactoryResolver) {
    this._resolver = resolver;

    this._playerComponentMap = {
      SOUNDCLOUD: SoundcloudPlayerComponent,
      YOUTUBE: YoutubePlayerComponent
    };
  }

  public static getPlayerSize(track: Track): IPlayerSize {
    return {
      width: this.playerWidth,
      height: this.playerWidth / track.aspectRatio
    };
  }

  private getComponentForType(type: string) {
    if (this._playerComponentMap[type]) {
      return this._playerComponentMap[type];
    } else {
      throw new Error(`There is no player available for the type ${type}`);
    }
  }

  private createNewPlayer(item: PlayQueueItem): PlayerStoreItem {
    const component: Type<IPlayer> = this.getComponentForType(item.track.provider);
    const factory: ComponentFactory<IPlayer> = this._resolver.resolveComponentFactory(component);
    const playerComponent: ComponentRef<IPlayer> = this._container.createComponent(factory);
    const player = new PlayerStoreItem({
      component: playerComponent,
      provider: item.track.provider
    });
    const playerSize = PlayerFactory.getPlayerSize(item.track);
    playerComponent.instance.track = item.track;
    playerComponent.instance.initialise({size: playerSize});
    playerComponent.instance.preload(item.progress);
    playerComponent.instance.addClass('player');
    return player;
  }

  private getReusablePlayer(playQueueItem: PlayQueueItem): PlayerStoreItem {
    const applicablePlayer = this._playerStore.find((player: PlayerStoreItem) => {
      return player.provider === playQueueItem.track.provider &&
        player.component.instance.getStatus() === PlayerStatus.NotInitialised ||
        player.component.instance.getStatus() === PlayerStatus.Stopped;
    });

    return applicablePlayer;
  }

  private cleanUp() {
    keys(this._playerComponentMap).forEach((providerKey) => {
      const playersForProvider = this._playerStore.where({provider: providerKey});
      while (playersForProvider.length > 2) {
        const player = playersForProvider.pop();
        const playerInstance = player.component.instance;
        const playerStatus = playerInstance.getStatus();
        if (playerStatus === PlayerStatus.NotInitialised || playerStatus === PlayerStatus.Stopped) {
          player.component.destroy();
          this._playerStore.remove(player);
        }
      }
    });
  }

  public setContainer(container: ViewContainerRef) {
    this._container = container;
    this._playerStore = new PlayerStore();
  }

  public canReusePlayer(playerComponent: ComponentRef<IPlayer>, playQueueItem: PlayQueueItem) {
    const applicablePlayer = this._playerStore.find((player: PlayerStoreItem) => {
      return player.component === playerComponent && player.provider === playQueueItem.track.provider;
    });

    return !!applicablePlayer;
  }

  public createPlayer(item: PlayQueueItem): ComponentRef<IPlayer> {
    if (!this._container) {
      throw new Error('A container has to be set before you can create a player! Call setContainer()');
    }

    const reusablePlayer = this.getReusablePlayer(item);
    const playerSize = PlayerFactory.getPlayerSize(item.track);

    if (reusablePlayer) {
      const reusablePlayerComponent = reusablePlayer.component;

      if (reusablePlayerComponent.instance.track.id === item.track.id) {
        return reusablePlayer.component;
      }

      if (reusablePlayerComponent.instance.getStatus() === PlayerStatus.NotInitialised) {
        reusablePlayerComponent.instance.initialise({size: playerSize});
      }
      reusablePlayerComponent.instance.updateTrack(item.track);
      reusablePlayerComponent.instance.preload(item.progress);
      return reusablePlayerComponent;
    } else {
      const newPlayer = this.createNewPlayer(item);
      this._playerStore.add(newPlayer);
      // Make sure that there are maximum 2 instances of each player
      this.cleanUp();
      return newPlayer.component;
    }
  }

  public destroyPlayer(player: ComponentRef<IPlayer>): void {
    player.instance.deInitialize();
  }
}
