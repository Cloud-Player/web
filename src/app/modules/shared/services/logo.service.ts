import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class LogoService {
  // Observable string sources
  private logoStateSource = new Subject<string>();

  // Observable string streams
  logoState$ = this.logoStateSource.asObservable();

  public logoState = 'PAUSE';

  // Service message commands
  play() {
    if (this.logoState !== 'PLAY') {
      this.logoState = 'PLAY';
      this.logoStateSource.next(this.logoState);
    }
  }

  pause() {
    if (this.logoState !== 'PAUSE') {
      this.logoState = 'PAUSE';
      this.logoStateSource.next(this.logoState);
    }
  }
}
