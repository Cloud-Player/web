# v5.5.0
- Add teaser banner for aux.app

# v5.4.1
- Fix playback instabilities due to playqueue changes

# v5.4.0
- Persist playqueue on server so its portable to all devices
- Prepare Deezer integration
- Let user confirm delete before deleting playlist
- Remove proxy endpoint calls
- Upgrade to Angular 7

# v5.3.5
- Verify that tracks returned by search are supported

# v5.3.4
- Fix broken search by defining providers that shall be returned to ignore providers that are not yet supported

# v5.3.3
- Fix modal scrolling bug on mobile devices
- Increase click area for add to queue button on mobile devices
- Show download progress in native app when new version is downloaded

# v5.3.2
- Remove migration of cp account
- Upgrade dependencies
- Fix empty favourite track view after connecting

# v5.3.1
- Fix Mixcloud player bugs
- Refactor playqueue to prepare support to persist playqueue on server

# v5.3.0
- Integrate Mixcloud

# v5.2.0
- Migrate to new API endpoint

# v5.1.1
- Remove youtube video syndicated filter

# v5.1.0
- Upgrade to Angular 6
- Add privacy notice
- Prepare Mixcloud integration
- Add sort buttons to playlist view (Fix [#69](https://github.com/Cloud-Player/web/issues/69))
- Fix empty track when adding track to a playlist

# v5.0.0
## Features
- Integrate Cloud-Player API (Fix [#58](https://github.com/Cloud-Player/web/issues/58), [#63](https://github.com/Cloud-Player/web/issues/63), [#66](https://github.com/Cloud-Player/web/issues/66))
  - Create playlists for mixed tracks
  - Favourite tracks independently of the streaming service provider
  - Connect with streaming service providers (SoundCloud, YouTube) to synchronise liked tracks and playlists
- Add modal to add tracks to playlists
- Add context menu so you can right click on tracks
- Add button to shuffle playqueue (Fix [#62](https://github.com/Cloud-Player/web/issues/62))
- Add button to loop playqueue
- Add button to set player volume

## Improvements
- Improve performance 
  - Use css animations for logo instead of svg animations for GPU acceleration
  - Use Angular OnPush detection strategy for some components
  - Listen to performance intensive events like scroll outside of ngZone
- Improve style  
- Support fullscreen for all major browsers instead of Chrome only
- Improve drag and drop

# v4.1.1
- Fix fullscreen mode for native player
- Display timer in fullscreen player

# v4.1.0
- Add button to toggle fullscreen
- Show player in fullscreen when fullscreen event is triggered
- Show large track comments for SoundCloud player when in fullscreen mode
- Display next/previous button in mobile mode

# v4.0.1
- Fix playback bug

# v4.0.0
- Call youtube api to search for tracks
- Add filter to filter youtube tracks by duration
- Improve scrolling for iOS devices
- Resize player based on to aspect ration of a track
- Retry play when play is called and player changes to status paused
- Refactor code:
  - Add support to collection and nested models for dynamic instances
  - Generify tracks so it supports youtube tracks as well
  - Add decorators to define dynamic instances for collection and nested models
  - Refactor sliders to support ngModel and improve code readability

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
