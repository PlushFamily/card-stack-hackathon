# CardStack

**CardStack** – a mood tracker that uses DID DataStore For Storage And Magic For Auth.

After passing a short quiz, the user can to get information about his emotional mood, compare with the results of the past days and share the result with friends!

The application was developed on [Hackathon: Sovereign Data Hackathon](https://gitcoin.co/hackathon/ceramic-identity) in the nomination [Build An App That Uses DID DataStore For Storage And Magic For Auth](https://gitcoin.co/issue/ceramicnetwork/ceramic/86/100026722).

## Features

* Authenticating in the application using Magic(Magic link/OAuth 2.0)
* After authorization in Magic, there will be an login or registration new identity via 3ID Connect
* Loading user data from IDX and fetch data on past attempts the quiz from DID DataStore
* On the settings page, users can update personal information which stored in IDX
* Saving data about attempts in the DID DataStore

## Demo

View on [card-stack-hackathon-zr8qz.ondigitalocean.app](https://card-stack-hackathon-zr8qz.ondigitalocean.app/)

## Screenshots

<img width="1680" alt="Login page" src="https://user-images.githubusercontent.com/9155259/138336767-ebb425f5-e80c-4ef2-9cc0-88d0bfea34ff.png">*Login page*

<img width="1680" alt="First login with new ETH wallet" src="https://user-images.githubusercontent.com/9155259/138349321-557af0b6-6303-49b0-a811-e69a0e3240c2.png">*First login with new ETH wallet*

<img width="1680" alt="Quiz stage" src="https://user-images.githubusercontent.com/9155259/138337613-ba36153e-2152-4d23-877f-a6a681215181.png">*Quiz stage*

<img width="1680" alt="End of quiz" src="https://user-images.githubusercontent.com/9155259/138349509-c53a9279-5c06-49c4-9349-42ea82fbc584.png">*End of quiz*

<img width="1680" alt="Settings page" src="https://user-images.githubusercontent.com/9155259/138337779-a1052779-7a2d-4033-b275-5047adff9dba.png">*Settings page*


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
* Metamask


## Installation

1. First you need to make sure that the version of the NodeJS is 14 or older.
2. After to download the project you should to create file `.env` at the root of the project with environment variables:

```
# Magic.link API key
REACT_APP_MAGIC_KEY=pk_live_KEY
# Ceramic API key
REACT_APP_CERAMIC_API=https://domain.com
```

*You can to get your **REACT_APP_MAGIC_KEY** after registration on https://magic.link/ and created application*

*For value **REACT_APP_CERAMIC_API** you should to type one of the Ceramic node's url. For example: https://ceramic-clay.3boxlabs.com*

3. Then you need to install all project dependencies: `yarn`

## Run project

– For local development use the command `yarn start`.

– Use the command `yarn build` to build the project.
