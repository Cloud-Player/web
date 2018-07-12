import {Component, ViewChild} from '@angular/core';
import {IModal, IModalComponent, IModalOptions} from '../../../shared/src/modal.interface';
import * as localforage from 'localforage';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-privacy-config',
  templateUrl: './delete-account.html',
  styleUrls: ['./delete-account.scss']
})
export class DeleteAccountComponent implements IModalComponent {
  private _modal: IModal;
  modalOptions: IModalOptions = {
    title: 'Are you sure you want to delete your account?',
    dismissible: false,
    primaryAction: {
      text: 'Delete',
      isDisabled: () => {
        return this.form.invalid || this.confirmation !== this.confirmationText;
      },
      action: () => {
        return new Promise(() => {
          AuthenticatedUserModel.getInstance().destroy().then(() => {
            this.closePage();
          });
        });
      }
    },
    secondaryAction: {
      text: 'Cancel'
    }
  };

  @ViewChild('form')
  public form: NgForm;

  public confirmation: string;

  public confirmationText = 'DELETE ACCOUNT';

  public isDeleted = false;

  public closePage() {
    this.isDeleted = true;
    const body = document.querySelectorAll('body')[0];
    const main = <HTMLElement>document.querySelectorAll('main')[0];
    body.style.transition = 'background 2s ease';
    body.style.background = 'black';
    main.style.transition = 'opacity 2s ease';
    main.style.opacity = '0';
    this.modalOptions.primaryAction = null;
    this.modalOptions.secondaryAction = null;
    this.modalOptions.title = 'Good bye! It was nice to meet you';
    localforage.clear();
  }
}
