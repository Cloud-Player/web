declare namespace DZ {
  export interface IPlayerOptions {
    appId: string;
    channelUrl: string;
    player?: {
      container?: string;
      width?: number;
      height?: number;
      onload?: Function;
    };
  }

  export interface ITrack {
    id: number;
    duration: number;
    title: string;
    artist: {
      id: number;
      name: string;
    };
    album: {
      id: number;
      title: string;
    };
  }

  export namespace Event {
    export function subscribe(ev: string, callback: Function);
    export function unsubscribe(ev: string, callback?: Function);
  }

  export namespace player {
    export function play();

    export function pause();

    export function seek(position: number);

    export function setVolume(volume: number);

    export function playTracks(trackIds: Array<String | number>);

    export function isPlaying(): boolean;

    export function getVolume(): number;

    export function getCurrentTrack(): ITrack;
  }

  export function init(options: IPlayerOptions);
}
