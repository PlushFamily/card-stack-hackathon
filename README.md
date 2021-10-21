# card-stack-hackathon

The application was developed on [Hackathon: Sovereign Data Hackathon](https://gitcoin.co/hackathon/ceramic-identity) in the nomination [Build An App That Uses DID DataStore For Storage And Magic For Auth](https://gitcoin.co/issue/ceramicnetwork/ceramic/86/100026722).

## Features

## Demo

View on [card-stack-hackathon-zr8qz.ondigitalocean.app](https://card-stack-hackathon-zr8qz.ondigitalocean.app/)

## Screenshots

<img width="1680" alt="Screenshot 2021-10-21 at 21 34 52" src="https://user-images.githubusercontent.com/9155259/138336767-ebb425f5-e80c-4ef2-9cc0-88d0bfea34ff.png">

<img width="1680" alt="Screenshot 2021-10-21 at 21 41 33" src="https://user-images.githubusercontent.com/9155259/138337613-ba36153e-2152-4d23-877f-a6a681215181.png">

<img width="1680" alt="Screenshot 2021-10-21 at 21 42 41" src="https://user-images.githubusercontent.com/9155259/138337779-a1052779-7a2d-4033-b275-5047adff9dba.png">


## Technologies used

1. ReactJS
2. Magic Authentication
3. 3ID Connect
4. DID DataStore
5. IPFS
6. Github Actions
7. DigitalOcean Apps

## Schemes of work

https://miro.com/app/board/o9J_lp7bUq0=/?invite_link_id=346148181420

## Requirements

* NodeJS 14 or older


## Installation

1. First you need to make sure that the version of the NodeJS is 14 or older.
2. After to download the project you should to create file `.env` at the root of the project with environment variables:

```
## Magic.link API key
REACT_APP_MAGIC_KEY=pk_live_KEY
# Ceramic API key
REACT_APP_CERAMIC_API=https://domain.com
```

3. Then you need to install all project dependencies: `yarn`

## Run project

– For local development use the command `yarn start`.

– Use the command `yarn build` to build the project.
