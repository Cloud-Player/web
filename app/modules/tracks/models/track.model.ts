import {Injectable} from '@angular/core';
import {BaseModel} from '../../backbone/models/backbone.model';

@Injectable()
export class Track extends BaseModel {
    urlRoot = '//api.soundcloud.com/tracks';

    defaults() {
        return {
            name: ''
        };
    }

    validate(attrs: any) {
        attrs.name = attrs.name.trim();
        if (!attrs.name) {
            return 'Name is required';
        }
    }

    getResourceUrl(): string {
        console.log(this.get('stream_url'));
        return `${this.get('stream_url')}?client_id=abb6c1cad3f409112a5995bf922e1d1e`;
    }
}
