import {Component, ElementRef, OnInit} from '@angular/core';
import {ClientDetector, OsNames, Result, ClientNames} from '../../../shared/services/client-detector.service';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {AccountCloudplayerModel} from '../../../api/account/account-cloudplayer.model';
import {AuthenticatedUserAccountCloudplayerModel} from '../../../api/authenticated-user/account/authenticated-user-account-cloudplayer.model';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {Globals} from '../../../../../globals';
import {AuthenticatedUserAccountSoundcloudModel} from '../../../api/authenticated-user/account/authenticated-user-account-soundcloud.model';
import {AccountSoundcloudModel} from '../../../api/account/account-soundcloud.model';
import {AuthenticatedUserAccountYoutubeModel} from '../../../api/authenticated-user/account/authenticated-user-account-youtube.model';
import {IAccount} from '../../../api/account/account.interface';
import {findWhere} from 'underscore';
import {AuthenticatedUserPlaylistCloudplayerModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-cloudplayer.model';
import {AuthenticatedUserPlaylistYoutubeModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-youtube.model';
import {AuthenticatedUserPlaylistSoundcloudModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-soundcloud.model';
import {DragAndDropService, DragAndDropStates, IDragAndDropData} from '../../../shared/services/drag-and-drop';
import {ITrack} from '../../../api/tracks/track.interface';
import {TrackSoundcloudModel} from '../../../api/tracks/track-soundcloud.model';
import {TrackYoutubeModel} from '../../../api/tracks/track-youtube.model';
import {IPlaylist} from '../../../api/playlists/playlist.interface';

const packageJSON = require('../../../../../../package.json');

@Component({
  selector: 'app-nav-sidebar',
  styleUrls: ['./nav.style.scss'],
  templateUrl: './nav.template.html'
})

export class NavComponent implements OnInit {
  public availableProviderMap = {
    cloudplayer: {
      providerId: 'cloudplayer',
      title: 'Cloud Player',
      icon: 'fa fa-play-circle',
      accountModel: AuthenticatedUserAccountCloudplayerModel,
      tmpPlaylistModel: new AuthenticatedUserPlaylistCloudplayerModel(),
      playlistCollapsed: null,
      playlistCollapsedBeforeDragVal: null
    },
    soundcloud: {
      providerId: 'soundcloud',
      title: 'SoundCloud',
      icon: 'fa fa-soundcloud',
      accountModel: AuthenticatedUserAccountSoundcloudModel,
      tmpPlaylistModel: new AuthenticatedUserPlaylistSoundcloudModel(),
      playlistCollapsed: null,
      playlistCollapsedBeforeDragVal: null
    },
    youtube: {
      providerId: 'youtube',
      title: 'YouTube',
      icon: 'fa fa-youtube-play',
      accountModel: AuthenticatedUserAccountYoutubeModel,
      tmpPlaylistModel: new AuthenticatedUserPlaylistYoutubeModel(),
      playlistCollapsed: null,
      playlistCollapsedBeforeDragVal: null
    }
  };

  public authenticatedUser: AuthenticatedUserModel;
  public cloudPlayerAccount: AuthenticatedUserAccountCloudplayerModel;
  public version = packageJSON.version;

  constructor(private dragAndDropService: DragAndDropService, private el: ElementRef) {
    this.authenticatedUser = AuthenticatedUserModel.getInstance();
    this.cloudPlayerAccount = <AuthenticatedUserAccountCloudplayerModel>this.getAccountForProvider('cloudplayer');
  }

  private getAccountForProvider(provider: string) {
    return this.authenticatedUser.accounts.find((item) => {
      return item.provider === provider;
    });
  }

  private prepareUserAccounts() {
    this.authenticatedUser.accounts.each((account) => {
      if (account.provider !== 'cloudplayer' && !account.isNew()) {
        account.fetch();
      }
      if (!account.isNew() /*&& account.playlists.length === 0*/) {
        account.playlists.fetch();
      }
    });
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
    // this.userAnalyticsService.trackEvent('sc_auth_start', 'click', 'auth-service');
    const popup = window.open(account.loginUrl);
    const interval = window.setInterval(() => {
      if (!popup) {
        clearInterval(interval);
      } else if (popup.closed) {
        clearInterval(interval);
        this.authenticatedUser.fetch();
      }
    }, 100);
  }

  public saveTmpPlaylist(account) {
    const accMapValue = this.availableProviderMap[account.provider];
    if (accMapValue) {
      if (accMapValue.tmpPlaylistModel instanceof AuthenticatedUserPlaylistCloudplayerModel) {
        accMapValue.tmpPlaylistModel.accountId = this.authenticatedUser.id;
      }
      account.playlists.create(accMapValue.tmpPlaylistModel.clone());
      accMapValue.tmpPlaylistModel.clear();
    }
  }

  public drop(dragAndDrop: IDragAndDropData) {
    const track = <ITrack>dragAndDrop.dragData;
    const playlist = <IPlaylist>dragAndDrop.dropReference;
    if (track && playlist) {
      const playlistItem = playlist.items.add({track: track});
      playlistItem.save();
    }
  }

  public dragStart() {
    const dragData = this.dragAndDropService.getDragData().dragData;
    switch (dragData.constructor) {
      case TrackSoundcloudModel:
        this.availableProviderMap.cloudplayer.playlistCollapsedBeforeDragVal = !!this.availableProviderMap.cloudplayer.playlistCollapsed;
        this.availableProviderMap.cloudplayer.playlistCollapsed = false;

        this.availableProviderMap.soundcloud.playlistCollapsedBeforeDragVal = !!this.availableProviderMap.soundcloud.playlistCollapsed;
        this.availableProviderMap.soundcloud.playlistCollapsed = false;

        this.availableProviderMap.youtube.playlistCollapsedBeforeDragVal = !!this.availableProviderMap.youtube.playlistCollapsed;
        this.availableProviderMap.youtube.playlistCollapsed = true;
        break;
      case TrackYoutubeModel:
        this.availableProviderMap.cloudplayer.playlistCollapsedBeforeDragVal = !!this.availableProviderMap.cloudplayer.playlistCollapsed;
        this.availableProviderMap.cloudplayer.playlistCollapsed = false;

        this.availableProviderMap.soundcloud.playlistCollapsedBeforeDragVal = !!this.availableProviderMap.soundcloud.playlistCollapsed;
        this.availableProviderMap.soundcloud.playlistCollapsed = true;

        this.availableProviderMap.youtube.playlistCollapsedBeforeDragVal = !!this.availableProviderMap.youtube.playlistCollapsed;
        this.availableProviderMap.youtube.playlistCollapsed = false;
        break;
    }
    this.el.nativeElement.classList.add('open');
  }

  public dragEnd() {
    this.availableProviderMap.cloudplayer.playlistCollapsed = this.availableProviderMap.cloudplayer.playlistCollapsedBeforeDragVal;
    this.availableProviderMap.soundcloud.playlistCollapsed = this.availableProviderMap.soundcloud.playlistCollapsedBeforeDragVal;
    this.availableProviderMap.youtube.playlistCollapsed = this.availableProviderMap.youtube.playlistCollapsedBeforeDragVal;
    this.el.nativeElement.classList.remove('open');
  }

  ngOnInit(): void {
    this.authenticatedUser.accounts.each((account: IAuthenticatedUserAccount) => {
      account.on('change:id', () => {
        account.playlists.fetch();
      });
    });
    this.authenticatedUser.fetch();
    this.dragAndDropService.getObservable()
      .filter(dragAndDropState => dragAndDropState === DragAndDropStates.DragStart)
      .subscribe(this.dragStart.bind(this));
    this.dragAndDropService.getObservable()
      .filter(dragAndDropState => dragAndDropState === DragAndDropStates.DragEnd)
      .subscribe(this.dragEnd.bind(this));
  }
}