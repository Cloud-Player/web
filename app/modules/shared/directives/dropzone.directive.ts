import {Directive, ElementRef, HostListener, Input, Renderer} from '@angular/core';
import Timer = NodeJS.Timer;

@Directive({
  selector: '[dropzone]'
})
export class DropZoneDirective {

  private leaveTimeout: Timer;

  @Input('dropCallback') dropCallback: Function;

  @Input('dropItemRef') dropItemRef: any;

  @HostListener('dragenter', ['$event']) onDragEnter() {
    this.renderer.setElementClass(this.el.nativeElement, 'drag-over', true);
    clearTimeout(this.leaveTimeout);
  }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    event.preventDefault();
    this.renderer.setElementClass(this.el.nativeElement, 'drag-over', true);
    clearTimeout(this.leaveTimeout);
  }

  @HostListener('dragleave') onDragLeave() {
    this.leaveTimeout = setTimeout(()=>{
      this.renderer.setElementClass(this.el.nativeElement, 'drag-over', false);
    },100);
  }

  @HostListener('drop', ['$event']) onMouseOver(event: any) {
    if (this.dropCallback) {
      let args = [this.getDragData(event)];
      if (this.dropItemRef) {
        args.push(this.dropItemRef);
      }
      args.push(event);
      this.dropCallback.apply(this, args);
    }
  }

  private getDragData(event: DragEvent) {
    let text = event.dataTransfer.getData('text');
    if (text) {
      return JSON.parse(text);
    }
  };

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

}
