<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework example for setting up the authentication using JWT with the concept of refresh token.

## Installation

```bash
$ npm install
```

## Setup
1. Create a keys folder on the top level.
2. Inside keys folder create these files - jwt-token-private.key, jwt-token-public.key, refresh-private.key, refresh-token-public.key.
3. Now generate the RSA public and private key pair (can use this site to generate https://cryptotools.net/rsagen).
4. Paste the private key content in `jwt-token-private.key` and public key content in `jwt-token-public.key`.
5. Now generate the new RSA key pair and paste the private key in `refresh-private.key` and public key content in `refresh-token-public.key.`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## using the APIs - 

1. Add the new user 
```bash
curl --location --request POST 'http://localhost:3000/user/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "emailId": "admin@example.com",
    "password": "1234567",
    "firstName": "Admin",
    "lastName": "example",
    "companyName": "myCompany"
}'
```

2. login 
```bash
curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "emailId": "admin@example.com",
    "password": "1234567"
}'
```

3. token Info 
```bash
curl --location --request POST 'http://localhost:3000/auth/login' \
curl --location --request GET 'http://localhost:3000/user/tokenInfo' \
--header 'Authorization: Bearer <acces_token received in the response of auth/login API>'
```

4. Refresh Token
```bash
curl --location --request POST 'http://localhost:3000/auth/refreshToken' \
--header 'Authorization: Bearer <refreshToken received int the response of auth/login API>' \
--data-raw ''
```

* Note for the simplicity fo the project have not used any DB, TypeORM, dotenv modules. The main idea was to keep it simple with a clean approach for the example of refresh token with jwt.
