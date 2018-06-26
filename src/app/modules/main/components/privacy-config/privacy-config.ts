import {Component, Injectable, OnInit} from '@angular/core';
import {ModalComponent} from '../../../shared/components/modal/modal/modal';
import {Modal, ModalStates} from '../../../shared/src/modal-factory.class';
import {IModal, IModalComponent, IModalOptions} from '../../../shared/src/modal.interface';
import {PrivacyComponent} from '../privacy/privacy';
import {ModalService} from '../../../shared/services/modal';
import {IPrivacySettings} from '../main/main.component';
import * as localforage from 'localforage';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {PrivacyManager} from '../../services/privacy-manager';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-privacy-config',
  templateUrl: './privacy-config.html',
  styleUrls: ['./privacy-config.scss']
})
export class PrivacyConfigComponent implements IModalComponent, OnInit {
  modalOptions: IModalOptions = {
    title: 'Privacy Notice',
    dismissible: false,
    primaryAction: {
      text: 'Save and continue',
      action: () => {
        this.privacyManger.save();
      }
    }
    // secondaryAction: {
    //   text: 'Delete my account'
    // }
  };
  public idCookieIsRequired = true;
  public privacySettings: IPrivacySettings;

  constructor(private modalService: ModalService, private privacyManger: PrivacyManager) {
  }

  public openPrivacyStatement() {
    this.modalService.createModalAsync(PrivacyComponent).then((modal) => {
      modal.open();
    });
  }


  modalOnOpen(): void {
    this.setIdCookieIsRequired();
  }

  public ngOnInit(): void {
    this.privacyManger.getPrivacySettings().then((settings) => {
      this.privacySettings = settings;
    });
  }

  public setIdCookieIsRequired(): void {
    if (AuthenticatedUserModel.getInstance().accounts.getAccountForProvider('cloudplayer').isConnected()) {
      this.idCookieIsRequired = true;
    }
  }
}

@Injectable()
export class PrivacyConfigModalOpener {
  constructor(private modalService: ModalService) {
  }

  open(): void {
    this.modalService.createModalAsync(PrivacyConfigComponent).then((modal) => {
      modal.open();
      modal.getObservable()
        .pipe(filter(ev => ev === ModalStates.Closed))
        .subscribe(modal.destroy.bind(modal));
    });
  }
}
