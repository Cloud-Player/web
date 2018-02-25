import {AbstractFilterComponent} from '../abstract-filter/abstract-filter';
import {Component, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';
import {FilterFormComponent} from '../filter-form';

@Component({
  selector: 'app-youtube-duration-filter',
  styleUrls: ['./youtube-duration-filter.scss'],
  templateUrl: './youtube-duration-filter.html'
})
export class YoutubeDurationFilterComponent extends AbstractFilterComponent {
  @ViewChild('ngControl')
  protected ngControl: NgControl;

  constructor(protected filterForm: FilterFormComponent) {
    super();
  }
}
