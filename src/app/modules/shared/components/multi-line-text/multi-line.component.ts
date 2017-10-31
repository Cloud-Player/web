import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

interface Line {
  width: number;
  text: String;
}

@Component({
  selector: 'app-multi-line',
  styleUrls: ['./multi-line.style.scss'],
  templateUrl: './multi-line.template.html'
})
export class MultiLineComponent implements OnInit, OnDestroy {
  private _ctx: CanvasRenderingContext2D;
  public lines: Array<Line> = [];

  constructor() {
  }

  @Input() text: string;
  @Input() font: string;
  @Input() paddingLeft: number;
  @Input() paddingRight: number;
  @Input() maxWidth: number;
  @Input() maxLines: number;

  @Output() lineAmountChanged = new EventEmitter();

  @ViewChild('canvas') canvas: ElementRef;

  public calculateLines(text: string, maxWidth: number): void {
    const words = text.split(' ');

    words.forEach(function (word: string) {
      const wordWidth = this._ctx.measureText(word + ' ').width,
        line: Line = this.lines[this.lines.length - 1];

      if (line && line.width + wordWidth <= maxWidth) {
        line.text += ' ' + word;
        line.width += wordWidth;
      } else if (!this.maxLines || this.lines.length <= this.maxLines) {
        this.lines.push({width: wordWidth + (this.paddingLeft + this.paddingRight), text: word});
      }
    }.bind(this));

    this.lineAmountChanged.emit(this.lines.length);
  }

  ngOnInit(): void {
    this._ctx = this.canvas.nativeElement.getContext('2d');
    this._ctx.font = this.font || '300 12.5px Raleway';
    this.calculateLines(this.text, this.maxWidth);
  }

  ngOnDestroy(): void {
    this.lineAmountChanged.emit(this.lines.length * -1);
  }
}
