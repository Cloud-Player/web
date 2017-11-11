import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Session} from '../../models/session.model';
import {AuthenticatedUserPlaylist} from '../../models/authenticated_user_playlist.model';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

@Component({
  selector: 'app-user-play-list-view',
  styleUrls: ['./user-playlist-view.style.scss'],
  templateUrl: './user-playlist-view.template.html'
})

export class UserPlayListViewComponent implements OnInit {
  playlist: AuthenticatedUserPlaylist = new AuthenticatedUserPlaylist();
  session = Session.getInstance();

  public isInEditMode = false;

  constructor(private route: ActivatedRoute, private router: Router, private userAnalyticsService: UserAnalyticsService) {
  }

  private fetchPlaylist() {
    if (this.session.isValid() && this.playlist.id) {
      this.playlist.fetch();
    }
  }

  public cancel(): void {
    this.playlist.fetch();
    this.isInEditMode = false;
  }

  public save(): void {
    this.userAnalyticsService.trackEvent('saved_playlist', 'click', 'user-playlist-cmp');
    this.playlist.save().then(() => {
      this.isInEditMode = false;
    });
  }

  public destroy(): void {
    this.userAnalyticsService.trackEvent('destroyed_playlist', 'click', 'user-playlist-cmp');
    const userPlaylists = this.session.user.playlists;
    const indexOfPlaylist = userPlaylists.indexOf(this.playlist);
    let otherPlaylistId: number;


    this.playlist.destroy().then(() => {
      if (userPlaylists.at(indexOfPlaylist)) {
        otherPlaylistId = userPlaylists.at(indexOfPlaylist).id;
      } else if (userPlaylists.at(indexOfPlaylist - 1)) {
        otherPlaylistId = userPlaylists.at(indexOfPlaylist - 1).id;
      }

      if (otherPlaylistId) {
        this.router.navigate(['../', otherPlaylistId], {relativeTo: this.route});
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit(): void {
    const userPlaylists = this.session.user.playlists;
    this.route.params.forEach((params: any) => {
      if (userPlaylists.get(params.id)) {
        this.playlist = this.session.user.playlists.get(params.id);
      } else {
        this.playlist.clear();
        this.playlist.set({id: params.id});
        this.fetchPlaylist();
      }

      userPlaylists.on('update', () => {
        if (userPlaylists.get(params.id)) {
          this.playlist = userPlaylists.get(params.id);
        }
      });
    });

    this.session.user.on('change:authenticated', this.fetchPlaylist, this);
  }

}
