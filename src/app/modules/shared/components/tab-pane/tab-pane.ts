import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TabBarComponent} from '../tab-bar/tab-bar';

@Component({
  selector: 'app-tab-pane',
  styleUrls: ['./tab-pane.scss'],
  templateUrl: './tab-pane.html'
})
export class TabPaneComponent implements OnInit, OnDestroy {
  private _isActive = false;

  @Input()
  public title: string;

  @Input()
  public icon: string;

  @Input()
  public id: string;

  constructor(private tabBar: TabBarComponent) {

  }

  public isActive() {
    return this._isActive;
  }

  public select() {
    this._isActive = true;
  }

  public deSelect() {
    this._isActive = false;
  }

  ngOnInit(): void {
    this.tabBar.addTab(this);
  }

  ngOnDestroy(): void {
    this.tabBar.removeTab(this);
  }
}
