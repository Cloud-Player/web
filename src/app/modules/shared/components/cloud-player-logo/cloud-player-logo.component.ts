import {Component, OnInit, ViewChild, ElementRef, Input, Renderer2, OnDestroy, NgZone} from '@angular/core';
import {CloudPlayerLogoService} from '../../services/cloud-player-logo.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-cloud-player-logo',
  styleUrls: ['./cloud-player-logo.style.scss'],
  templateUrl: './cloud-player-logo.template.html'
})

export class CloudPlayerLogoComponent implements OnInit, OnDestroy {

  @Input()
  public animate = false;

  @ViewChild('svgObject') svgObject: ElementRef;
  private mainAnimation: Array<SVGSVGElement>;
  private iconAnimationToPlay: any;
  private iconAnimationToPause: any;
  private isPlaying = false;
  private subscriptions: Subscription;

  constructor(private renderer2: Renderer2,
              private zone: NgZone,
              private cloudPlayerLogoService: CloudPlayerLogoService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.cloudPlayerLogoService.logoState$.subscribe((status: string) => {
        if (status === 'PAUSE') {
          this.pause();
        } else if (status === 'PLAY') {
          this.play();
        }
      });

      let subscription: Subscription;
      const listener = this.renderer2.listen(this.svgObject.nativeElement, 'load', () => {
        const svgObj = <HTMLObjectElement>this.svgObject.nativeElement;
        const content = <any>svgObj.contentDocument;
        this.mainAnimation = content.querySelectorAll('.main-animation');
        this.iconAnimationToPlay = content.querySelectorAll('.icon-animation-to-play');
        this.iconAnimationToPause = content.querySelectorAll('.icon-animation-to-pause');
        this.subscriptions.remove(subscription);
      });
      subscription = this.subscriptions.add(listener);
    });
  }

  play(): void {
    if (this.mainAnimation && this.animate && !this.isPlaying) {
      this.mainAnimation.forEach((el: any) => {
        el.beginElement(el.getCurrentTime());
      });
      this.iconAnimationToPause.forEach((el: any) => {
        el.beginElement();
      });
      this.isPlaying = true;
    }
  }

  pause(): void {
    if (this.mainAnimation && this.animate && this.isPlaying) {
      this.mainAnimation.forEach((el: any) => {
        el.endElement();
      });
      this.iconAnimationToPlay.forEach((el: any) => {
        el.beginElement();
      });
      this.isPlaying = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
