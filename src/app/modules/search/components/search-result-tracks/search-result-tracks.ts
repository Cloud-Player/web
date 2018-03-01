import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PlayQueue} from '../../../player/collections/play-queue';
import {PlayQueueItem} from '../../../player/models/play-queue-item';
import {ClientDetector} from '../../../shared/services/client-detector.service';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';
import {ITracks} from '../../../api/tracks/tracks.interface';
import {ITrack} from '../../../api/tracks/track.interface';
import {AuthenticatedUserPlaylistSelectorModalComponent} from '../../../authenticated-user/components/authenticated-user-playlist-selector-modal/authenticated-user-playlist-selector-modal';
import {Modal, ModalService} from '../../../shared/services/modal';

@Component({
  selector: 'app-search-result-tracks',
  styleUrls: ['./search-result-tracks.scss'],
  templateUrl: './search-result-tracks.html'
})
export class SearchResultTracksComponent implements OnInit, OnDestroy {
  private _playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();
  private _playlistSelectorModal: Modal<AuthenticatedUserPlaylistSelectorModalComponent>;

  public showFilter = false;

  @Input()
  public tracks: ITracks<ITrack>;

  @Input()
  public canBeDeleted: boolean;

  constructor(private modalService: ModalService) {
  }

  public toggleFilter() {
    this.showFilter = !this.showFilter;
    if (!this.showFilter) {
      this.tracks.trigger('reset:filter');
    }
  }

  public addToQueue(track: ITrack) {
    this._playQueue.queue({track: track});
  }

  public getSize() {
    if (ClientDetector.isMobileDevice()) {
      return ImageSizes.Small;
    } else {
      return ImageSizes.Medium;
    }
  }

  public openModal(track: ITrack) {
    this._playlistSelectorModal.getInstance().track = track;
    this._playlistSelectorModal.open();
  }

  ngOnInit() {
    this._playlistSelectorModal = this.modalService.createModal(AuthenticatedUserPlaylistSelectorModalComponent);
  }

  ngOnDestroy() {
    this._playlistSelectorModal.destroy();
  }
}
