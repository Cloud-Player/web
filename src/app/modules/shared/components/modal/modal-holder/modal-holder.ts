import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injectable} from '@angular/core';
import {ModalFactory} from '../../../src/modal-factory.class';
import {ModalService} from '../../../services/modal';

@Component({
  selector: 'app-modal-holder',
  styleUrls: ['./modal-holder.scss'],
  templateUrl: './modal-holder.html'
})
export class ModalHolderComponent implements OnInit {
  private _modalFactory: ModalFactory;

  @ViewChild('modalContainer', {read: ViewContainerRef})
  private _container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.modalService.initModalFactory(this.resolver, this._container);
  }
}
