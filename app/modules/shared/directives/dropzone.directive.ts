import {Directive, ElementRef, HostListener, Input, Renderer} from '@angular/core';

@Directive({
  selector: '[dropzone]'
})
export class DropZoneDirective {

  @Input('dropCallback') dropCallback: Function;

  @Input('dropItemRef') dropItemRef: any;

  @HostListener('dragenter', ['$event']) onDragEnter(event: DragEvent) {
    this.renderer.setElementClass(this.el.nativeElement, 'drag-over', true);
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('dragleave') onDragLeave() {
    this.renderer.setElementClass(this.el.nativeElement, 'drag-over', false);
  }

  @HostListener('drop', ['$event']) onMouseOver(event: DragEvent) {
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
