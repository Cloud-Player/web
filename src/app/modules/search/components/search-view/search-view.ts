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
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {AuthenticatedUserAccountAuxappModel} from '../../../api/authenticated-user/account/authenticated-user-account-auxapp.model';
import {PrivacyConfigModalOpener} from '../../../main/components/privacy-config/privacy-config';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {ExternalUserAuthenticator} from '../../../authenticated-user/services/external-authenticator.class';
import {TracksAuxappCollection} from '../../../api/tracks/tracks-auxapp.collection';
import {TrackAuxappModel} from '../../../api/tracks/track-auxapp.model';
import {TracksMixcloudCollection} from '../../../api/tracks/tracks-mixcloud.collection';
import {TrackMixcloudModel} from '../../../api/tracks/track-mixcloud.model';
import {TracksDeezerCollection} from '../../../api/tracks/tracks-deezer.collection';
import {TrackDeezerModel} from '../../../api/tracks/track-deezer.model';
import {ClientDetector, ClientNames} from '../../../shared/services/client-detector.service';

@Component({
  selector: 'app-search-view',
  styleUrls: ['./search-view.scss'],
  templateUrl: './search-view.html'
})

export class SearchViewComponent implements AfterViewInit {
  public tracksAuxapp: TracksAuxappCollection<TrackAuxappModel>;
  public tracksSoundCloud: TracksSoundcloudCollection<TrackSoundcloudModel>;
  public tracksYoutube: TracksYoutubeCollection<TrackYoutubeModel>;
  public tracksMixcloud: TracksMixcloudCollection<TrackMixcloudModel>;
  public tracksDeezer: TracksDeezerCollection<TrackDeezerModel>;
  public searchCollection: TracksAuxappCollection<TrackAuxappModel>;
  public isFetching = false;
  public showWelcomeText = false;
  public availableProviderMap = ProviderMap.map;
  public activeTab = this.availableProviderMap['auxapp'].id;
  public searchTerm = '';
  public isConnected = true;
  public authenticatedUser: AuthenticatedUserModel;

  @ViewChild('searchBar') searchBar: CollectionTextInputSearchComponent;
  @ViewChild('tabBar') tabBar: TabBarComponent;

  constructor(private humanReadableSecondsPipe: HumanReadableSecondsPipe,
              private privacyConfigModalOpener: PrivacyConfigModalOpener,
              private externalUserAuthenticator: ExternalUserAuthenticator) {
    this.tracksAuxapp = new TracksAuxappCollection();
    this.tracksSoundCloud = new TracksSoundcloudCollection();
    this.tracksYoutube = new TracksYoutubeCollection();
    this.tracksMixcloud = new TracksMixcloudCollection();
    this.tracksDeezer = new TracksDeezerCollection();
    this.searchCollection = this.tracksSoundCloud;
    this.setRandomSearchTerm();
    this.authenticatedUser = AuthenticatedUserModel.getInstance();
  }

  public isNativeClient() {
    return ClientDetector.getClient().name === ClientNames.Electron;
  }

  public setIsConnected() {
    this.isConnected = this.authenticatedUser.accounts.getAccountForProvider('auxapp').isConnected();
    this.authenticatedUser.accounts.getAccountForProvider('auxapp')
      .on('change:connected', (account: AuthenticatedUserAccountAuxappModel) => {
        this.isConnected = account.isConnected();
      });
  }

  public selectTab(tabPane: TabPaneComponent) {
    switch (tabPane.id) {
      case ProviderMap.auxapp.id:
        this.searchCollection = this.tracksAuxapp;
        break;
      case ProviderMap.soundcloud.id:
        this.searchCollection = this.tracksSoundCloud;
        break;
      case ProviderMap.youtube.id:
        this.searchCollection = this.tracksYoutube;
        break;
      case ProviderMap.mixcloud.id:
        this.searchCollection = this.tracksMixcloud;
        break;
      case ProviderMap.deezer.id:
        this.searchCollection = this.tracksDeezer;
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
      'Trentemøller',
      'Arcade Fire',
      'Burning Man',
      'Robot Heart',
      'Fusion Festival'
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

  public updatePrivacySettings() {
    this.privacyConfigModalOpener.open();
  }

  public transformScDurationValue = (value) => {
    if (value) {
      return this.humanReadableSecondsPipe.transform((value / 1000).toString());
    }
  };

  public connect(providerId: string) {
    const account: IAuthenticatedUserAccount = this.authenticatedUser.accounts.getAccountForProvider(providerId);
    this.externalUserAuthenticator.connect(account);
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

    this.tracksAuxapp.on('request', () => {
      this.isFetching = true;
      this.showWelcomeText = false;
    });

    this.tracksAuxapp.on('sync error', () => {
      this.isFetching = false;
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

    this.tracksMixcloud.on('request', () => {
      this.isFetching = true;
      this.showWelcomeText = false;
    });

    this.tracksMixcloud.on('sync error', () => {
      this.isFetching = false;
    });

    this.tracksDeezer.on('request', () => {
      this.isFetching = true;
      this.showWelcomeText = false;
    });

    this.tracksDeezer.on('sync error', () => {
      this.isFetching = false;
    });

    setTimeout(this.setIsConnected.bind(this), 2000);
  }
}
