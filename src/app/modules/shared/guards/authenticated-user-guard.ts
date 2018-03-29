import {CanActivate} from '@angular/router';
import {AuthenticatedUserModel} from '../../api/authenticated-user/authenticated-user.model';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticatedUserGuard implements CanActivate {
  private _authenticatedUser: AuthenticatedUserModel;

  constructor() {
    this._authenticatedUser = AuthenticatedUserModel.getInstance();
  }

  canActivate() {
    return <Promise<boolean>>new Promise((resolve, reject) => {
      if (this._authenticatedUser.id) {
        resolve(true);
      } else {
        this._authenticatedUser.once('sync', () => {
          resolve(true);
        });
      }
    });
  }
}
