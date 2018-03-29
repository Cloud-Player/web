import {Component, Input} from '@angular/core';
import {BaseCollection} from '../../../backbone/collections/base.collection';
import {BaseModel} from '../../../backbone/models/base.model';

@Component({
  selector: 'app-list-footer',
  styleUrls: ['./list-footer.scss'],
  templateUrl: './list-footer.html'
})
export class ListFooterComponent {
  @Input()
  public collection: BaseCollection<BaseModel>;

  @Input()
  public text: string;

  public getText() {
    return `${this.collection.length} ${this.text}`;
  }
}
