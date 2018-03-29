import {Component, ElementRef, NgZone, Renderer} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-view-change-loader',
  styleUrls: ['./view-change-loader.style.scss'],
  templateUrl: './view-change-loader.template.html'
})

export class ViewChangeLoaderComponent {

  constructor(private el: ElementRef,
              private router: Router,
              private ngZone: NgZone,
              private renderer: Renderer) {
    router.events.subscribe((event: any) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: any): void {

    if (event instanceof NavigationStart) {
      this.showSpinner();
    }
    if (event instanceof NavigationEnd
      || event instanceof NavigationCancel
      || event instanceof NavigationError
    ) {
      this.hideSpinner();
    }
  }

  private showSpinner(): void {
    // We wanna run this function outside of Angular's zone to
    // bypass change detection
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setElementStyle(
        this.el.nativeElement,
        'display',
        'block'
      );
    });
  }

  private hideSpinner(): void {

    // We wanna run this function outside of Angular's zone to
    // bypass change detection,
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setElementStyle(
        this.el.nativeElement,
        'display',
        'none'
      );
    });
  }
}
