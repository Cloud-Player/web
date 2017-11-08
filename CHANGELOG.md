#v2.1.0
- Upgrade to Angular 5

#v2.0.0
- Upgrade to Angular 4
- Use Angular-CLI to serve and build application
- Use ahead of time compliler in production mode for faster app initialisation

#v1.1.0
- Display SoundCloud track comments on track cover for the current playing time
- Tweak design

#v1.0.0
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

#v0.4.0
- Upgrade style for a better look
- Fix several minor bugs

#v0.3.0
- Save playqueue in current playing track with its progress in localstorage
- Reinitialize player with previous play queue and track on start up
- Add drag and drop to add tracks to playlists

#v0.2.0
- Extend playqueue functionality to support queuing of tracks
- Support auto queued tracks and user prioritized queued tracks
- Support play previous and play next track
- Auto play next track when track has finished

#v0.1.0
- Set up OAuth authentication to let user connect with its SoundClound connect
- Display playlists of user

#v0.0.3
- Upgrade style to use a three column layout for menu, audio player and view

#v0.0.2
- Use the Audio API to control the audio element
- Add basic playqueue to plac tracks in a queue
- Set up Travis to deploy app on GitHub pages on master push 

#v0.0.1
- Connect with Soundcloud API and replace heroes with SoundCloud API results
- Use audio element for basic audio playback. Play track [Bedouin - Brutal Hearts (FlicFlac Remix)](https://soundcloud.com/flicflac/bedouin-soundclash-brutal-1)

#v0.0.0
- Start with the Angular getting started guide Tour Of Heroes 
