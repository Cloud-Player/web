import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Session} from '../../models/session.model';
import {User} from '../../../users/models/user.model';

@Component({
  moduleId: module.id,
  selector: 'soundcloud-callback',
  templateUrl: 'soundcloud_callback.template.html',
  styleUrls: ['soundcloud_callback.style.css']
})
export class SoundcloudCallbackComponent implements OnInit {
  private session = Session.getInstance();

  constructor(private route: ActivatedRoute) {

  };

  ngOnInit(): void {
    this.session.get('user').on('change:authenticated', (user: User) => {
      user.fetch().then(() => {
        console.log(user);
      });
    });

    this.route.queryParams.forEach((params: Params) => {
      this.session.set({
        access_token: params.access_token,
        expires_in: params.expires_in,
        refresh_token: params.refresh_token
      });
    });
  };
}
