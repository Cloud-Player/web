declare namespace Mixcloud {
  export interface IEvent {
    on(callback: Function);

    off(callback: Function);
  }

  export interface IPlayerWidget {
    ready: Promise<any>;

    events: {
      progress: IEvent;
      buffering: IEvent;
      play: IEvent;
      pause: IEvent;
      ended: IEvent;
      error: IEvent;
    };

    load(cloudcastKey: string, startPlaying: boolean): Promise<any>;

    play(): Promise<any>;

    pause(): Promise<any>;

    togglePlay(): Promise<any>;

    seek(seconds: number): Promise<any>;

    getPosition(): Promise<number>;

    getDuration(): Promise<number>;

    getIsPaused(): Promise<boolean>;
  }

  export function PlayerWidget(el: HTMLElement): IPlayerWidget;
}
