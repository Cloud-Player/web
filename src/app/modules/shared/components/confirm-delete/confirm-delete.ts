import {Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {IModal, IModalComponent, IModalOptions} from '../../src/modal.interface';


@Component({
  selector: 'app-confirm-delete',
  styleUrls: ['./confirm-delete.scss'],
  templateUrl: './confirm-delete.html'
})

export class ConfirmDeleteComponent implements IModalComponent {
  modalOptions: IModalOptions = {
    title: () => {
      return 'Are you sure?';
    },
    dismissible: true,
    primaryAction: {
      text: 'Yes, delete it'
    },
    secondaryAction: {
      text: 'Cancel'
    }
  };

  @Input()
  public entityType: string;

  @Input()
  public name: string;
}
