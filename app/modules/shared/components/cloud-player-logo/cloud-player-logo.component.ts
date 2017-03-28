import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {CloudPlayerLogoService} from '../../services/cloud-player-logo.service';

@Component({
  selector: 'cloud-player-logo',
  styles: [require('./cloud-player-logo.style.scss')],
  template: require('./cloud-player-logo.template.html'),
})

export class CloudPlayerLogoComponent implements OnInit {

  @ViewChild('svgObject') svgObject: ElementRef;
  private mainAnimation: Array<SVGSVGElement>;
  private iconAnimationToPlay: any;
  private iconAnimationToPause: any;

  constructor(private cloudPlayerLogoService: CloudPlayerLogoService) {
    cloudPlayerLogoService.logoState$.subscribe((status: string) => {
      if (status === 'PAUSE') {
        this.pause();
      } else if (status === 'PLAY') {
        this.play();
      }
    });
  }

  ngOnInit(): void {
    this.svgObject.nativeElement.addEventListener('load', () => {
      let svgObj = <HTMLObjectElement>this.svgObject.nativeElement;
      let content = <any>svgObj.contentDocument;
      this.mainAnimation = content.querySelectorAll('.main-animation');
      this.iconAnimationToPlay = content.querySelectorAll('.icon-animation-to-play');
      this.iconAnimationToPause = content.querySelectorAll('.icon-animation-to-pause');
    }, false);
  }

  play(): void {
    if (this.mainAnimation) {
      this.mainAnimation.forEach((el: any)=>{
        el.beginElement(el.getCurrentTime());
      });
      this.iconAnimationToPause.forEach((el: any)=>{
        el.beginElement();
      });

    }
  }

  pause(): void {
    if (this.mainAnimation) {
      this.mainAnimation.forEach((el: any)=>{
        el.endElement();
      });
      this.iconAnimationToPlay.forEach((el: any)=>{
        el.beginElement();
      });
    }
  }
}
