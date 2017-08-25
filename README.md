# qobuz
Qobuz client library for Node.js

## Installation
Add the package to your application.

```
npm install --save qobuz
```

## Getting started

Import the Qobuz class into your application and initialize it with your `appId` and `appSecret` (if needed).

```
const Qobuz = require('qobuz');
const client = new Qobuz('100000000');
```

Use functions from various endpoints like album, artist, or playlist.

```
client.album.get('0886443927087')
  .then(album => console.log(album.title)) // Random Access Memories (Édition Studio Masters)
;
```

## Continuous Integration

[![CircleCI](https://circleci.com/gh/fvilers/qobuz/tree/master.svg?style=svg&circle-token=290f1b3ff86876bddb8589d9a966db6e1d245ab1)](https://circleci.com/gh/fvilers/qobuz/tree/master)
