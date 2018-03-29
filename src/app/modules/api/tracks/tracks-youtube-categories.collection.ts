import {IModelConstructor} from '../../backbone/utils/interfaces';
import {TracksYoutubeCategoryModel} from './tracks-youtube-category.model';
import {YoutubeProxyCollection} from '../youtube/youtube-proxy.collection';

export class TracksYoutubeCategoriesCollection<TModel extends TracksYoutubeCategoryModel> extends YoutubeProxyCollection<TModel> {
  private static instance: TracksYoutubeCategoriesCollection<TracksYoutubeCategoryModel>;
  model: IModelConstructor = TracksYoutubeCategoryModel;

  endpoint = '/videoCategories';

  static getInstance(): TracksYoutubeCategoriesCollection<TracksYoutubeCategoryModel> {
    if (!this.instance) {
      this.instance = new TracksYoutubeCategoriesCollection();
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
