import {CloudplayerCollection} from '../cloud-player/cloud-player.collection';
import {CloudplayerModel} from '../cloud-player/cloud-player.model';

export class SoundcloudProxyCollection<TModel extends CloudplayerModel> extends CloudplayerCollection<CloudplayerModel> {

  model: any = CloudplayerModel;

  basePath() {
    return '/proxy/soundcloud';
  }
}


