/// <reference path="./deezer.d.ts" />
import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {extend, uniqueId} from 'underscore';
import {IPlayer, IPlayerOptions, IPlayerSize} from '../../src/player.interface';
import {AbstractPlayer} from '../../src/abstract-player.class';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {TrackDeezerModel} from '../../../api/tracks/track-deezer.model';
import {PlayerStatus} from '../../src/player-status.enum';
import {ITrack} from '../../../api/tracks/track.interface';
import {Events} from 'backbone';

@Component({
  selector: 'app-deezer-player',
  styleUrls: ['./deezer-player.scss'],
  templateUrl: './deezer-player.html'
})
export class DeezerPlayerComponent extends AbstractPlayer implements IPlayer, OnInit, OnDestroy {
  private _dzApiReady = false;
  private _seekedTo: number;
  private _newTrack: ITrack;
  private _eventHandler;
  private _lastTrackDuration: number;
  private _canPlayWatcherTimeout;

  @Input()
  public track: TrackDeezerModel;

  /*
   * Deezer does not support multiple instances
   */
  public supportsMultiplePlayerInstances = false;
  public supportsCrossfade = false;
  public providerMap: ProviderMap = ProviderMap.map;

  constructor(private el: ElementRef) {
    super();
    if ((<any>window).DZ) {
      this._dzApiReady = true;
    }
    this._eventHandler = extend({}, Events);
  }

  public id = uniqueId('dz_player');

  private handleDzStatusChange(ev: string, arg: any) {
    switch (ev) {
      case 'buffering':
        this.onWaiting();
        break;
      case 'play':
        if (this._seekedTo) {
          DZ.player.seek(this._seekedTo);
          this._seekedTo = null;
        }
        this.onPlaying();
        break;
      case 'pause':
        this.onPaused();
        break;
      case 'ended':
        this.onEnded();
        break;
      case 'progress':
        const progress = arg[0];
        const duration = arg[1];
        const floorDuration = Math.floor(duration / 60 * 10) / 10;
        if (floorDuration && floorDuration !== this._lastTrackDuration) {
          this._lastTrackDuration = floorDuration;
          this.setDuration(duration);
        }
        if (progress) {
          this.onCurrentTimeUpdate(progress);
        }
        break;
      case 'player_loaded':
        this.onReady();
        break;
    }
  }

  protected bindListeners() {
    this.unBindListeners();

    this._eventHandler.on('onStateChange', this.handleDzStatusChange.bind(this));
  }

  protected unBindListeners() {
    this._eventHandler.off();
  }

  protected eventDelegator(type, args = []) {
    if (typeof args !== 'object') {
      args = [args];
    }
    args.unshift(type);
    this._eventHandler.trigger.apply(this._eventHandler, args);
  }

  protected initialisePlayerSDK(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const deezerElId = 'deezerJsSdk';
      const youtubeScriptEl = document.getElementById(deezerElId);
      if (this._dzApiReady) {
        resolve(true);
      } else {
        let js: HTMLScriptElement;
        const scripts = document.getElementsByTagName('script')[0];
        js = <HTMLScriptElement>document.createElement('script');
        js.id = deezerElId;
        js.src = 'https://e-cdns-files.dzcdn.net/js/min/dz.js';
        scripts.parentNode.insertBefore(js, youtubeScriptEl);
        js.onload = (() => {
          this._dzApiReady = true;
          resolve(true);
        });
      }
    });
  }

  protected initialisePlayer(options?: IPlayerOptions): Promise<Mixcloud.IPlayerWidget> {
    return new Promise((resolve) => {
      if (!document.getElementById('dz-root')) {
        throw new Error('Deezer player element is not attached to the dom!');
      }
      DZ.init({
        appId: '297584',
        channelUrl: '/assets/deezer-channel.html',
        player: {
          onload: () => {
            DZ.Event.subscribe('player_paused', (data) => {
              this.eventDelegator.call(this, 'onStateChange', ['pause', data]);
            });
            DZ.Event.subscribe('player_play', (data) => {
              this.eventDelegator.call(this, 'onStateChange', ['play', data]);
            });
            DZ.Event.subscribe('player_buffering', (data) => {
              this.eventDelegator.call(this, 'onStateChange', ['buffering', data]);
            });
            DZ.Event.subscribe('player_position', (data) => {
              this.eventDelegator.call(this, 'onStateChange', ['progress', data]);
            });
            DZ.Event.subscribe('track_end', (data) => {
              this.eventDelegator.call(this, 'onStateChange', ['ended', data]);
            });
            DZ.Event.subscribe('player_loaded', (data) => {
              this.eventDelegator.call(this, 'onStateChange', ['loaded', data]);
            });
            DZ.Event.subscribe('current_track', (data) => {
              this.eventDelegator.call(this, 'onStateChange', ['track_change', data]);
            });
            resolve();
          }
        }
      });
    });
  }

  protected deInitialisePlayer(): void {
    this._lastTrackDuration = null;
  }

  protected setPlayerVolume(volume: number) {
    DZ.player.setVolume(volume * 100);
  }

  protected setPlayerSize(size: IPlayerSize) {
  }

  protected preloadTrack(track: TrackDeezerModel, startTime: number = 0) {
    this._newTrack = track;
    DZ.player.pause();
    DZ.player.playTracks([]);
    DZ.player.playTracks([track.id]);
  }

  protected startPlayer(): void {
    this.onRequestPlay();
    DZ.player.play();
    if (this._canPlayWatcherTimeout) {
      window.clearTimeout(this._canPlayWatcherTimeout);
    }
    this._canPlayWatcherTimeout = setTimeout(() => {
      if (!DZ.player.isPlaying()) {
        console.error('CAN NOT START');
        this.pausePlayer();
        this.setStatus(PlayerStatus.Paused);
      }
    }, 500);
  }

  protected pausePlayer(): void {
    DZ.player.pause();
  }

  protected stopPlayer(): void {
    this._seekedTo = 0;
    DZ.player.pause();
  }

  protected seekPlayerTo(to: number) {
    if (this.getDuration()) {
      this._seekedTo = (to / this.getDuration()) * 100;
      DZ.player.seek(this._seekedTo);
      setTimeout(() => {
        if (DZ.player.isPlaying()) {
          this.onWaiting();
          this.onPlaying();
        }
      }, 500);
    }
  }

  public getPlayerEl(): ElementRef {
    return this.el;
  }

  public getCoverSize(): ImageSizes {
    return ImageSizes.Large;
  }

  ngOnDestroy(): void {
  }
}
