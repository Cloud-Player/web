import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropZoneDirective implements OnInit, OnDestroy {
  private _leaveTimeout: number;

  @Input('dropCallback')
  public dropCallback: Function;

  @Input('dropItemRef')
  public dropItemRef: any;

  constructor(private el: ElementRef) {
  }

  private onDragEnter(event) {
    clearTimeout(this._leaveTimeout);
    this.el.nativeElement.classList.add('drag-over');
  }

  private onDragOver(event: any) {
    event.preventDefault();
    clearTimeout(this._leaveTimeout);
    this.el.nativeElement.classList.add('drag-over');
  }

  private onDragLeave() {
    clearTimeout(this._leaveTimeout);
    this._leaveTimeout = window.setTimeout(() => {
      this.el.nativeElement.classList.remove('drag-over');
    }, 100);
  }

  private onDrop(event: any) {
    if (this.dropCallback) {
      const args = [this.getDragData(event)];
      if (this.dropItemRef) {
        args.push(this.dropItemRef);
      }
      args.push(event);
      this.dropCallback.apply(this, args);
    }
    clearTimeout(this._leaveTimeout);
    this._leaveTimeout = window.setTimeout(() => {
      this.el.nativeElement.classList.remove('drag-over');
    }, 100);
  }

  private getDragData(event: any) {
    const text = event.dataTransfer.getData('text');
    if (text) {
      return JSON.parse(text);
    }
  }

  public ngOnInit(): void {
    this.el.nativeElement.addEventListener('dragenter', this.onDragEnter.bind(this));
    this.el.nativeElement.addEventListener('dragover', this.onDragOver.bind(this));
    this.el.nativeElement.addEventListener('dragleave', this.onDragLeave.bind(this));
    this.el.nativeElement.addEventListener('drop', this.onDrop.bind(this));
  }

  public ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener('dragenter', this.onDragEnter.bind(this));
    this.el.nativeElement.removeEventListener('dragover', this.onDragOver.bind(this));
    this.el.nativeElement.removeEventListener('dragleave', this.onDragLeave.bind(this));
    this.el.nativeElement.removeEventListener('drop', this.onDrop.bind(this));
    clearTimeout(this._leaveTimeout);
  }

}
