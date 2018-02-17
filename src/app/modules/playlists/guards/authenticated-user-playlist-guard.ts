import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthenticatedUserModel} from '../../api/authenticated-user/authenticated-user.model';
import {Injectable} from '@angular/core';
import {AuthenticatedUserGuard} from '../../shared/guards/authenticated-user-guard';

@Injectable()
export class AuthenticatedUserPlaylistGuard implements CanActivate {
  private _authenticatedUser: AuthenticatedUserModel;

  constructor(private authenticatedUserGuard: AuthenticatedUserGuard) {
    this._authenticatedUser = AuthenticatedUserModel.getInstance();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const provider = route.params.provider;
    return this.authenticatedUserGuard.canActivate().then(() => {
      return <Promise<boolean>>new Promise((resolve, reject) => {
        const account = this._authenticatedUser.accounts.getAccountForProvider(provider);
        if (!account.playlists.isSyncing) {
          resolve(true);
        } else {
          account.playlists.once('sync', () => {
            resolve(true);
          });
        }
      });
    });
  }
}
