import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Session} from '../../models/session.model';
import {AuthenticatedUserPlaylist} from '../../models/authenticated_user_playlist.model';

@Component({
  selector: 'user-play-list-view',
  template: require('./user-playlist-view.template.html'),
  styles: [require('./user-playlist-view.style.scss')]
})

export class UserPlayListViewComponent implements OnInit {
  playlist: AuthenticatedUserPlaylist = new AuthenticatedUserPlaylist();
  session = Session.getInstance();

  public isInEditMode: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  private fetchPlaylist() {
    if (this.session.isValid() && this.playlist.id) {
      this.playlist.fetch();
    }
  }

  public cancel(): void{
    this.playlist.fetch();
    this.isInEditMode = false;
  }

  public save(): void{
    this.playlist.save().then(()=>{
      this.isInEditMode = false;
    });
  }

  public destroy(): void{
    let userPlaylists = this.session.get('user').get('playlists');
    let indexOfPlaylist = userPlaylists.indexOf(this.playlist);
    let otherPlaylistId: number;


    this.playlist.destroy().then(()=>{
      if(userPlaylists.at(indexOfPlaylist)){
        otherPlaylistId = userPlaylists.at(indexOfPlaylist).get('id');
      } else if(userPlaylists.at(indexOfPlaylist-1)){
        otherPlaylistId = userPlaylists.at(indexOfPlaylist-1).get('id');
      }

      if(otherPlaylistId){
        this.router.navigate(['../', otherPlaylistId], { relativeTo: this.route });
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit(): void {
    let userPlaylists = this.session.get('user').get('playlists');
    this.route.params.forEach((params: any) => {
      if(userPlaylists.get(params.id)){
        this.playlist = this.session.get('user').get('playlists').get(params.id);
      } else {
        this.playlist.clear();
        this.playlist.set({id: params.id});
        this.fetchPlaylist();
      }

      userPlaylists.on('update', ()=>{
        if(userPlaylists.get(params.id)){
          this.playlist = userPlaylists.get(params.id);
        }
      });
    });

    this.session.get('user').on('change:authenticated', this.fetchPlaylist(), this);
  }

}
