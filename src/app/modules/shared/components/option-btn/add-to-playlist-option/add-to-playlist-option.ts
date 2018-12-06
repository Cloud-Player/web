import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ITrack} from '../../../../api/tracks/track.interface';
import {AuthenticatedUserPlaylistSelectorModalComponent} from '../../../../authenticated-user/components/authenticated-user-playlist-selector-modal/authenticated-user-playlist-selector-modal';
import {ModalService} from '../../../services/modal';
import {Modal} from '../../../src/modal-factory.class';

@Component({
  selector: 'app-add-to-playlist-option',
  styleUrls: ['./add-to-playlist-option.scss'],
  templateUrl: './add-to-playlist-option.html'
})
export class AddToPlaylistOptionComponent implements OnInit, OnDestroy {
  private _playlistSelectorModal: Modal<AuthenticatedUserPlaylistSelectorModalComponent>;
  @Input()
  public track: ITrack;

  constructor(private modalService: ModalService) {
  }

  public openAddToPlaylistModal() {
    this._playlistSelectorModal.getInstance().track = this.track;
    this._playlistSelectorModal.open();
  }

  public ngOnInit(): void {
    this._playlistSelectorModal = this.modalService.createModal(AuthenticatedUserPlaylistSelectorModalComponent);
  }

  public ngOnDestroy(): void {
    this._playlistSelectorModal.destroy();
  }
}
