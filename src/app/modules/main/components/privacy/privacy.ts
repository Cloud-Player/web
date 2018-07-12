import {Component} from '@angular/core';
import {IModalComponent, IModalOptions} from '../../../shared/src/modal.interface';
import {PrivacyManager} from '../../services/privacy-manager';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.scss']
})
export class PrivacyComponent implements IModalComponent {
  modalOptions: IModalOptions = {
    dismissible: true,
    title: this.getTitle()
  };

  public isModal = false;

  constructor(private privacyManager: PrivacyManager) {
  }

  public setModal() {
    this.isModal = true;
  }

  public getTitle() {
    if (this.isGerman()) {
      return 'Datenschutzerklärung';
    } else {
      return 'Privacy Statement';
    }
  }

  public isGerman() {
    return navigator.language.match(/de/i);
  }

  public getMail(): string {
    return atob('aGVsbG9AY2xvdWQtcGxheWVyLmlv');
  }

  public disableTracking(): void {
    this.privacyManager.getPrivacySettings().then((settings) => {
      settings.allowTracking = false;
      this.privacyManager.save();
    });
  }
}
