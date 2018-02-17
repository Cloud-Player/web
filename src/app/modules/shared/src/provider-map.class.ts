export interface IProviderMap {
  [key: string]: IProvider;
}

export interface IProvider {
  title: string;
  icon: string;
}

export class ProviderMap {
  static cloudplayer: IProvider = {
    title: 'Cloud Player',
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
    cloudplayer: ProviderMap.cloudplayer,
    soundcloud: ProviderMap.soundcloud,
    youtube: ProviderMap.youtube
  };
}
