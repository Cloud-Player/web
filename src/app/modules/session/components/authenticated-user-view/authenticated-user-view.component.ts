import {Component} from '@angular/core';

@Component({
  selector: 'app-authenticated-user-view',
  styleUrls: ['./authenticated-user-view.style.scss'],
  templateUrl: './authenticated-user-view.template.html'
})
export class AuthenticatedUserViewComponent {
  constructor() {

  }

  disconnect(): void {
    // this.authService.disconnect();
  }
}
