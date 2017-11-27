import {BaseCollection} from '../../backbone/collections/base.collection';
import {PlayerModel} from '../models/player';
import {PlayerStatus} from '../enums/player-status';

export class Players<TModel extends PlayerModel> extends BaseCollection<TModel> {
  model: any = PlayerModel;

  public removeUpcomingPlayers() {
    for (let i = 1; i < this.length; i++) {
      this.remove(this.at(i), {silent: true});
    }
  }

  public setActive(player: TModel): TModel {
    const indexOf = this.indexOf(player);
    if (indexOf > 0) {
      this.remove(player, {silent: true});
      this.add(player, {at: 0});
      this.removeUpcomingPlayers();
    }
    return player;
  }

  public addAsNext(player: TModel): TModel {
    const indexOf = this.indexOf(player);
    if (indexOf !== 1) {
      this.remove(player, {silent: true});
      this.add(player, {at: 1});
    }
    return player;
  }
}
