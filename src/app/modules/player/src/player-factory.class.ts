import {
  ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Type,
  ViewContainerRef
} from '@angular/core';
import {IPlayer} from './player.interface';
import {SoundcloudPlayerComponent} from '../components/soundcloud-player/soundcloud-player';
import {PlayerStatus} from './player-status.enum';
import {keys} from 'underscore';
import {PlayerStore} from '../collections/player-store';
import {PlayerStoreItem} from '../models/player-store-item';
import {PlayQueueItem} from '../models/play-queue-item';

@Injectable()
export class PlayerFactory {
  private _resolver: ComponentFactoryResolver;
  private _container: ViewContainerRef;
  private _playerComponentMap;
  private _playerStore: PlayerStore<PlayerStoreItem>;

  constructor(resolver: ComponentFactoryResolver) {
    this._resolver = resolver;

    this._playerComponentMap = {
      SOUNDCLOUD: SoundcloudPlayerComponent
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
    const component: Type<IPlayer> = this.getComponentForType(item.provider);
    const factory: ComponentFactory<IPlayer> = this._resolver.resolveComponentFactory(component);
    const playerComponent: ComponentRef<IPlayer> = this._container.createComponent(factory);
    const player = new PlayerStoreItem({
      component: playerComponent,
      provider: item.provider
    });
    playerComponent.instance.track = item.track;
    playerComponent.instance.initialise();
    playerComponent.instance.addClass('player');
    return player;
  }

  private getReusablePlayer(playQueueItem: PlayQueueItem): PlayerStoreItem {
    const applicablePlayer = this._playerStore.find((player: PlayerStoreItem) => {
      return player.provider === playQueueItem.provider &&
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
      return player.component === playerComponent && player.provider === playQueueItem.provider;
    });

    return !!applicablePlayer;
  }

  public createPlayer(item: PlayQueueItem): ComponentRef<IPlayer> {
    if (!this._container) {
      throw new Error('A container has to be set before you can create a player! Call setContainer()');
    }

    const reusablePlayer = this.getReusablePlayer(item);
    if (reusablePlayer) {
      if (reusablePlayer.component.instance.track.id === item.track.id) {
        return reusablePlayer.component;
      } else {
        const reusablePlayerComponent = reusablePlayer.component;
        if (reusablePlayerComponent.instance.getStatus() === PlayerStatus.NotInitialised) {
          reusablePlayerComponent.instance.initialise({preload: false});
        }
        reusablePlayerComponent.instance.updateTrack(item.track);
        return reusablePlayerComponent;
      }
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
