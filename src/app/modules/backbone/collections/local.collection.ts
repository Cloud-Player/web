import {Injectable} from '@angular/core';
import {Collection, Model} from 'backbone';
import localforage = require('localforage');

@Injectable()
export class LocalCollection <TModel extends Model> extends Collection<Model> {
  model: any = Model;
  localStoreId: string = null;

  readLocal(): Promise<any>{
    return localforage.getItem(this.localStoreId).then((res: any)=>{
      if(res){
        return res;
      } else {
        return [];
      }
    });
  }

  sync(method: string, collection: any, options: any): any{
    if (!this.localStoreId) {
      throw new Error('The attribute localStoreId has to be set!');
    }
    let action: Promise<any>;
    switch (method){
      case 'read':
        action = this.readLocal();
        break;
      case 'create':
      case 'update':
      case 'delete':
        break;
    }
    return action.then((res)=>{
      options.success.call(this, res);
      return res;
    });
  }

}
