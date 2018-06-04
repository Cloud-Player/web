import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Utils} from '../src/utils.class';

export enum FullScreenEventType {
  RequestEnter,
  Enter,
  RequestLeave,
  Leave
}

@Injectable()
export class FullScreenService {
  private _observable: EventEmitter<FullScreenEventType>;
  private _isInFullScreen = false;
  private _fullScreenCall: Function;

  constructor() {
    const htmlEl = document.querySelector('html');

    Utils.vendorPrefixes.every((vendorPrefix) => {
      let requestFullscreenFnName;
      switch (vendorPrefix) {
        case 'moz':
          requestFullscreenFnName = 'mozRequestFullScreen';
          break;
        case 'webkit':
          requestFullscreenFnName = 'webkitRequestFullScreen';
          break;
        case 'ms':
          requestFullscreenFnName = 'msRequestFullscreen';
          break;
        default:
          requestFullscreenFnName = 'requestFullscreen';
          break;
      }
      const fullscreenListenerName = `${vendorPrefix}fullscreenchange`;
      if (htmlEl[requestFullscreenFnName]) {
        this._fullScreenCall = () => {
          htmlEl[requestFullscreenFnName]();
        };
        document.addEventListener(fullscreenListenerName, this.fullScreenListener.bind(this));
        return false;
      } else {
        return true;
      }
    });

    this._observable = new EventEmitter<FullScreenEventType>();
  }

  private fullScreenListener() {
    Utils.vendorPrefixes.every((vendorPrefix) => {
      let fullScreenElName;
      switch (vendorPrefix) {
        case 'moz':
          fullScreenElName = 'mozFullScreen';
          break;
        case 'webkit':
          fullScreenElName = 'webkitIsFullScreen';
          break;
        case 'ms':
          fullScreenElName = 'msFullscreenElement';
          break;
        default:
          fullScreenElName = 'fullscreen';
          break;
      }
      if (document[fullScreenElName] === true) {
        this._isInFullScreen = true;
        this._observable.emit(FullScreenEventType.Enter);
        return false;
      } else if (document[fullScreenElName] === false) {
        this._isInFullScreen = false;
        this._observable.emit(FullScreenEventType.Leave);
        return true;
      } else {
        // Element is not supported by browser
        return true;
      }
    });
  }

  public isInFullScreen() {
    return this._isInFullScreen;
  }

  public getObservable(): Observable<FullScreenEventType> {
    return this._observable;
  }

  public enter() {
    if (!this._isInFullScreen && this._fullScreenCall) {
      this._fullScreenCall();
      this._observable.emit(FullScreenEventType.RequestEnter);
    }
  }

  public leave() {
    if (this._isInFullScreen) {

      Utils.vendorPrefixes.every((vendorPrefix) => {
        let exitFullscreenFnName;
        switch (vendorPrefix) {
          case 'moz':
            exitFullscreenFnName = 'mozCancelFullScreen';
            break;
          case 'webkit':
            exitFullscreenFnName = 'webkitCancelFullScreen';
            break;
          case 'ms':
            exitFullscreenFnName = 'msExitFullscreen';
            break;
          default:
            exitFullscreenFnName = 'exitFullscreen';
            break;
        }
        if (document[exitFullscreenFnName]) {
          document[exitFullscreenFnName]();
          return false;
        } else {
          return true;
        }
      });

      this._observable.emit(FullScreenEventType.RequestLeave);
    }
  }

  public canEnterFullScreen() {
    return !!this._fullScreenCall;
  }
}
