import {AuxappCollection} from '../auxapp/auxapp.collection';
import {AuxappModel} from '../auxapp/auxapp.model';

export class YoutubeProxyCollection<TModel extends AuxappModel> extends AuxappCollection<AuxappModel> {

  model: any = AuxappModel;

  basePath() {
    return '/proxy/youtube';
  }

  parse(attributes: any) {
    return attributes.items || attributes;
  }
}


