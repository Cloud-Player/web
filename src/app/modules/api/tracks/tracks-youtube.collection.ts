import {TrackYoutubeModel} from './track-youtube.model';
import {TracksAuxappCollection} from './tracks-auxapp.collection';

export class TracksYoutubeCollection<TModel extends TrackYoutubeModel>
  extends TracksAuxappCollection<TModel> {

  endpoint = 'track/youtube';
  model = TrackYoutubeModel;

}
