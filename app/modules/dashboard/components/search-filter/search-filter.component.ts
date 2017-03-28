import {Component, OnInit, trigger, state, transition, style, animate, Input} from '@angular/core';

import {BaseCollection} from '../../../backbone/collections/base.collection';
import {BaseModel} from '../../../backbone/models/base.model';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';

@Component({
  selector: 'search-filter',
  styles: [require('./search-filter.style.scss')],
  template: require('./search-filter.template.html'),
  animations: [
    trigger('visibilityChanged', [
      state('true', style({height: '*', marginBottom: '15px', padding:'15px', })),
      state('false', style({height: 0, marginBottom: 0, padding: 0, display: 'none'})),
      state('void', style({height: 0, marginBottom: 0, padding:0, display: 'none'})),
      transition('* => *', animate('200ms ease-in-out'))
    ])
  ]
})

export class SearchFilterComponent implements OnInit {
  private humanReadableSecPipe: HumanReadableSecondsPipe;
  public showFilterForm: boolean = false;

  public transformProgressBarValues = function (input: any) {
    return this.humanReadableSecPipe.transform(input/1000, null);
  }.bind(this);

  @Input()
  public collection: BaseCollection<BaseModel>;

  ngOnInit(): void {
  }

  constructor() {
    this.humanReadableSecPipe = new HumanReadableSecondsPipe();
  }

  public toggleFilterForm():void{
    this.showFilterForm = !this.showFilterForm;
  }

  public transformDuration(input: string = ''):string{
    return this.humanReadableSecPipe.transform(input, null);
  }

  public reFetch():void {
   this.collection.fetch({reset: true});
  }
}
