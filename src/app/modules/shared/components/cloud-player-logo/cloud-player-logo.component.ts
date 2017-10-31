import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {CloudPlayerLogoService} from '../../services/cloud-player-logo.service';

@Component({
  selector: 'app-cloud-player-logo',
  styleUrls: ['./cloud-player-logo.style.scss'],
  templateUrl: './cloud-player-logo.template.html',
})

export class CloudPlayerLogoComponent implements OnInit {

  @Input()
  public animate = false;

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
      const svgObj = <HTMLObjectElement>this.svgObject.nativeElement;
      const content = <any>svgObj.contentDocument;
      this.mainAnimation = content.querySelectorAll('.main-animation');
      this.iconAnimationToPlay = content.querySelectorAll('.icon-animation-to-play');
      this.iconAnimationToPause = content.querySelectorAll('.icon-animation-to-pause');
    }, false);
  }

  play(): void {
    if (this.mainAnimation && this.animate) {
      this.mainAnimation.forEach((el: any) => {
        el.beginElement(el.getCurrentTime());
      });
      this.iconAnimationToPause.forEach((el: any) => {
        el.beginElement();
      });

    }
  }

  pause(): void {
    if (this.mainAnimation && this.animate) {
      this.mainAnimation.forEach((el: any) => {
        el.endElement();
      });
      this.iconAnimationToPlay.forEach((el: any) => {
        el.beginElement();
      });
    }
  }
}
