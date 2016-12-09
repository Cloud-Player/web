import {Component, ViewChild, ElementRef} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {Track} from '../../../tracks/models/track.model';
import {PlayQueueItem} from '../../models/play_queue_item.model';

@Component({
  moduleId: module.id,
  selector: 'audio-player-controls',
  templateUrl: 'controls.template.html',
  styleUrls: ['controls.style.css']

})

export class PlayerControlsComponent {

  private audio: HTMLAudioElement;
  private playQueue: PlayQueue = PlayQueue.getInstance();

  private timeTick: string;
  private duration: string;

  private timeTickWidth: string;
  private progressBarWidth: number;

  @ViewChild('audioPlayerProgressBarLine') audioPlayerProgressBarLine: ElementRef;
  @ViewChild('audioPlayerHandle') audioPlayerProgressHandle: ElementRef;
  @ViewChild('audioPlayerProgressBar') audioPlayerProgressBar: ElementRef;

  constructor() {
    this.audio = new Audio();
    this.playQueue.on('change:status', this.reactOnStatusChange, this);
    this.timeTick = this.formatToHHMMSS(0);
    this.duration = this.formatToHHMMSS(0);

    this.timeTickWidth = '0px';

    this.audio.addEventListener('canplay', () => {
      this.duration = this.formatToHHMMSS(this.audio.duration);
    });

    this.audio.addEventListener('timeupdate', () => {
      this.timeTick = this.formatToHHMMSS(this.audio.currentTime);
      this.timeTickWidth = this.getTimeTickPositionFromTime(this.audio.currentTime);
    });

  }

  ngAfterContentInit() {
    let el = this.audioPlayerProgressHandle.nativeElement;
    this.progressBarWidth = this.audioPlayerProgressBarLine.nativeElement.offsetWidth;

    let start = 0;
    let diff = 0;
    let newPos = 0;
    let currentPos = 0;

    el.addEventListener('dragstart', (e: DragEvent) => {
      start = e.pageX || e.clientX;
      currentPos = this.getTimeTickPosition();
    });

    el.addEventListener('drag', (e: DragEvent) => {
      let end: number = e.pageX || e.clientX;
      if (end != 0) {
        diff = end - start;
        newPos = (diff + currentPos);
        this.setTimeTickPosition(newPos);
      }
    };

    el.addEventListener('dragend', (e: DragEvent) => {
      this.playTrackFromPosition(this.getTimeTickPosition());
    };

    this.audioPlayerProgressBarLine.nativeElement.addEventListener('click', (e: MouseEvent) => {
      // console.log('Click ' + e.clientX);
      this.playTrackFromPosition(e.clientX);
      // debugger;
    };

    this.audioPlayerProgressBar.nativeElement.addEventListener('click', (e: MouseEvent) => {
      this.playTrackFromPosition(e.clientX);
    };

  };

  formatToHHMMSS(input: number): string {
    let time = new Date(null);
    time.setSeconds(input);

    // format time from hh:mm:ss to mm:ss when hh is 0
    if (time.getHours() === 1) {
      return time.toISOString().substr(14, 5);
    } else {
      return time.toISOString().substr(11, 8);
    }
  }

  getTimeTickPositionFromTime(time: number): string {
    return (time * this.progressBarWidth) / this.audio.duration + 'px';
  }

  getTimeTickPosition(): number {
    let output = this.timeTickWidth.replace(/'px'/g, '')
    return parseInt(output);
  }

  setTimeTickPosition(newPos: number): void {
    // clipping position
    if (newPos < 0) {
      newPos = 0;
    } else if (newPos > this.progressBarWidth) {
      newPos = this.progressBarWidth;
    }

    this.timeTickWidth = newPos + 'px';
  }

  private reactOnStatusChange(track): void {
    switch (track.get('status')) {
      case 'PLAYING':
        this.startAudioPlayer(track);
        break;
      case 'STOPPED':
        this.stopAudioPlayer();
        break;
      case 'PAUSED':
        this.pauseAudioPlayer();
        break;
    }
  }

  playTrack(track: PlayQueueItem|null): void {
    track = track || this.playQueue.getTrack();
    track.play();
  }

  playTrackFromPosition(x: number): void {
    this.audio.currentTime = (parseInt(this.audio.duration.toFixed(0)) / this.progressBarWidth) * x;
    this.audio.play();
  }

  pauseTrack(): void {
    let track = this.playQueue.getPlayingTrack();
    if (track) {
      track.pause();
    }
  }

  previousTrack(): void {
    if (this.playQueue.getPreviousTrack()) {
      this.playTrack(this.playQueue.getPreviousTrack());
    }
  }

  nextTrack(): void {
    if (this.playQueue.getNextTrack()) {
      this.playTrack(this.playQueue.getNextTrack());
    }
  }

  startAudioPlayer(track: Track): void {
    if (this.audio.src !== track.getResourceUrl()) {
      this.audio.src = track.getResourceUrl();
    }
    this.audio.play();
  }

  pauseAudioPlayer(): void {
    this.audio.pause();
  }

  stopAudioPlayer(): void {
    this.audio.pause();
    delete this.audio.src;
  }

  setAudioPlayerVolume(volume: string): void {
    this.audio.volume = volume;
  }

}
