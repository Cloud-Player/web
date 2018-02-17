import {EventEmitter, Injectable} from '@angular/core';

export interface IDragAndDropData {
  dragData?: any;
  dropReference?: any;
}

export enum DragAndDropStates {
  DragStart,
  DragEnd
}

@Injectable()
export class DragAndDropService {
  private _dragAndDropData: IDragAndDropData;
  private _events: EventEmitter<DragAndDropStates>;

  constructor() {
    this._dragAndDropData = {};
    this._events = new EventEmitter();
  }

  public getDragData(): IDragAndDropData {
    return this._dragAndDropData;
  }

  public dragStart(dragData?) {
    this._dragAndDropData = {
      dragData: dragData
    };
    this._events.emit(DragAndDropStates.DragStart);
  }

  public dragEnd() {
    this._dragAndDropData = {};
    this._events.emit(DragAndDropStates.DragEnd);
  }

  public getObservable(): EventEmitter<DragAndDropStates> {
    return this._events;
  }
}
