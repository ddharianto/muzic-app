# Muzyk App
This is a front-end music app cloned from [project_music_player](https://github.com/adrianhajdin/project_music_player) created by [Adrian Hajdin](https://github.com/adrianhajdin) with a few tweaks on design and some other features. This app is using Tailwind as the main CSS styling framework and Redux for handling data/state returned from the Shazam API of RapidAPI.

## Features
- Music Player with Play, Pause, Shuffle, Next, and Previous functionality
- Top Chart of selected countries and genres
- Song Details with lyrics and music video displayed (if there are any)
- Sign in with Google OAuth

## Tech Stacks
### Front-end
- React
- Tailwind
- Redux

## What Can Be Better
### API
This project is currently using the free version of [Shazam Core](https://rapidapi.com/tipsters/api/shazam-core/) API from [RapidAPI](https://rapidapi.com/hub) which is [Shazam](https://rapidapi.com/apidojo/api/shazam) API. The difference is quite significant, in the free version there are no 'related songs' or 'related artists' and some other features and the fetched data is quite limited. The suggestion is to use the paid version of it or use [Spotify](https://rapidapi.com/Glavier/api/spotify23/) API. 
### Additional Features
#### Recommended songs/artists
Can be done by using the Shazam Core API or the free version of it but it has limited API calls to test which makes the development of this feature more difficult.
#### Playlist
To add favorite songs based on personal desire. Can be done with the addition of databases on the back-end.
### Commerce App
Adding a shop or commercial app version of this project.
### Mobile Version
Making the mobile version of this app with React Native or any other mobile programing language will makes this app to a whole new level.

## Demo
[Muzyk App](https://muzyk.netlify.app/)
