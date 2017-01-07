import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {throttle, debounce} from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'audio-player-controls',
  templateUrl: 'controls.template.html',
  styleUrls: ['controls.style.css']
})

export class PlayerControlsComponent implements OnInit {

  private audio: HTMLAudioElement;
  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  private timeTick: string;
  private duration: string;

  private timeTickPosition: number;
  private progressBarWidth: number;

  @ViewChild('audioPlayerProgressBarLine') audioPlayerProgressBarLine: ElementRef;
  @ViewChild('audioPlayerHandle') audioPlayerProgressHandle: ElementRef;
  @ViewChild('audioPlayerProgressBar') audioPlayerProgressBar: ElementRef;

  constructor() {
    this.audio = new Audio();
    this.playQueue.on('change:status', this.reactOnStatusChange, this);
    this.timeTick = this.formatToHHMMSS(0);
    this.duration = this.formatToHHMMSS(0);

    this.timeTickPosition = 0;

    this.setAudioObjectEventListeners();
  }

  private debouncedVolumeSave = debounce(() => {
    let volume = (Math.round(this.audio.volume * 10) / 10).toString();
    localStorage.setItem('sc_volume', volume);
  }, 500);

  private setAudioObjectEventListeners() {
    this.audio.addEventListener('canplay', () => {
      this.duration = this.formatToHHMMSS(this.audio.duration);
    });

    this.audio.addEventListener('timeupdate', () => {
      this.timeTick = this.formatToHHMMSS(this.audio.currentTime);
      this.timeTickPosition = this.getTimeTickPositionFromTime(this.audio.currentTime);
    });

    this.audio.addEventListener('ended', () => {
      if (this.playQueue.hasNextItem()) {
        this.playQueue.getNextItem().play();
      } else {
        this.playQueue.getCurrentItem().stop();
      }
    });

    this.audio.addEventListener('volumechange', this.debouncedVolumeSave);
  }

  ngOnInit() {
    let savedVolume = localStorage.getItem('sc_volume');
    if (savedVolume) {
      this.audio.volume = parseFloat(savedVolume);
    }
  }

  ngAfterContentInit() {
    let el = this.audioPlayerProgressHandle.nativeElement;
    this.progressBarWidth = this.audioPlayerProgressBarLine.nativeElement.offsetWidth;

    let start = 0;
    let diff = 0;
    let currentPos = 0;
    let newPos = 0;

    el.addEventListener('dragstart', (e: DragEvent) => {
      start = e.pageX || e.clientX;
      currentPos = this.timeTickPosition;
    });

    el.addEventListener('drag', (e: DragEvent) => {
      let end: number = e.pageX || e.clientX;
      if (end !== 0) {
        diff = end - start;
        newPos = (diff + currentPos);
        this.setTimeTickPosition(newPos);
      }
    });

    el.addEventListener('dragend', () => {
      this.playTrackFromPosition(this.timeTickPosition);
    });

    this.audioPlayerProgressBarLine.nativeElement.addEventListener('click', (e: MouseEvent) => {
      this.playTrackFromPosition(e.offsetX);
    });

    this.audioPlayerProgressBar.nativeElement.addEventListener('click', (e: MouseEvent) => {
      this.playTrackFromPosition(e.offsetX);
    });

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

  getTimeTickPositionFromTime(time: number): number {
    return (time * this.progressBarWidth) / this.audio.duration;
  }

  setTimeTickPosition(newPos: number): void {
    // clipping position
    if (newPos < 0) {
      newPos = 0;
    } else if (newPos > this.progressBarWidth) {
      newPos = this.progressBarWidth;
    }

    this.timeTickPosition = newPos;
  }

  private reactOnStatusChange(item: PlayQueueItem): void {
    switch (item.get('status')) {
      case 'PLAYING':
        this.startAudioPlayer(item);
        break;
      case 'STOPPED':
        this.stopAudioPlayer();
        break;
      case 'PAUSED':
        this.pauseAudioPlayer();
        break;
    }
  }

  playTrack(playQueueItem: PlayQueueItem|null): void {
    playQueueItem = playQueueItem || this.playQueue.getItem();
    playQueueItem.play();
  }

  playTrackFromPosition(x: number): void {
    this.audio.currentTime = (parseInt(this.audio.duration.toFixed(0), 0) / this.progressBarWidth) * x;
    this.playTrack(this.playQueue.getPlayingItem());
  }

  pauseTrack(): void {
    let track = this.playQueue.getPlayingItem();
    if (track) {
      track.pause();
    }
  }

  previousTrack(): void {
    if (this.playQueue.hasPreviousItem()) {
      this.playTrack(this.playQueue.getPreviousItem());
    }
  }

  nextTrack(): void {
    if (this.playQueue.hasNextItem()) {
      this.playTrack(this.playQueue.getNextItem());
    }
  }

  startAudioPlayer(item: PlayQueueItem): void {
    if (this.audio.src !== item.get('track').getResourceUrl()) {
      this.audio.src = item.get('track').getResourceUrl();
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

}
