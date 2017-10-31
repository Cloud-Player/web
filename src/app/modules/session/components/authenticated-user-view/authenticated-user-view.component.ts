import {Component} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'authenticated-user-view',
  template: require('./authenticated-user-view.template.html'),
  styles: [require('./authenticated-user-view.style.scss')]
})
export class AuthenticatedUserViewComponent {
  constructor(private authService: AuthService){

  }
  disconnect(): void{
    this.authService.disconnect();
  }
}
