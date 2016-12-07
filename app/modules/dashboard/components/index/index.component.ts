import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'index.template.html',
    styleUrls: ['index.style.css'],
    providers: [Tracks]
})

export class DashboardIndexComponent implements OnInit {
    constructor(private tracks: Tracks, private router: Router) {
    }

    ngOnInit(): void {
        this.tracks.fetch();
    }

    gotoDetail(track: Track): void {
        let link = ['/tracks', track.id];
        this.router.navigate(link);
    }
}
