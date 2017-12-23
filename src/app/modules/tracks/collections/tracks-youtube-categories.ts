import {IModelConstructor} from '../../backbone/utils/interfaces';
import {YoutubeCollection} from '../../shared/collections/youtube';
import {TracksYoutubeCategory} from '../models/tracks-youtube-category';

export class TracksYoutubeCategories<TModel extends TracksYoutubeCategory> extends YoutubeCollection<TModel> {
  private static instance: TracksYoutubeCategories<TracksYoutubeCategory>;
  model: IModelConstructor = TracksYoutubeCategory;

  endpoint = '/videoCategories';

  static getInstance(): TracksYoutubeCategories<TracksYoutubeCategory> {
    if (!this.instance) {
      this.instance = new TracksYoutubeCategories();
      this.instance.fetch();
    }
    return this.instance;
  }

  sync(...args) {
    this.queryParams.part = 'snippet';
    this.queryParams.regionCode = 'US';
    return super.sync.apply(this, args);
  }
}
