## Introduction:

[Imgur](https://imgur.com/) is an image hosting and sharing site, favoured by users of social media and social news sitesbecause of its ease of use and flexibility.
The goal of this project was to build an Android/IOS application which use and implement online photo sharing using [Imgur](https://imgur.com/) API.
For this project we choose to develop our app in react-native, a framework for building native apps using React.

## Summary:
* [Requirements](#user-content-requirements) 
* [Installation](#user-content-installation) 
* [Usage](#user-content-usage) 
* [Features](#user-content-features) 
* [Authors](#user-content-authors) 

## Requirements:

- nodejs
- npm
- react
- react-native
- expo
- redux

## Installation:

#### Get Node.js and npm:
**Fedora**

```sh
sudo dnf install nodejs
```
**Arch Linux**

```sh
pacman -S nodejs npm
```
**Ubuntu**

```sh
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Get React Native and Expo:
```sh
npm install -g expo-cli
```

#### Get Redux:
```sh
npm install @reduxjs/toolkit
```

## Usage:

**Run App with:**
```sh
npm install
sudo expo start
```

**Get Hybrid App with:**
```sh
npm install
sudo expo build:android  # Android
sudo expo build:ios      # IOs
```

## Features:

The app is decomposed into 5 differents screens (1 for each functionnality): [Home](#user-content-home), [Like](#user-content-like), [Search](#user-content-search), [Upload](#user-content-upload) and [Profile](#user-content-profile) screen.
You can swipe or simply press the logo at the bottom of your mobile screen to navigate between each functionnality.

### Home:
 - Here you can see the most viral pictures post by users
 - Scroll down to see more pictures
 - You can like an image simply by pressing the **like button** below, and then go to see it in the [Like](#user-content-like) screen

### Like:
 - Here you can see only pictures you liked before
 - Scroll down to see more pictures
 - You **must be logged in** to access this functionnality

### Search:
 - To use this functionnality, enter a **keyword** in the search bar and then press the **submit** button
 - You will then see images corresponding to the keyword you entered
 - Scroll down to see more pictures
 - You can search for another **keyword** whenever you want

### Upload:
 - Click the **upload from gallery**, and then chose an image from your **gallery** to be upload on the [Imgur](https://imgur.com/) platform
 - Click the **upload from camera**, and then take a photo with your **camera** to upload it on the [Imgur](https://imgur.com/) platform
 - **Permissions** on your phone's Camera/Gallery **must be granted** by the user to use these functionnalities

### Profile:
 - Here you can log in to the [Imgur](https://imgur.com/) platform and then authorize Epicture to use your [Imgur](https://imgur.com/) account
 - Press the **logout** button to disconnect from Epicture

## Authors:

Michel KUSY / Quentin MAILLARD
