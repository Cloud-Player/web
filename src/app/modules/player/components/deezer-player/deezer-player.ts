/// <reference path="./deezer.d.ts" />
import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {uniqueId} from 'underscore';
import {IPlayer, IPlayerOptions, IPlayerSize} from '../../src/player.interface';
import {AbstractPlayer} from '../../src/abstract-player.class';
import {TrackMixcloudModel} from '../../../api/tracks/track-mixcloud.model';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {TrackDeezerModel} from '../../../api/tracks/track-deezer.model';

@Component({
  selector: 'app-deezer-player',
  styleUrls: ['./deezer-player.scss'],
  templateUrl: './deezer-player.html'
})
export class DeezerPlayerComponent extends AbstractPlayer implements IPlayer, OnInit, OnDestroy {
  private _dzApiReady = false;
  private _dzPlayerReady = false;
  private _seekedTo: number;

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
  }

  public id = uniqueId('mc_player');

  private handleMcStatusChange(ev: string, arg: any) {
    switch (ev) {
      case 'buffering':
        this.setDuration(DZ.player.getCurrentTrack().duration);
        this.onWaiting();
        break;
      case 'play':
        console.log('PLAY', DZ.player.getCurrentTrack().duration);
        this.setDuration(DZ.player.getCurrentTrack().duration);
        this.onPlaying();
        break;
      case 'pause':
        this.onPaused();
        break;
      case 'ended':
        this.onEnded();
        break;
      case 'progress':
        this.onCurrentTimeUpdate(arg[0]);
        this.setDuration(arg[1]);
        break;
    }
  }

  protected bindListeners() {
    this.unBindListeners();
    DZ.Event.subscribe('player_paused', this.handleMcStatusChange.bind(this, 'pause'));
    DZ.Event.subscribe('player_play', this.handleMcStatusChange.bind(this, 'play'));
    DZ.Event.subscribe('PlayerEvents', this.handleMcStatusChange.bind(this, 'buffering'));
    DZ.Event.subscribe('player_position', this.handleMcStatusChange.bind(this, 'progress'));
    DZ.Event.subscribe('track_end', this.handleMcStatusChange.bind(this, 'ended'));
  }

  protected unBindListeners() {
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
        js = document.createElement('script');
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

  protected initialisePlayer(options: IPlayerOptions): Promise<Mixcloud.IPlayerWidget> {
    return new Promise((resolve) => {
      if (!document.getElementById('dz-root')) {
        throw new Error('Deezer player element is not attached to the dom!');
      }
      DZ.init({
        appId: '297584',
        channelUrl: '/assets/deezer-channel.html',
        player: {
          onload: () => {
            console.log('INITIALISED');
            resolve();
          }
        }
      });
    });
  }

  protected deInitialisePlayer(): void {
  }

  protected setPlayerVolume(volume: number) {
    DZ.player.setVolume(volume * 100);
  }

  protected setPlayerSize(size: IPlayerSize) {
  }

  protected preloadTrack(track: TrackDeezerModel, startTime: number = 0) {
    DZ.player.playTracks([track.id]);
  }

  protected startPlayer(): void {
    this.onRequestPlay();
    DZ.player.play();
    // DZ.player.play().then(() => {
    //   if (this._seekedTo) {
    //     this.seekPlayerTo(this._seekedTo);
    //     this._seekedTo = null;
    //   }
    // });
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
      console.log(this.getDuration());
      this._seekedTo = (to / this.getDuration()) * 100;
      DZ.player.seek(this._seekedTo);
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
