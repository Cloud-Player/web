import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert-box',
  styleUrls: ['./alert-box.scss'],
  templateUrl: './alert-box.html'
})
export class AlertBoxComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public type: string;

  @Input()
  public icon: string;

  public typeIconMap = {
    warning: 'fa fa-exclamation-triangle',
    danger: 'fa fa-exclamation-triangle',
    info: 'fa fa-info-circle'
  };

  constructor(private el: ElementRef) {
  }

  public close() {
    this.el.nativeElement.remove()
  }

  ngOnInit(): void {
    if (this.type && !this.icon) {
      this.icon = this.typeIconMap[this.type];
    }
  }
}
