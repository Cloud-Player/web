import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import {Tracks} from '../../../tracks/collections/tracks.collection';
import {Track} from '../../../tracks/models/track.model';
import {CollectionTextInputSearchComponent} from '../../../shared/components/collection-text-input-search/collection-text-input-search.component';
import localforage = require('localforage');
import {AuthService} from '../../../shared/services/auth.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'my-dashboard',
  styles: [require('./index.style.scss')],
  template: require('./index.template.html')
})

export class DashboardIndexComponent implements AfterViewInit {
  title = 'Search Tracks';

  public isFetching: boolean = false;

  @ViewChild('searchBar') searchBar: CollectionTextInputSearchComponent;

  constructor(private tracks: Tracks<Track>, private authService: AuthService) {
  }

  public connect() {
    this.authService.connect();
  }

  ngAfterViewInit() {
    this.searchBar.focus();

    this.searchBar.valueChange.subscribe((val: string) => {
      localforage.setItem('sc_search_term', val);
    });

    localforage.getItem('sc_search_term').then((val: string) => {
      if (val) {
        this.searchBar.search(val);
      }
    });

    this.tracks.on('request', () => {
      this.isFetching = true;
    });

    this.tracks.on('sync error', () => {
      this.isFetching = false;
    });
  }
}
