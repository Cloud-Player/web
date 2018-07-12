import {AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {LogoService} from '../../services/logo.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cloud-player-logo',
  styleUrls: ['./cloud-player-logo.style.scss'],
  templateUrl: './cloud-player-logo.template.html'
})
export class LogoComponent implements AfterViewInit, OnDestroy {

  private _iconAnimationToPlay: any;
  private _iconAnimationToPause: any;
  private _subscriptions: Subscription;
  private _animatableObjects: Array<HTMLElement>;
  private _isInit = false;

  @Input()
  public animate = false;

  @ViewChild('playPause')
  public playPause: ElementRef;

  constructor(private el: ElementRef,
              private renderer2: Renderer2,
              private zone: NgZone,
              private auxappLogoService: LogoService) {
    this._subscriptions = new Subscription();
  }

  private init() {
    const playPauseSvg = this.playPause.nativeElement.contentDocument;
    this._iconAnimationToPlay = playPauseSvg.querySelectorAll('.icon-animation-to-play');
    this._iconAnimationToPause = playPauseSvg.querySelectorAll('.icon-animation-to-pause');
    if (this.auxappLogoService.logoState === 'PLAY') {
      this.play();
    } else {
      this.pause();
    }
  }

  play(): void {
    if (this._iconAnimationToPlay && this.animate) {
      this._iconAnimationToPlay.forEach((el: any) => {
        el.beginElement();
      });
    }

    this._animatableObjects.forEach((obj: HTMLElement) => {
      obj.style.animationPlayState = 'running';
    });
  }

  pause(): void {
    if (this._iconAnimationToPause && this.animate) {
      this._iconAnimationToPause.forEach((el: any) => {
        el.beginElement();
      });
    }

    this._animatableObjects.forEach((obj: HTMLElement) => {
      obj.style.animationPlayState = 'paused';
    });
  }

  ngAfterViewInit() {
    this._animatableObjects = this.el.nativeElement.querySelectorAll('.animatable');
    const svgObjects = this.el.nativeElement.querySelectorAll('object');
    let loadedSvgObjects = 0;
    svgObjects.forEach((svgObject) => {
      this._subscriptions.add(
        this.renderer2.listen(svgObject, 'load', () => {
          loadedSvgObjects++;
          if (loadedSvgObjects > svgObjects.length) {
            loadedSvgObjects = 1;
          }
          if (loadedSvgObjects === svgObjects.length) {
            this.init();
          }
        })
      );
    });
    this.auxappLogoService.logoState$.subscribe((status: string) => {
      if (status === 'PAUSE') {
        this.pause();
      } else if (status === 'PLAY') {
        this.play();
      }
    });
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
