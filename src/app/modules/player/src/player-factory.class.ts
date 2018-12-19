import {ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {IPlayer, IPlayerSize} from './player.interface';
import {SoundcloudPlayerComponent} from '../components/soundcloud-player/soundcloud-player';
import {PlayerStatus} from './player-status.enum';
import {keys} from 'underscore';
import {PlayerStore} from '../collections/player-store';
import {PlayerStoreItem} from '../models/player-store-item';
import {YoutubePlayerComponent} from '../components/youtube-player/youtube-player';
import {ITrack} from '../../api/tracks/track.interface';
import {MixcloudPlayerComponent} from '../components/mixcloud-player/mixcloud-player';
import {PlayqueueItemAuxappModel} from '../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';
import {DeezerPlayerComponent} from '../components/deezer-player/deezer-player';
import {HeadlessPlayerComponent} from '../components/headless-player/headless-player';
import {EmptyPlayerComponent} from '../components/empty-player/empty-player';

@Injectable()
export class PlayerFactory {
  public static playerWidth = 320;
  private static _playerComponentMap = {
    soundcloud: SoundcloudPlayerComponent,
    youtube: YoutubePlayerComponent,
    mixcloud: MixcloudPlayerComponent,
    deezer: DeezerPlayerComponent
  };
  private _resolver: ComponentFactoryResolver;
  private _container: ViewContainerRef;
  private _playerStore: PlayerStore<PlayerStoreItem>;
  private _isInHeadlessMode = false;

  constructor(resolver: ComponentFactoryResolver) {
    this._resolver = resolver;
  }

  public static getPlayerSize(track: ITrack): IPlayerSize {
    return {
      width: this.playerWidth,
      height: this.playerWidth * track.aspectRatio
    };
  }

  public static hasPlayerForProvider(provider: string) {
    return PlayerFactory._playerComponentMap[provider];
  }

  private getComponentForProvider(provider: string) {
    if (this._isInHeadlessMode) {
      return HeadlessPlayerComponent;
    } else if (PlayerFactory._playerComponentMap[provider]) {
      return PlayerFactory._playerComponentMap[provider];
    } else {
      console.error(`There is no player available for the type ${provider}`);
      return EmptyPlayerComponent;
    }
  }

  private createNewPlayer(item: PlayqueueItemAuxappModel): PlayerStoreItem {
    const component: Type<IPlayer> = this.getComponentForProvider(item.track.provider_id);
    const factory: ComponentFactory<IPlayer> = this._resolver.resolveComponentFactory(component);
    const playerComponent: ComponentRef<IPlayer> = this._container.createComponent(factory);
    const player = new PlayerStoreItem({
      component: playerComponent,
      provider: item.track.provider_id
    });
    const playerSize = PlayerFactory.getPlayerSize(item.track);
    playerComponent.instance.playQueueItem = item;
    playerComponent.instance.initialise({size: playerSize});
    playerComponent.instance.preload(item.progress);
    playerComponent.instance.addClass('player');
    return player;
  }

  private getReusablePlayer(playQueueItem: PlayqueueItemAuxappModel): PlayerStoreItem {
    const applicablePlayer = this._playerStore.find((player: PlayerStoreItem) => {
      return player.provider === playQueueItem.track.provider_id &&
        player.component.instance.isHeadlessPlayer === this._isInHeadlessMode &&
        player.component.instance.getStatus() === PlayerStatus.NotInitialised ||
        player.component.instance.getStatus() === PlayerStatus.Ended ||
        player.component.instance.getStatus() === PlayerStatus.Stopped;
    });

    return applicablePlayer;
  }

  private cleanUp() {
    keys(PlayerFactory._playerComponentMap).forEach((providerKey) => {
      const playersForProvider = this._playerStore.where({provider: providerKey});
      while (playersForProvider.length > 2) {
        const player = playersForProvider.shift();
        const playerInstance = player.component.instance;
        const playerStatus = playerInstance.getStatus();
        if (playerStatus === PlayerStatus.NotInitialised ||
          playerStatus === PlayerStatus.Stopped ||
          playerStatus === PlayerStatus.Paused ||
          playerStatus === PlayerStatus.Ended) {
          console.warn(
            'Playerfactory cleanup service destroys unused player for provider ' + player.component.instance.playQueueItem.track.provider_id);
          player.component.destroy();
          this._playerStore.remove(player);
        }
      }
    });
  }

  public hasPlayerForProvider(provider: string) {
    return !!this.getComponentForProvider(provider);
  }

  public setInHeadlessMode(isHeadless: boolean) {
    this._isInHeadlessMode = isHeadless;
  }

  public isInHeadlessMode(): boolean {
    return this._isInHeadlessMode;
  }

  public setContainer(container: ViewContainerRef) {
    this._container = container;
    this._playerStore = new PlayerStore();
  }

  public canReusePlayer(playerComponent: ComponentRef<IPlayer>, playQueueItem: PlayqueueItemAuxappModel) {
    const applicablePlayer = this._playerStore.find((player: PlayerStoreItem) => {
      return player.component === playerComponent && player.provider === playQueueItem.track.provider_id;
    });

    return !!applicablePlayer;
  }

  public createPlayer(item: PlayqueueItemAuxappModel): ComponentRef<IPlayer> {
    if (!this._container) {
      throw new Error('A container has to be set before you can create a player! Call setContainer()');
    }

    const reusablePlayer = this.getReusablePlayer(item);
    const playerSize = PlayerFactory.getPlayerSize(item.track);

    if (reusablePlayer) {
      const reusablePlayerComponent = reusablePlayer.component;

      if (reusablePlayerComponent.instance.playQueueItem.track.id === item.track.id &&
        reusablePlayerComponent.instance.getStatus() === PlayerStatus.Playing) {
        return reusablePlayer.component;
      }

      if (reusablePlayerComponent.instance.getStatus() === PlayerStatus.NotInitialised) {
        reusablePlayerComponent.instance.initialise({size: playerSize});
      }

      reusablePlayerComponent.instance.updatePlayQueueItem(item);
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

  public destroyPlayer(player: ComponentRef<IPlayer>, destroy?: boolean): void {
    if (destroy) {
      player.destroy();
      const playerItemForPlayer = this._playerStore.filter((playerItem) => {
        return playerItem.component === player;
      });
      this._playerStore.remove(playerItemForPlayer);
    } else {
      player.instance.deInitialize();
    }
  }
}
