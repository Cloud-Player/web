export interface IProviderMap {
  [key: string]: IProvider;
}

export interface IProvider {
  title: string;
  icon: string;
}

export class ProviderMap {
  static auxapp: IProvider = {
    title: 'Aux.app',
    icon: 'fa fa-play-circle'
  };

  static soundcloud: IProvider = {
    title: 'SoundCloud',
    icon: 'fa fa-soundcloud'
  };

  static youtube: IProvider = {
    title: 'YouTube',
    icon: 'fa fa-youtube-play'
  };

  static map: IProviderMap = {
    auxapp: ProviderMap.auxapp,
    soundcloud: ProviderMap.soundcloud,
    youtube: ProviderMap.youtube
  };
}
