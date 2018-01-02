import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

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

    this._observable = new EventEmitter<FullScreenEventType>();
    if (htmlEl.requestFullscreen) {
      this._fullScreenCall = function () {
        htmlEl.requestFullscreen();
      };
    } else if (htmlEl.webkitRequestFullscreen) {
      this._fullScreenCall = function () {
        htmlEl.webkitRequestFullscreen();
      };
    }

    document.addEventListener('fullscreenchange', this.fullScreenListener.bind(this));
    document.addEventListener('webkitfullscreenchange', this.fullScreenListener.bind(this));
  }

  private fullScreenListener() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      this._isInFullScreen = true;
      this._observable.emit(FullScreenEventType.Enter);
    } else if (this._isInFullScreen) {
      this._isInFullScreen = false;
      this._observable.emit(FullScreenEventType.Leave);
    }
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
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      this._observable.emit(FullScreenEventType.RequestLeave);
    }
  }

  public canEnterFullScreen() {
    return !!this._fullScreenCall;
  }
}
