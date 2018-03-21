import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CollectionTextInputSearchComponent} from '../../../shared/components/collection-text-input-search/collection-text-input-search.component';
import * as localforage from 'localforage';
import {TabBarComponent} from '../../../shared/components/tab-bar/tab-bar';
import {TabPaneComponent} from '../../../shared/components/tab-pane/tab-pane';
import {TracksSoundcloudCollection} from '../../../api/tracks/tracks-soundcloud.collection';
import {TrackSoundcloudModel} from '../../../api/tracks/track-soundcloud.model';
import {TracksYoutubeCollection} from '../../../api/tracks/tracks-youtube.collection';
import {TrackYoutubeModel} from '../../../api/tracks/track-youtube.model';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {Utils} from '../../../shared/src/utils.class';

@Component({
  selector: 'app-search-view',
  styleUrls: ['./search-view.scss'],
  templateUrl: './search-view.html'
})

export class SearchViewComponent implements AfterViewInit {
  public tracksSoundCloud: TracksSoundcloudCollection<TrackSoundcloudModel>;
  public tracksYoutube: TracksYoutubeCollection<TrackYoutubeModel>;
  public searchCollection: TracksSoundcloudCollection<TrackSoundcloudModel> | TracksYoutubeCollection<TrackYoutubeModel>;
  public isFetching = false;
  public showWelcomeText = false;
  public activeTab = 'soundcloud';
  public availableProviderMap = ProviderMap.map;
  public searchTerm = '';

  @ViewChild('searchBar') searchBar: CollectionTextInputSearchComponent;
  @ViewChild('tabBar') tabBar: TabBarComponent;

  constructor() {
    this.tracksSoundCloud = new TracksSoundcloudCollection();
    this.tracksYoutube = new TracksYoutubeCollection();
    this.searchCollection = this.tracksSoundCloud;
    this.setRandomSearchTerm();
  }

  public selectTab(tabPane: TabPaneComponent) {
    switch (tabPane.id) {
      case 'soundcloud':
        this.searchCollection = this.tracksSoundCloud;
        break;
      case 'youtube':
        this.searchCollection = this.tracksYoutube;
        break;
    }
    localforage.setItem('sc_search_provider', tabPane.id);
  }

  public setRandomSearchTerm() {
    const searchTerms = [
      'M83',
      'Max Cooper',
      'Ed Sheeran',
      'alt-J',
      'Portugal. The Man',
      'Imagine Dragons',
      'Sofi Tukker',
      'Drake',
      'Kendrik Lamar',
      'The Weeknd',
      'Bedouin Brutal Hearts',
      'La raíz',
      'Fall Out Boy',
      'Kodaline',
      'Wanda',
      'Cigarettes after Sex',
      'Trentemøller'
    ];
    const randomInt = Utils.getRandomInt(0, searchTerms.length - 1);
    this.searchTerm = searchTerms[randomInt];
  }

  public animatedSearch(searchTerm, query = '', index = 0) {
    if (query.length === this.searchTerm.length) {
      this.searchBar.search();
    } else {
      query += searchTerm[index];
      index++;
      this.searchBar.setSearchTerm(query);
      setTimeout(this.animatedSearch.bind(this, searchTerm, query, index), 100);
    }
  }

  ngAfterViewInit() {
    this.searchBar.focus();

    localforage.getItem('sc_search_provider').then((val: string) => {
      if (val) {
        this.tabBar.selectTabById(val);
      }
    });

    localforage.getItem('sc_search_term').then((val: string) => {
      if (val) {
        this.searchBar.search(val);
      } else {
        this.showWelcomeText = true;
      }
    });

    this.searchBar.valueChange.subscribe((val: string) => {
      localforage.setItem('sc_search_term', val);
    });

    this.tracksSoundCloud.on('request', () => {
      this.isFetching = true;
      this.showWelcomeText = false;
    });

    this.tracksSoundCloud.on('sync error', () => {
      this.isFetching = false;
    });

    this.tracksYoutube.on('request', () => {
      this.isFetching = true;
      this.showWelcomeText = false;
    });

    this.tracksYoutube.on('sync error', () => {
      this.isFetching = false;
    });
  }
}
