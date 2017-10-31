import {Directive, ElementRef, OnInit, Input, OnDestroy} from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appTimeAgo]'
})
export class TimeAgoDirective implements OnInit, OnDestroy {
  private interval: number;

  @Input()
  appTimeAgo: any;

  constructor(private el: ElementRef) {
  }

  setTime(dateVal: any): void {
    const date = new Date(dateVal);
    this.el.nativeElement.textContent = (moment(date).fromNow());
  }

  ngOnInit(): void {
    this.setTime(this.appTimeAgo);
    // this.interval = window.setInterval(()=>{
    //   this.setTime(this.timeAgo);
    // }, 1000 * 60 * 2);
  }

  ngOnDestroy(): void {
    // if(this.interval){
    //   clearInterval(this.interval);
    // }
  }

}
