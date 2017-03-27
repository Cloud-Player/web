import {Injectable} from '@angular/core';
import {Model} from 'backbone';
import localforage = require('localforage');
import {findWhere, indexOf, extend, isArray} from 'underscore';

@Injectable()
export class LocalModel extends Model {

  localStoreId: string = null;

  readLocal(model: any): Promise<any> {
    return localforage.getItem(this.localStoreId).then((res: any) => {
      if (isArray(res) && model.id) {
        let search = {};
        search[model.idAttribute] = model.id;
        return findWhere(res, search);
      } else if(isArray(res) && !model.id && res.length === 1){
        return res[0];
      } else {
        return {};
      }
    });
  }

  createLocal(model: any, options: any): Promise<any> {
    return localforage.getItem(this.localStoreId).then((res: Array<any> | any) => {
      let modelObj = model.toJSON(options);
      modelObj.id = Math.floor(Math.random() * 100000000);

      if (isArray(res)) {
        res.push(modelObj);
      } else {
        res = [modelObj];
      }

      return localforage.setItem(this.localStoreId, res).then(() => {
        return modelObj;
      });
    });
  }

  updateLocal(model: any, options: any): Promise<any> {
    return localforage.getItem(this.localStoreId).then((res: any) => {
      let modelObj = model.toJSON(options);

      if (isArray(res)) {
        let search = {};
        search[this.idAttribute] = model.id;
        let existingModel = findWhere(res, search);
        if (existingModel) {
          let index = indexOf(res, existingModel);
          res[index] = extend(model, modelObj);
        } else {
          res.push(modelObj);
        }
      } else {
        res = [modelObj];
      }
      return localforage.setItem(this.localStoreId, res).then(() => {
        return modelObj;
      });
    });
  }

  deleteLocal(model: any): Promise<any> {
    return localforage.getItem(this.localStoreId).then((res: any) => {
      if (isArray(res)) {
        let search = {};
        search[this.idAttribute] = model.id;
        let existingModel = findWhere(res, search);
        if (existingModel) {
          let index = indexOf(res, existingModel);
          res.splice(index, 1);
        }
      }
      if (res.length) {
        return localforage.setItem(this.localStoreId, res);
      } else {
        return localforage.removeItem(this.localStoreId);
      }
    });
  }

  sync(method: string, model: any, options: any): any {
    if (!this.localStoreId) {
      throw new Error('The attribute localStoreId has to be set!');
    }
    let action: Promise<any>;
    switch (method) {
      case 'read':
        action = this.readLocal(model);
        break;
      case 'create':
        action = this.createLocal(model, options);
        break;
      case 'update':
        action = this.updateLocal(model, options);
        break;
      case 'delete':
        action = this.deleteLocal(model);
        break;
    }
    return action.then((result: any)=>{
      options.success.call(model, result);
      return result;
    });
  }
}
