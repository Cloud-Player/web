import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-twitter-share-button',
  styleUrls: ['./twitter-share-button.style.scss'],
  templateUrl: './twitter-share-button.template.html'
})

export class TwitterShareButtonComponent implements OnInit {
  constructor(private el: ElementRef) {
  }

  @Output()
  public click = new EventEmitter();

  private build() {
    (<any>window).twttr.widgets.createShareButton(
      'https://cloud-player.io',
      document.querySelector('.twitter-share-button'),
      {
        via: 'cldplayer',
        size: 'large',
        text: 'Check out this free music player'
      });
  }

  private initTwitterJsSdk() {
    return new Promise((resolve, reject) => {
      const twitterElId = 'twitterJsSdk';
      const twitterScriptEl = document.getElementById(twitterElId);
      if (twitterScriptEl) {
        resolve();
      } else {
        let js: HTMLScriptElement;
        const scripts = document.getElementsByTagName('script')[0];
        js = document.createElement('script');
        js.id = twitterElId;
        js.src = '//platform.twitter.com/widgets.js';
        scripts.parentNode.insertBefore(js, twitterScriptEl);
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
    this.initTwitterJsSdk().then(() => {
      this.build();
      this.initClickListener();
    });
  }
}
