import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'soundcloud-callback',
  templateUrl: 'soundcloud_callback.template.html',
  styleUrls: ['soundcloud_callback.style.css']
})
export class SoundcloudCallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  };

  ngOnInit(): void {
    this.route.queryParams.forEach((params: Params) => {
      debugger;
    });
  };
}
