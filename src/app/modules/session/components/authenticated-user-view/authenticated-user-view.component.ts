import {Component} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-authenticated-user-view',
  styleUrls: ['./authenticated-user-view.style.scss'],
  templateUrl: './authenticated-user-view.template.html'
})
export class AuthenticatedUserViewComponent {
  constructor(private authService: AuthService) {

  }

  disconnect(): void {
    this.authService.disconnect();
  }
}
