import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropZoneDirective {

  private leaveTimeout: number;

  @Input('dropCallback') dropCallback: Function;

  @Input('dropItemRef') dropItemRef: any;

  @HostListener('dragenter', ['$event'])
  onDragEnter() {
    this.el.nativeElement.classList.add('drag-over');
    clearTimeout(this.leaveTimeout);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: any) {
    event.preventDefault();
    this.el.nativeElement.classList.add('drag-over');
    clearTimeout(this.leaveTimeout);
  }

  @HostListener('dragleave')
  onDragLeave() {
    this.leaveTimeout = window.setTimeout(() => {
      this.el.nativeElement.classList.remove('drag-over');
    }, 100);
  }

  @HostListener('drop', ['$event'])
  onMouseOver(event: any) {
    if (this.dropCallback) {
      const args = [this.getDragData(event)];
      if (this.dropItemRef) {
        args.push(this.dropItemRef);
      }
      args.push(event);
      this.dropCallback.apply(this, args);
    }
    this.leaveTimeout = window.setTimeout(() => {
      this.el.nativeElement.classList.remove('drag-over');
    }, 100);
  }

  private getDragData(event: any) {
    const text = event.dataTransfer.getData('text');
    if (text) {
      return JSON.parse(text);
    }
  }

  constructor(private el: ElementRef) {
  }

}
