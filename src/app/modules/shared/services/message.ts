import {Injectable} from '@angular/core';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {BaseModel} from '../../backbone/models/base.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';

export class MessageSubscription extends BaseModel {
  idAttribute = 'channelId';

  @attributesKey('messageType')
  public messageType: MessageTypes;

  @attributesKey('channelId')
  public channelId: string;

  @attributesKey('method')
  public method: MessageMethodTypes;

  @attributesKey('callback')
  public callback: Function;
}

export class MessageSubscriptions<TModel extends MessageSubscription> extends BaseCollection<BaseModel> {
  model = MessageSubscription;
}

export enum MessageMethodTypes {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  SUBSCRIBE = 'sub',
  UNSUBSCRIBE = 'unsub',
  RESPONSE = 'response'
}

export enum MessageTypes {
  SOCKET = 'SOCKET',
  WINDOW_MESSAGE = 'WINDOW_MESSAGE'
}

export interface IMessage {
  channel: string;
  method: MessageMethodTypes;
  body: any;
  sequence?: number;
}

@Injectable()
export class MessageService {
  private _subscriptions: MessageSubscriptions<MessageSubscription>;

  constructor() {
    this._subscriptions = new MessageSubscriptions();
  }

  public handleMessage(messageType: MessageTypes, message: IMessage) {
    if (!message.channel || !message.method) {
      throw new Error('Not a valid Message');
    }
    const messageSubscriptions = this._subscriptions.filter((subscription: MessageSubscription) => {
      return subscription.messageType === messageType &&
        subscription.channelId === message.channel &&
        subscription.method === message.method;
    });
    messageSubscriptions.forEach((subscription: MessageSubscription) => {
      subscription.callback(message.body);
    });
  }

  public subscribe(messageType: MessageTypes, channelId: string, method: MessageMethodTypes, callback: Function): MessageSubscription {
    const subscription = new MessageSubscription();
    subscription.messageType = messageType;
    subscription.channelId = channelId;
    subscription.method = method;
    subscription.callback = callback;
    return this._subscriptions.add(subscription);
  }

  public unSubscribe(messageType: MessageTypes, channelId: string, method?: MessageMethodTypes, callback?: Function) {

  }
}
