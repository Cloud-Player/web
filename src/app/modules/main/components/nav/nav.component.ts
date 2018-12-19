import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ClientDetector, ClientNames, OsNames, Result} from '../../../shared/services/client-detector.service';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {AuthenticatedUserAccountAuxappModel} from '../../../api/authenticated-user/account/authenticated-user-account-auxapp.model';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {AuthenticatedUserAccountSoundcloudModel} from '../../../api/authenticated-user/account/authenticated-user-account-soundcloud.model';
import {AuthenticatedUserAccountYoutubeModel} from '../../../api/authenticated-user/account/authenticated-user-account-youtube.model';
import {debounce} from 'underscore';
import {AuthenticatedUserPlaylistAuxappModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-auxapp.model';
import {AuthenticatedUserPlaylistYoutubeModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-youtube.model';
import {AuthenticatedUserPlaylistSoundcloudModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-soundcloud.model';
import {DragAndDropService, DragAndDropStates, IDragAndDropData} from '../../../shared/services/drag-and-drop';
import {ITrack} from '../../../api/tracks/track.interface';
import {TrackSoundcloudModel} from '../../../api/tracks/track-soundcloud.model';
import {TrackYoutubeModel} from '../../../api/tracks/track-youtube.model';
import {IPlaylist} from '../../../api/playlists/playlist.interface';
import {LayoutChangeTypes, LayoutService} from '../../../shared/services/layout';
import {ExternalUserAuthenticator} from '../../../authenticated-user/services/external-authenticator.class';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {filter} from 'rxjs/internal/operators';
import {PrivacyManager} from '../../services/privacy-manager';
import {PrivacyConfigModalOpener} from '../privacy-config/privacy-config';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {TrackMixcloudModel} from '../../../api/tracks/track-mixcloud.model';
import {AuthenticatedUserAccountDeezerModel} from '../../../api/authenticated-user/account/authenticated-user-account-deezer.model';

const packageJSON = require('../../../../../../package.json');

@Component({
  selector: 'app-nav-sidebar',
  styleUrls: ['./nav.style.scss'],
  templateUrl: './nav.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavComponent implements OnInit {
  public availableProviderMap = {
    auxapp: {
      providerId: ProviderMap.auxapp.id,
      title: ProviderMap.auxapp.title,
      icon: ProviderMap.auxapp.icon,
      accountModel: AuthenticatedUserAccountAuxappModel,
      tmpPlaylistModel: new AuthenticatedUserPlaylistAuxappModel(),
      playlistCollapsed: false,
      playlistCollapsedBeforeDragVal: false
    },
    soundcloud: {
      providerId: ProviderMap.soundcloud.id,
      title: ProviderMap.soundcloud.title,
      icon: ProviderMap.soundcloud.icon,
      accountModel: AuthenticatedUserAccountSoundcloudModel,
      tmpPlaylistModel: new AuthenticatedUserPlaylistSoundcloudModel(),
      playlistCollapsed: false,
      playlistCollapsedBeforeDragVal: false
    },
    youtube: {
      providerId: ProviderMap.youtube.id,
      title: ProviderMap.youtube.title,
      icon: ProviderMap.youtube.icon,
      accountModel: AuthenticatedUserAccountYoutubeModel,
      tmpPlaylistModel: new AuthenticatedUserPlaylistYoutubeModel(),
      playlistCollapsed: false,
      playlistCollapsedBeforeDragVal: false
    },
    deezer: {
      providerId: ProviderMap.deezer.id,
      title: ProviderMap.deezer.title,
      icon: ProviderMap.deezer.icon,
      accountModel: AuthenticatedUserAccountDeezerModel,
      tmpPlaylistModel: new AuthenticatedUserPlaylistYoutubeModel(),
      playlistCollapsed: false,
      playlistCollapsedBeforeDragVal: false
    }
  };

  public authenticatedUser: AuthenticatedUserModel;
  public auxappAccount: AuthenticatedUserAccountAuxappModel;
  public version = packageJSON.version;

  @ViewChild('shrinkingSidebar')
  public shrinkingSidebar: ElementRef;

  constructor(private el: ElementRef,
              private zone: NgZone,
              private cdr: ChangeDetectorRef,
              private dragAndDropService: DragAndDropService,
              private externalUserAuthenticator: ExternalUserAuthenticator,
              private layoutService: LayoutService,
              private userAnalyticsService: UserAnalyticsService,
              private privacyManager: PrivacyManager,
              private privacyConfigModalOpener: PrivacyConfigModalOpener) {
    this.authenticatedUser = AuthenticatedUserModel.getInstance();
    this.auxappAccount = <AuthenticatedUserAccountAuxappModel>this.getAccountForProvider('auxapp');
  }

  private getAccountForProvider(provider: string) {
    return this.authenticatedUser.accounts.find((item) => {
      return item.provider === provider;
    });
  }

  private update() {
    this.cdr.detectChanges();
  }

  public showDesktopAppEntry(): boolean {
    const os: Result = ClientDetector.getOs(),
      client: Result = ClientDetector.getClient();
    return (
      client.name !== ClientNames.Electron &&
      ((os.name === OsNames.MacOs && os.version > 0) || (os.name === OsNames.Windows && os.version >= 7))
    );
  }

  public connect(account: IAuthenticatedUserAccount) {
    this.externalUserAuthenticator.connect(account);
  }

  public openPrivacySettings() {
    this.privacyConfigModalOpener.open();
  }

  public saveTmpPlaylist(account) {
    const accMapValue = this.availableProviderMap[account.provider];
    if (accMapValue) {
      if (accMapValue.tmpPlaylistModel instanceof AuthenticatedUserPlaylistAuxappModel) {
        accMapValue.tmpPlaylistModel.accountId = this.authenticatedUser.id;
      }
      if (accMapValue.tmpPlaylistModel.title.length > 0) {
        const newPlaylist: IPlaylist = account.playlists.add(accMapValue.tmpPlaylistModel.clone(), {at: 0});
        newPlaylist.save().then(
          () => {
            this.userAnalyticsService.trackEvent(
              'playlist',
              `create:${accMapValue.tmpPlaylistModel.provider}`,
              'app-nav-sidebar');
            accMapValue.tmpPlaylistModel.title = '';
            this.update();
          },
          () => {
            this.userAnalyticsService.trackEvent(
              'playlist',
              `create_error:${accMapValue.tmpPlaylistModel.provider}`,
              'app-nav-sidebar');
          }
        );
      }
    }
  }

  public drop(dragAndDrop: IDragAndDropData) {
    const track = <ITrack>dragAndDrop.dragData;
    const playlist = <IPlaylist>dragAndDrop.dropReference;
    if (track && playlist) {
      const playlistItem = playlist.items.add({track: track.clone()});
      playlistItem.save().then(
        () => {
          this.userAnalyticsService.trackEvent(
            'playlist',
            `${playlistItem.type}:add:${track.provider_id}`,
            'app-nav-sidebar');
        }, () => {
          this.userAnalyticsService.trackEvent(
            'playlist',
            `${playlistItem.type}:add_error:${track.provider_id}`,
            'app-nav-sidebar');
        }
      );
      this.userAnalyticsService.trackEvent(
        'drag_and_drop',
        `add_track_to_playlist`,
        'app-nav-sidebar');
    }
  }

  public dragStart() {
    const dragData = this.dragAndDropService.getDragData().dragData;
    this.availableProviderMap.youtube.playlistCollapsedBeforeDragVal = !!this.availableProviderMap.youtube.playlistCollapsed;
    this.availableProviderMap.youtube.playlistCollapsed = true;
    this.availableProviderMap.soundcloud.playlistCollapsedBeforeDragVal = !!this.availableProviderMap.soundcloud.playlistCollapsed;
    this.availableProviderMap.soundcloud.playlistCollapsed = true;
    this.availableProviderMap.deezer.playlistCollapsedBeforeDragVal = !!this.availableProviderMap.deezer.playlistCollapsed;
    this.availableProviderMap.deezer.playlistCollapsed = true;
    this.el.nativeElement.classList.add('open');
    this.update();
  }

  public dragEnd() {
    this.availableProviderMap.auxapp.playlistCollapsed = this.availableProviderMap.auxapp.playlistCollapsedBeforeDragVal;
    this.availableProviderMap.soundcloud.playlistCollapsed = this.availableProviderMap.soundcloud.playlistCollapsedBeforeDragVal;
    this.availableProviderMap.youtube.playlistCollapsed = this.availableProviderMap.youtube.playlistCollapsedBeforeDragVal;
    this.el.nativeElement.classList.remove('open');
    this.update();
  }

  ngOnInit(): void {
    this.dragAndDropService.getObservable()
      .pipe(
        filter(dragAndDropState => dragAndDropState === DragAndDropStates.DragStart)
      )
      .subscribe(this.dragStart.bind(this));
    this.dragAndDropService.getObservable().pipe(
      filter(dragAndDropState => dragAndDropState === DragAndDropStates.DragEnd)
    )
      .subscribe(this.dragEnd.bind(this));

    const debouncedLayoutChange = debounce(() => {
      this.layoutService.emitLayoutChange(LayoutChangeTypes.menuSidebarChange);
    }, 100);

    this.authenticatedUser.accounts.each((account: IAuthenticatedUserAccount) => {
      account.playlists.on('add remove reset change', this.update.bind(this));
    });
    this.authenticatedUser.accounts.getAccountForProvider('auxapp').on('change:id', this.update.bind(this));

    this.zone.runOutsideAngular(() => {
      this.shrinkingSidebar.nativeElement.addEventListener('transitionend', debouncedLayoutChange);
    });
  }
}
