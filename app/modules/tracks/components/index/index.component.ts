import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Track} from '../../models/track.model';
import {Tracks} from '../../collections/tracks.collection';

@Component({
    moduleId: module.id,
    selector: 'my-tracks',
    templateUrl: 'index.template.html',
    styleUrls: ['index.style.scss'],
    providers: [Tracks]
})
export class TracksIndexComponent implements OnInit {
    title = 'My Tracks';
    selectedTrack: Track;

    constructor(private tracks: Tracks, private router: Router) {}

    ngOnInit(): void {
        this.tracks.fetch();
    }

    onSelect(track: Track): void {
        this.selectedTrack = track;
    }

    gotoDetail(): void {
        this.router.navigate(['/tracks', this.selectedTrack.id]);
    }

    add(name: string): void {
        this.tracks.create({name: name});
    }
}
