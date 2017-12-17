import {User} from '../../users/models/user.model';
import {BaseModel} from '../../backbone/models/base.model';
import {ImageModel} from '../../shared/models/image';

export abstract class Track extends BaseModel {
  public abstract provider: string;
  public abstract artist: User;
  public abstract image: ImageModel;
  public abstract title: string;
  public abstract duration: number;
  public abstract genre: string;
  public abstract createdAt: number;
  public abstract likes: number;
  public abstract clicks: number;
  public abstract aspectRatio: number;

  public abstract getAdditionalMiniJSONAttrs(): {};

  public toMiniJSON() {
    const obj: any = this.getAdditionalMiniJSONAttrs() || {};
    obj.provider = this.provider;
    obj.id = this.id;
    obj.title = this.title;
    obj.duration = this.duration;
    obj.image = this.image.toJSON();
    obj.user = this.artist.toJSON();

    return obj;
  }
}

