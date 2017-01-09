import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Session} from '../../models/session.model';
@Component({
  selector: 'soundcloud-callback',
  templateUrl: 'soundcloud_callback.template.html',
  styleUrls: ['soundcloud_callback.style.scss']
})
export class SoundcloudCallbackComponent implements OnInit {
  private session = Session.getInstance();

  constructor(private route: ActivatedRoute, private router: Router) {

  };

  ngOnInit(): void {
    this.session.get('user').on('change:authenticated', () => {
      this.router.navigate(['/']);
    });

    this.route.queryParams.forEach((params: any) => {
      this.session.set({
        access_token: params.access_token,
        expires_on: params.expires_on,
        refresh_token: params.refresh_token
      });
    });
  };
}
