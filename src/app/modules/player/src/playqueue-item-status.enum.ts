export enum PlayQueueItemStatus {
  Playing = 'playing',
  RequestedPlaying = 'REQUESTED_PLAYING',
  Paused = 'paused',
  RequestedPause = 'REQUESTED_PAUSE',
  Stopped = 'stopped',
  RequestedStop = 'REQUESTED_STOP',
  RequestedSeek = 'REQUESTED_SEEK',
  Queued = 'queued',
  Scheduled = 'scheduled',
  Recommended = 'recommended'
}
