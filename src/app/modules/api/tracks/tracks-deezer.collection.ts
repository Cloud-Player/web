import {ITrackModelConstructor} from './track.interface';
import {TracksAuxappCollection} from './tracks-auxapp.collection';
import {TrackDeezerModel} from './track-deezer.model';

export class TracksDeezerCollection<TModel extends TrackDeezerModel>
  extends TracksAuxappCollection<TModel> {

  model: ITrackModelConstructor = TrackDeezerModel;

  endpoint = '/track/deezer';

  queryParams: {
    [key: string]: string | number | boolean
  } = {};
}
