import {AuxappCollection} from '../auxapp/auxapp.collection';
import {AuxappModel} from '../auxapp/auxapp.model';

export class SoundcloudProxyCollection<TModel extends AuxappModel> extends AuxappCollection<AuxappModel> {

  model: any = AuxappModel;

  basePath() {
    return '/proxy/soundcloud';
  }
}


