import {EventEmitter, Injectable} from '@angular/core';
import {isObject, isString} from 'underscore';
import {IMessage, MessageMethodTypes, MessageService, MessageSubscription, MessageTypes} from './message';
import {filter, first} from 'rxjs/operators';

export enum SocketStatusTypes {
  OPEN = 'OPEN',
  MESSAGE = 'MESSAGE',
  CLOSED = 'CLOSED',
  ERROR = 'ERROR',
  SEND_MESSAGE = 'SEND_MESSAGE'
}

export interface ISocketEvent {
  type: SocketStatusTypes;
  detail?: any;
}

@Injectable()
export class SocketMessageService {
  private _socket: WebSocket;
  private _isOpened: boolean;
  private _observable: EventEmitter<ISocketEvent>;
  private _subscribedChannelIds: Array<string> = [];
  private _openSubscriptions: Array<string> = [];
  private _socketUrl: string;
  private _keepOpen: boolean;
  private _isClosing: boolean;

  constructor(private messageService: MessageService) {
    this._observable = new EventEmitter();
  }

  private onOpen(event: Event) {
    console.log('[SOCKET] Open');
    this._isOpened = true;
    this._observable.emit({type: SocketStatusTypes.OPEN});
    this._subscribedChannelIds.forEach((channelId) => {
      this.subscribeOnChannelId(channelId);
    });
  }

  private subscribeOnChannelId(channelId: string) {
    if (this._openSubscriptions.indexOf(channelId) < 0) {
      this._openSubscriptions.push((channelId));
      this.sendMessage(channelId, MessageMethodTypes.SUBSCRIBE);
    }
  }

  private parseMessage(msg) {
    let jsonData;
    if (isString(msg)) {
      jsonData = JSON.parse(msg);
    } else if (isObject(msg)) {
      jsonData = msg;
    }
    return jsonData;
  }

  private onMessage(event: MessageEvent) {
    const jsonData = this.parseMessage(event.data);

    if (jsonData.status_code < 400) {
      this.messageService.handleMessage(MessageTypes.SOCKET, {
        channel: jsonData.channel,
        method: MessageMethodTypes[jsonData.method.toUpperCase() as keyof typeof MessageMethodTypes],
        body: jsonData.body || []
      });
      this._observable.emit({type: SocketStatusTypes.MESSAGE, detail: jsonData});
    } else {
      console.error('[SOCKET] Message Error', jsonData);
      this._observable.emit({
        type: SocketStatusTypes.ERROR,
        detail: jsonData
      });
    }
  }

  private onClose(event: Event) {
    console.warn('[SOCKET] Closed');
    if (this._keepOpen) {
      setTimeout(this.reOpen.bind(this), 3000);
    }
    this._isOpened = false;
    this._openSubscriptions = [];
    this._isClosing = false;
    this._observable.emit({type: SocketStatusTypes.CLOSED});
  }

  private onError(event: ErrorEvent) {
    console.error('[SOCKET] Error', event.error);
    this._observable.emit({type: SocketStatusTypes.ERROR, detail: event.error});
  }

  private reOpen() {
    this.open(this._socketUrl);
  }

  private send(channelId: string, method: MessageMethodTypes, body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const sequenceNumber = +new Date();
      const message: IMessage = {channel: channelId, method: method, body: body, sequence: sequenceNumber};
      this._socket.send(JSON.stringify(message));
      this._observable.emit({
        type: SocketStatusTypes.SEND_MESSAGE,
        detail: message
      });
      this._observable
        .pipe(
          filter((ev) => {
            return ev.type === SocketStatusTypes.MESSAGE && ev.detail.sequence === sequenceNumber;
          }),
          first()
        )
        .subscribe((ev) => {
          const jsonData = this.parseMessage(ev.detail);
          if (jsonData.status_code < 400) {
            resolve(jsonData);
          } else {
            reject(jsonData);
          }
        });
    });
  }

  public open(socketUrl: string) {
    if (this._isClosing) {
      this.getObservable()
        .pipe(
          filter(ev => ev.type === SocketStatusTypes.CLOSED),
          first()
        )
        .subscribe(this.open.bind(this, socketUrl));
      console.log('WAIT UNITL ITS CLOSED');
      return;
    }
    if (this._isOpened) {
      this._socket.close();
      this.open(socketUrl);
      return;
    }
    this._keepOpen = true;
    this._socketUrl = socketUrl;
    this._socket = new WebSocket(socketUrl);
    this._socket.addEventListener('open', this.onOpen.bind(this));
    this._socket.addEventListener('message', this.onMessage.bind(this));
    this._socket.addEventListener('close', this.onClose.bind(this));
    this._socket.addEventListener('error', this.onError.bind(this));
  }

  public close() {
    this._subscribedChannelIds = [];
    this._openSubscriptions = [];
    this._keepOpen = false;
    this._isOpened = false;
    this._isClosing = true;
    this._socket.close();
  }

  public sendMessage(channelId: string, method: MessageMethodTypes, body?: any): Promise<any> {
    if (this._isOpened) {
      const message: IMessage = {channel: channelId, method: method, body: body, sequence: +new Date()};
      this._observable.emit({
        type: SocketStatusTypes.SEND_MESSAGE,
        detail: message
      });
      return this.send(channelId, method, body);
    } else {
      return new Promise((resolve, reject) => {
        this.getObservable()
          .pipe(
            filter((ev: ISocketEvent) => {
              return ev.type === SocketStatusTypes.OPEN;
            }),
            first()
          )
          .subscribe(() => {
            this.sendMessage(channelId, method, body).then((rsp) => {
              resolve(rsp);
            }, (rsp) => {
              reject(rsp);
            });
          });
      });
    }
  }

  public subscribe(channelId: string, method: MessageMethodTypes, callback: Function): MessageSubscription {
    const indexOfSubscribedChannelId = this._subscribedChannelIds.indexOf(channelId);
    if (indexOfSubscribedChannelId < 0) {
      this._subscribedChannelIds.push(channelId);
    }
    this.subscribeOnChannelId(channelId);
    return this.messageService.subscribe(MessageTypes.SOCKET, channelId, method, callback);
  }

  public unSubscribe(channelId: string, method?: MessageMethodTypes, callback?: Function) {
    const indexOfSubscribedChannelId = this._subscribedChannelIds.indexOf(channelId);
    if (indexOfSubscribedChannelId >= 0) {
      this._subscribedChannelIds.splice(indexOfSubscribedChannelId, 0);
    }
    return this.messageService.unSubscribe(MessageTypes.SOCKET, channelId, method, callback);
  }

  public isOpen() {
    return this._isOpened;
  }

  public getObservable() {
    return this._observable;
  }
}
