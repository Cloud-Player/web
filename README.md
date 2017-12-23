[![Build Status](https://travis-ci.org/Cloud-Player/web.svg?branch=master)](https://travis-ci.org/Cloud-Player/web)

# Cloud Player
[![Cloud Player Teaser](https://raw.githubusercontent.com/Cloud-Player/web/master/src/assets/meta/social/facebook.jpg)](https://cloud-player.io)

Cloud Player is an web based audio and video player. Currently it supports playback of SoundCloud and YouTube tracks.
It is using the official 
[SoundCloud API](https://developers.soundcloud.com/docs/api) and 
[YouTube Data API](https://developers.google.com/youtube/v3/docs/)
to search for SoundCloud tracks and YouTube videos. 

Search for tracks, play them and manage your liked tracks and playlists. 
Also available as native desktop app to control the player from your keyboard media keys (play/pause/next/previous).

[Start the webplayer](https://cloud-player.io)

Get the [native desktop app](https://github.com/Cloud-Player/desktop-app)

## Creators
Cloud Player is a study project created at [HTW Berlin](http://www.htw-berlin.de/) by 

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/zarlex.png?s=150">
        <br>
        <a href="https://github.com/zarlex">Alexander Zarges</a>
        <p>Developer</p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/Dathix.png?s=150">
        <br>
        <a href="https://github.com/Dathix">Daniel Reißner</a>
        <p>Developer</p>
      </td>
      <td align="center" width="20%" valign="top">
        <img width="150" height="150" src="https://github.com/SchulzKai.png?s=150">
        <br>
        <a href="https://github.com/SchulzKai">Kai Schulz</a>
        <p>Developer</p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/gefei-htw.png?s=150">
        <br>
        <a href="https://github.com/gefei-htw">Prof. Dr. Zhang</a>
        <p>Advisor<p>
      </td>
     </tr>
  </tbody>
</table>

## Why?
We created the Cloud Player to get started with Angular2. We were also interested in the HTML5 audio api. 
Also we were missing a native desktop SoundCloud player. SoundCloud and YouTube are providing a nice API to get access to their data.

We optimised the player to work on Smartphones, Tablets and Desktop PCs. 

By using a [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) 
the application is cached on your device it is not downloaded every time you start the Cloud Player. 
The [Web App Manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) allows 
you to install the Cloud Player on your Android Homescreen

Thanks to the new [chrome mobile session API](https://developers.google.com/web/updates/2017/02/media-session) you can control 
the Cloud Player from your Android notification tray and lock screen. 

[Electron](https://electron.atom.io/) allows us to ship the player as a native desktop application. 

## Disclaimer
We are neither related to SoundCloud/YouTube nor was this build on behalf of SoundCloud/YouTube

## License
[GNU GPLv3](./LICENSE)

