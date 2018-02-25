import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {CollectionTextInputSearchComponent} from '../../../shared/components/collection-text-input-search/collection-text-input-search.component';
import * as localforage from 'localforage';
import {TabBarComponent} from '../../../shared/components/tab-bar/tab-bar';
import {TabPaneComponent} from '../../../shared/components/tab-pane/tab-pane';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {TracksSoundcloudCollection} from '../../../api/tracks/tracks-soundcloud.collection';
import {TrackSoundcloudModel} from '../../../api/tracks/track-soundcloud.model';
import {TracksYoutubeCollection} from '../../../api/tracks/tracks-youtube.collection';
import {TrackYoutubeModel} from '../../../api/tracks/track-youtube.model';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-my-dashboard',
  styleUrls: ['./index.style.scss'],
  templateUrl: './index.template.html'
})

export class DashboardIndexComponent implements AfterViewInit {
  public tracksSoundCloud: TracksSoundcloudCollection<TrackSoundcloudModel>;
  public tracksYoutube: TracksYoutubeCollection<TrackYoutubeModel>;
  public searchCollection: TracksSoundcloudCollection<TrackSoundcloudModel> | TracksYoutubeCollection<TrackYoutubeModel>;
  public isFetching = false;
  public showWelcomeText = false;
  public activeTab = 'soundcloud';
  public availableProviderMap = ProviderMap.map;

  @ViewChild('searchBar') searchBar: CollectionTextInputSearchComponent;
  @ViewChild('tabBar') tabBar: TabBarComponent;

  constructor() {
    this.tracksSoundCloud = new TracksSoundcloudCollection();
    this.tracksYoutube = new TracksYoutubeCollection();
    this.searchCollection = this.tracksSoundCloud;
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
