import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TabPaneComponent} from '../tab-pane/tab-pane';
import {isUndefined} from 'underscore';

@Component({
  selector: 'app-tab-bar',
  styleUrls: ['./tab-bar.scss'],
  templateUrl: './tab-bar.html'
})
export class TabBarComponent implements OnInit, OnChanges {
  private _selectedTabIndex;

  public tabs: TabPaneComponent[];

  @Input()
  public activeTabId: string;

  @Input()
  public activeTabIndex: number;

  @Input()
  public showTabBar = true;

  @Output()
  public tabChange: EventEmitter<TabPaneComponent>;

  constructor() {
    this.tabs = [];
    this.tabChange = new EventEmitter();
  }

  private setInitialSelectedTab() {
    if (this.activeTabId) {
      this.selectTabById(this.activeTabId);
    } else if (!isUndefined(this.activeTabIndex)) {
      this.selectTabByIndex(this.activeTabIndex);
    } else {
      this.selectTabByIndex(0);
    }
  }

  public addTab(tab: TabPaneComponent) {
    this.tabs.push(tab);
    this.setInitialSelectedTab();
  }

  public removeTab(tab: TabPaneComponent) {
    this.tabs.every((tabPane, index) => {
      if (tab === tabPane) {
        this.tabs.splice(index, 1);
        return false;
      } else {
        return true;
      }
    });
  }

  public selectTab(tab: TabPaneComponent) {
    if (tab) {
      const previousSelectedTab = this.tabs[this._selectedTabIndex];
      if (previousSelectedTab) {
        previousSelectedTab.deSelect();
      }

      tab.select();
      this._selectedTabIndex = this.tabs.indexOf(tab);
      this.tabChange.emit(tab);
    }
  }

  public selectTabById(id: string) {
    this.tabs.every((tab: TabPaneComponent) => {
      if (tab.id === id) {
        this.selectTab(tab);
        return false;
      } else {
        return true;
      }
    });
  }

  public selectTabByIndex(index: number) {
    if (index >= 0 && index < this.tabs.length && index !== this._selectedTabIndex) {
      this.selectTab(this.tabs[index]);
    }
  }

  ngOnInit(): void {
    this.setInitialSelectedTab();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeTabIndex) {
      this.selectTabById(changes.activeTabIndex.currentValue);
    } else if (changes.activeTabId) {
      this.selectTabById(changes.activeTabId.currentValue);
    }
  }
}
