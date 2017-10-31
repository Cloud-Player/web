import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CloudPlayerLogoService {
  // Observable string sources
  private logoStateSource = new Subject<string>();

  // Observable string streams
  logoState$ = this.logoStateSource.asObservable();

  // Service message commands
  play() {
    this.logoStateSource.next('PLAY');
  }

  pause() {
    this.logoStateSource.next('PAUSE');
  }
}
