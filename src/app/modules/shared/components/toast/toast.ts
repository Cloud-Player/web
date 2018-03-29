import {Component, Input} from '@angular/core';
import {ToastModel} from '../../models/toast';
import {ToastTypes} from '../../src/toast-types.enum';
import {ToastService} from '../../services/toast';

@Component({
  selector: 'app-toast',
  styleUrls: ['./toast.scss'],
  templateUrl: './toast.html'
})
export class ToastComponent {
  @Input()
  public toast: ToastModel;

  constructor(private toastService: ToastService) {

  }

  public closeToast() {
    this.toastService.removeToast(this.toast);
  }

  public executeButtonAction() {
    if (typeof this.toast.buttonAction === 'function') {
      this.toast.buttonAction();
    }
  }

  public getIcon(): string {
    if (this.toast.icon) {
      return this.toast.icon;
    } else {
      switch (this.toast.type) {
        case ToastTypes.DefaultToast:
        case ToastTypes.Info:
          return 'fa fa-info-circle';
      }
    }
  }
}
