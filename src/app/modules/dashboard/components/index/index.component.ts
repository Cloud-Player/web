import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import {
  CollectionTextInputSearchComponent
} from '../../../shared/components/collection-text-input-search/collection-text-input-search.component';
import * as localforage from 'localforage';
import {AuthService} from '../../../shared/services/auth.service';
import {TracksSoundcloud} from '../../../tracks/collections/tracks-soundcloud';
import {TrackSoundcloud} from '../../../tracks/models/track-soundcloud';
import {TracksYoutube} from '../../../tracks/collections/tracks-youtube';
import {TrackYoutube} from '../../../tracks/models/track-youtube';
import {TabBarComponent} from '../../../shared/components/tab-bar/tab-bar';
import {TabPaneComponent} from '../../../shared/components/tab-pane/tab-pane';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {ITwoRangeSliderValue} from '../../../shared/components/two-range-slider/two-range-slider.component';

@Component({
  selector: 'app-my-dashboard',
  styleUrls: ['./index.style.scss'],
  templateUrl: './index.template.html'
})

export class DashboardIndexComponent implements AfterViewInit {
  public tracksSoundCloud: TracksSoundcloud<TrackSoundcloud>;
  public tracksYoutube: TracksYoutube<TrackYoutube>;
  public searchCollection: TracksSoundcloud<TrackSoundcloud> | TracksYoutube<TrackYoutube>;
  public isFetching = false;
  public showWelcomeText = false;
  public activeTab = 'SOUNDCLOUD';

  @ViewChild('searchBar') searchBar: CollectionTextInputSearchComponent;
  @ViewChild('tabBar') tabBar: TabBarComponent;

  constructor(private authService: AuthService, private humanReadableSecPipe: HumanReadableSecondsPipe) {
    this.tracksSoundCloud = new TracksSoundcloud();
    this.tracksYoutube = new TracksYoutube();
    this.searchCollection = this.tracksSoundCloud;
  }

  transformScDurationValue = function (input: any) {
    return this.humanReadableSecPipe.transform(input / 1000, null);
  }.bind(this);

  connect() {
    this.authService.connect();
  }

  ngAfterViewInit() {
    this.searchBar.focus();

    this.tabBar.tabChange.subscribe((tabPane: TabPaneComponent) => {
      switch (tabPane.id) {
        case 'SOUNDCLOUD':
          this.searchCollection = this.tracksSoundCloud;
          break;
        case 'YOUTUBE':
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
