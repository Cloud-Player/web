import {Injectable} from '@angular/core';
import {Session} from '../../session/models/session.model';
import * as localforage from 'localforage';
import {UserAnalyticsService} from '../../user-analytics/services/user-analytics.service';
import {Globals} from '../../../../globals';
import {ToastModel} from '../models/toast';
import {Toasts} from '../collections/toasts';

@Injectable()
export class ToastService {
  private _toasts: Toasts<ToastModel>;

  constructor() {
    this._toasts = new Toasts();
  }

  public clear() {
    this._toasts.reset();
    //mwScheduler.reset();
  }

  public getToasts() {
    return this._toasts;
  }

  public removeToast(toast: ToastModel) {
    return this._toasts.remove(toast);
  }

  public addToast(toast: ToastModel) {
    return this._toasts.add(toast);
  }
}
