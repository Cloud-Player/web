import {Directive, ElementRef, Renderer, OnInit, Input, SimpleChanges, OnDestroy} from '@angular/core';
import moment = require('moment');
import {TimeInterval} from 'rxjs';
import Timer = NodeJS.Timer;

@Directive({
  selector: '[timeAgo]'
})
export class TimeAgoDirective implements OnInit, OnDestroy{
  private interval: Timer;

  @Input()
  timeAgo: any;

  constructor(private el: ElementRef) {
  }

  setTime(dateVal: any): void{
    let date = new Date(dateVal);
    this.el.nativeElement.textContent = (moment(date).fromNow());
  }

  ngOnInit(): void {
    this.setTime(this.timeAgo);
    // this.interval = setInterval(()=>{
    //   this.setTime(this.timeAgo);
    // }, 1000 * 60 * 2);
  }

  ngOnDestroy(): void {
    // if(this.interval){
    //   clearInterval(this.interval);
    // }
  }

}
