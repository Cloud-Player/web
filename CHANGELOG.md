# v3.1.0
- Fix memory leak in tracks list by unbinding event listeners in playTrackOn directive
- Add youtube-player to play youtube tracks in youtube html5 player iframe
- Update native client image for OSX

# v3.0.0
- Add continuous playback. Preload next track so it does not have to be buffered when it is set to playing
- Add crossfade of 10 seconds when track is going to end and next track is availabe and can be played
Known issue: When the browser does not allow starting a new player instance (e.g. tab is inactive) 
crossfade does not work yet.
- Fix [#33](https://github.com/Cloud-Player/web/pull/33): Could not set playback head on mobile devices
- Fix [#45](https://github.com/Cloud-Player/web/pull/45): Client-Pagination did not work in Firefox
- Display toast when a new version is available
- Display current app version
- Change style for native client
- Refactor code:
  - Add backbone decorators
  - Use properties instead of calling `model.get()|.set()` for backbone models that are mapped 
  on the backbone model setter and getter by the @attributesKey decorators
  - Refactor player module and prepare support for other players e.g. Youtube
  - Make player completely controllable by PlayQueueItem so that the playQueueItem can 
  request play, pause, stop and seek on the actual player. 
  Set status (playing, paused, stopped) and progress from player on PlayQueueItem
- Update dependencies to latest version
- Add license GNU GPLv3 

# v2.1.0
- Upgrade to Angular 5

# v2.0.0
- Upgrade to Angular 4
- Use Angular-CLI to serve and build application
- Use ahead of time compliler in production mode for faster app initialisation

# v1.1.0
- Display SoundCloud track comments on track cover for the current playing time
- Tweak design

# v1.0.0
## Design optimisation
- Design rebrush
- Make player responsive so it works on smartphones, tablets and desktop pcs

## App optimisation
- Use service worker to cache application on client for faster startup
- Optimize empty states when the user starts the application for the first time
- Add meta tags for social and searchengine crawlers

## Mobile optimisation
- Use Chrome Media Session API to control player from Android notification tray and lockscreen
- Provide app manifest so the app can be added to the homescreen on android devices and to tigger 
install on homescreen dialog

# v0.4.0
- Upgrade style for a better look
- Fix several minor bugs

# v0.3.0
- Save playqueue in current playing track with its progress in localstorage
- Reinitialize player with previous play queue and track on start up
- Add drag and drop to add tracks to playlists

# v0.2.0
- Extend playqueue functionality to support queuing of tracks
- Support auto queued tracks and user prioritized queued tracks
- Support play previous and play next track
- Auto play next track when track has finished

# v0.1.0
- Set up OAuth authentication to let user connect with its SoundClound connect
- Display playlists of user

# v0.0.3
- Upgrade style to use a three column layout for menu, audio player and view

# v0.0.2
- Use the Audio API to control the audio element
- Add basic playqueue to plac tracks in a queue
- Set up Travis to deploy app on GitHub pages on master push 

# v0.0.1
- Connect with Soundcloud API and replace heroes with SoundCloud API results
- Use audio element for basic audio playback. Play track [Bedouin - Brutal Hearts (FlicFlac Remix)](https://soundcloud.com/flicflac/bedouin-soundclash-brutal-1)

# v0.0.0
- Start with the Angular getting started guide Tour Of Heroes 
