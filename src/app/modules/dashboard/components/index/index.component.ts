import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import {
  CollectionTextInputSearchComponent
} from '../../../shared/components/collection-text-input-search/collection-text-input-search.component';
import * as localforage from 'localforage';
import {TabBarComponent} from '../../../shared/components/tab-bar/tab-bar';
import {TabPaneComponent} from '../../../shared/components/tab-pane/tab-pane';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {ITwoRangeSliderValue} from '../../../shared/components/two-range-slider/two-range-slider.component';
import {TracksSoundcloudCollection} from '../../../api/tracks/tracks-soundcloud.collection';
import {TrackSoundcloudModel} from '../../../api/tracks/track-soundcloud.model';
import {TracksYoutubeCollection} from '../../../api/tracks/tracks-youtube.collection';
import {TrackYoutubeModel} from '../../../api/tracks/track-youtube.model';
import {ProviderMap} from '../../../shared/src/provider-map.class';

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

  constructor(private humanReadableSecPipe: HumanReadableSecondsPipe) {
    this.tracksSoundCloud = new TracksSoundcloudCollection();
    this.tracksYoutube = new TracksYoutubeCollection();
    this.searchCollection = this.tracksSoundCloud;
  }

  transformScDurationValue = function (input: any) {
    return this.humanReadableSecPipe.transform(input / 1000, null);
  }.bind(this);

  connect() {
  }

  ngAfterViewInit() {
    this.searchBar.focus();

    this.tabBar.tabChange.subscribe((tabPane: TabPaneComponent) => {
      switch (tabPane.id) {
        case 'soundcloud':
          this.searchCollection = this.tracksSoundCloud;
          break;
        case 'youtube':
          this.searchCollection = this.tracksYoutube;
          break;
      }
      localforage.setItem('sc_search_provider', tabPane.id);
    });

    localforage.getItem('sc_search_term').then((val: string) => {
      if (val) {
        this.searchBar.search(val);
      } else {
        this.showWelcomeText = true;
      }
    });

    localforage.getItem('sc_search_provider').then((val: string) => {
      if (val) {
        this.tabBar.selectTabById(val);
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