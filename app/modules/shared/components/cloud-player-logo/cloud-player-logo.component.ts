import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {CloudPlayerLogoService} from '../../services/cloud-player-logo.service';

@Component({
  selector: 'cloud-player-logo',
  styles: [require('./cloud-player-logo.style.scss')],
  template: require('./cloud-player-logo.template.html'),
})

export class CloudPlayerLogoComponent implements OnInit {

  @ViewChild('svgObject') svgObject: ElementRef;
  private svgEl: SVGSVGElement;

  constructor(private cloudPlayerLogoService: CloudPlayerLogoService){
    cloudPlayerLogoService.logoState$.subscribe((status: string)=>{
     if(status === 'PAUSE'){
       this.pause();
     } else if(status === 'PLAY'){
       this.play();
     }
    });
  }

  ngOnInit(): void {
    this.svgObject.nativeElement.addEventListener('load', () => {
      let svgObj = <HTMLObjectElement>this.svgObject.nativeElement;
      let content = <any>svgObj.contentDocument;
      this.svgEl = <SVGSVGElement>content.getElementById('cloudPlayerCassette');
      this.pause();
    }, false);
  }

  play(): void{
    if(this.svgEl){
      this.svgEl.unpauseAnimations();
    }
  }

  pause(): void{
    if(this.svgEl){
      this.svgEl.pauseAnimations();
    }
  }
}
