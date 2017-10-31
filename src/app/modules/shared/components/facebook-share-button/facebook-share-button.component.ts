import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-facebook-share-button',
  styleUrls: ['./facebook-share-button.style.scss'],
  templateUrl: './facebook-share-button.template.html'
})
export class FacebookShareButtonComponent implements OnInit {
  constructor(private el: ElementRef) {

  }

  @Output()
  public click = new EventEmitter();

  private initFacebookJsSdk() {
    return new Promise((resolve, reject) => {
      const facebookElId = 'facebookJsSdk';
      const facebookScriptEl = document.getElementById(facebookElId);
      if (facebookScriptEl) {
        resolve();
      } else {
        let js: HTMLScriptElement;
        const scripts = document.getElementsByTagName('script')[0];
        js = document.createElement('script');
        js.id = facebookElId;
        js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=146645615953816';
        scripts.parentNode.insertBefore(js, facebookScriptEl);
        js.onload = () => {
          resolve();
        };
      }
    });
  }

  private initClickListener() {
    let fbIframe = this.el.nativeElement.querySelectorAll('iframe')[0];
    const monitor = setInterval(() => {
      if (!fbIframe) {
        fbIframe = this.el.nativeElement.querySelectorAll('iframe')[0];
      }
      const activeEl = document.activeElement;
      if (activeEl === fbIframe) {
        clearInterval(monitor);
        this.click.emit();
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.initFacebookJsSdk().then(() => {
      this.initClickListener();
    });
  }
}
