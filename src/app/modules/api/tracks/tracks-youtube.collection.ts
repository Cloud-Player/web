import {TrackYoutubeModel} from './track-youtube.model';
import {TracksAuxappCollection} from './tracks-auxapp.collection';
import {queryParam} from '../../backbone/decorators/query-param.decorator';

export class TracksYoutubeCollection<TModel extends TrackYoutubeModel>
  extends TracksAuxappCollection<TModel> {

  @queryParam()
  provider_id = null;
  endpoint = 'track/youtube';
  model = TrackYoutubeModel;

}
