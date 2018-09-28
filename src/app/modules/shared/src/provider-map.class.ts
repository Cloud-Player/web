export interface IProviderMap {
  [key: string]: IProvider;
}

export interface IProvider {
  title: string;
  icon: string;
  id: string;
}

export class ProviderMap {
  static auxapp: IProvider = {
    title: 'Cloud-Player',
    icon: 'fa fa-play-circle',
    id: 'auxapp'
  };

  static soundcloud: IProvider = {
    title: 'SoundCloud',
    icon: 'fa fa-soundcloud',
    id: 'soundcloud'
  };

  static youtube: IProvider = {
    title: 'YouTube',
    icon: 'fa fa-youtube-play',
    id: 'youtube'
  };

  static mixcloud: IProvider = {
    title: 'Mixcloud',
    icon: 'fa fa-mixcloud',
    id: 'mixcloud'
  };

  static deezer: IProvider = {
    title: 'Deezer',
    icon: 'fa fa-signal',
    id: 'deezer'
  };

  static map: IProviderMap = {
    auxapp: ProviderMap.auxapp,
    soundcloud: ProviderMap.soundcloud,
    youtube: ProviderMap.youtube,
    mixcloud: ProviderMap.mixcloud,
    deezer: ProviderMap.deezer
  };
}
