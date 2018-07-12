import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {IPlaylist} from '../../../api/playlists/playlist.interface';
import {AuthenticatedUserPlaylistAuxappModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-auxapp.model';
import {AuthenticatedUserPlaylistSoundcloudModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-soundcloud.model';
import {AuthenticatedUserPlaylistYoutubeModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-youtube.model';
import {IAccount} from '../../../api/account/account.interface';
import {IModalComponent, IModalOptions} from '../../../shared/src/modal.interface';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-authenticated-user-playlist-form-view',
  styleUrls: ['./authenticated-user-playlist-form.scss'],
  templateUrl: './authenticated-user-playlist-form.html'
})
export class AuthenticatedUserPlaylistFormComponent implements IModalComponent, OnInit, OnChanges, OnDestroy {
  public modalOptions: IModalOptions;

  @Input()
  public playlist: IPlaylist;

  @Input()
  public account: IAccount;

  @Output()
  public save: EventEmitter<IPlaylist>;

  @Output()
  public cancel: EventEmitter<IPlaylist>;

  @ViewChild('playlistForm')
  public form: NgForm;

  constructor() {
    this.save = new EventEmitter<IPlaylist>();
    this.cancel = new EventEmitter<IPlaylist>();
    this.modalOptions = {
      title: 'Create a playlist',
      dismissible: true,
      primaryAction: {
        text: 'Create playlist',
        action: this.savePlaylist.bind(this),
        isDisabled: () => {
          return this.form && this.form.invalid;
        }
      },
      secondaryAction: {
        text: 'Cancel'
      }
    };
  }

  public setPlaylistFromProvider(provider: string) {
    switch (provider) {
      case 'auxapp':
        this.playlist = new AuthenticatedUserPlaylistAuxappModel();
        break;
      case 'soundcloud':
        this.playlist = new AuthenticatedUserPlaylistSoundcloudModel();
        break;
      case 'youtube':
        this.playlist = new AuthenticatedUserPlaylistYoutubeModel();
        break;
    }

    // if (playlistId) {
    //   if (this.account.playlists.get(playlistId)) {
    //     this.playlist = <IPlaylist>this.account.playlists.get(playlistId);
    //   } else {
    //     this.playlist.set('id', playlistId);
    //     this.playlist.fetch();
    //   }
    // }
  }

  savePlaylist() {
    this.playlist.save().then(() => {
      this.account.playlists.add(this.playlist);
      this.save.emit(this.playlist);
    });
  }

  cancelForm() {
    this.cancel.emit(this.playlist);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
  }
}
