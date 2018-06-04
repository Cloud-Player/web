import {Component, ElementRef, OnInit} from '@angular/core';
import {ToastService} from '../../services/toast';
import {Toasts} from '../../collections/toasts';
import {ToastModel} from '../../models/toast';
import {LayoutChangeTypes, LayoutService, WindowElementTypes} from '../../services/layout';
import {animate, style, transition, trigger} from '@angular/animations';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-toasts',
  styleUrls: ['./toasts.scss'],
  templateUrl: './toasts.html',
  animations: [
    trigger('toastAnimation', [
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate('0.4s 0.1s ease-in-out', style({transform: 'translateX(0)'}))
      ]),
      transition('* => void', [
        animate('0.3s 0.1s ease-out', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ToastsComponent implements OnInit {
  public toasts: Toasts<ToastModel>;

  constructor(private el: ElementRef, private toastService: ToastService, private layoutService: LayoutService) {

  }

  ngOnInit(): void {
    this.toasts = this.toastService.getToasts();
    this.layoutService.getObservable()
      .pipe(
        filter(ev => ev.changeType === LayoutChangeTypes.windowElementChange)
      )
      .subscribe((ev) => {
        if (this.layoutService.hasWindowElement(WindowElementTypes.MusicPlayer)) {
          this.el.nativeElement.classList.add('music-player-active');
        } else {
          this.el.nativeElement.classList.remove('music-player-active');
        }
      });
  }
}
