import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {CloudPlayerLogoService} from '../../services/cloud-player-logo.service';
import {ToastService} from '../../services/toast';
import {Toasts} from '../../collections/toasts';
import {ToastModel} from '../../models/toast';

@Component({
  selector: 'app-toasts',
  styleUrls: ['./toasts.scss'],
  templateUrl: './toasts.html',
})
export class ToastsComponent implements OnInit {
  public toasts: Toasts<ToastModel>;

  constructor(private toastService: ToastService) {

  }

  ngOnInit(): void {
    this.toasts = this.toastService.getToasts();
  }
}
