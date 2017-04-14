[![Build Status](https://travis-ci.org/Cloud-Player/web.svg?branch=master)](https://travis-ci.org/Cloud-Player/web)

# Cloud Player
[![Cloud Player Teaser](https://github.com/Cloud-Player/web/blob/master/assets/meta/social/facebook.jpg)](https://cloud-player.io)

Cloud Player is an alternative SoundCloud player. It is using the official [SoundCloud API](https://developers.soundcloud.com/docs/api). 

Play all the tracks from SoundCloud and manage your likes and playlists. Also available as native desktop app to controll the player from your keyboard media keys.

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
We created the Cloud Player to get started with Angular2. We were also interessted in the HTML5 audio api. Also we were missing a native desktop SoundCloud player. SoundCloud is providing a nice API to get access to their data.
This is why we decided to build a audio player and use SoundCloud as the data source. 

We optimised the player to work on all major platforms like Smartphone, Tablet and Desktop PCs. 

By using a [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) the application is cached on your device it is not downloaded every time you start the Cloud Player. The [Web App Manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) allows you to install the Cloud Player on your Android Homescreen

Thanks to the new [chrome mobile session API](https://developers.google.com/web/updates/2017/02/media-session) you can control the Cloud Player from your Android notification tray and lock screen. 

[Electron](https://electron.atom.io/) allows us to ship the player as a native desktop application. You can install the native desktop Cloud Player on your Mac or Windows PC and control it from your keyboard media keys (play/pause, next/previous track).

## Disclaimer
We are neither related to SoundCloud nor was this build on behalf of SoundCloud

