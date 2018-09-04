import {BaseModel} from '../../backbone/models/base.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {uniqueId} from 'underscore';
import {ToastTypes} from '../src/toast-types.enum';


export class ToastModel extends BaseModel {
  idAttribute = 'toastId';

  @attributesKey('toastId')
  @defaultValue(uniqueId('toast'))
  toastId: string | number;

  @attributesKey('type')
  @defaultValue(ToastTypes.DefaultToast)
  type: ToastTypes;

  @attributesKey('title')
  title: string;

  @attributesKey('message')
  @defaultValue('')
  message: string;

  @attributesKey('icon')
  icon: string;

  @attributesKey('dismissible')
  @defaultValue(true)
  dismissible: boolean;

  @attributesKey('buttonAction')
  buttonAction: Function;

  @attributesKey('buttonLink')
  buttonLink: string;

  @attributesKey('buttonLinkTarget')
  @defaultValue('_blank')
  buttonLinkTarget: string;

  @attributesKey('buttonLabel')
  buttonLabel: string;
}
