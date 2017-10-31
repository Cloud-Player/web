import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  styleUrls: ['./loading-spinner.style.scss'],
  templateUrl: './loading-spinner.template.html'
})
export class LoadingSpinnerComponent {
  @Input()
  public isLoading = true;

  @Input()
  public isIdle = true;
}
