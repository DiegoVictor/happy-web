# [Web] Happy
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/DiegoVictor/happy-web/config.yml?logo=github&style=flat-square)](https://github.com/DiegoVictor/happy-web/actions)
[![typescript](https://img.shields.io/badge/typescript-3.7.5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/reactjs-16.13.1-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![styled-components](https://img.shields.io/badge/styled_components-5.2.0-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-6.8.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-24.9.0-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/happy-web?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/happy-web)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://raw.githubusercontent.com/DiegoVictor/happy-web/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>

This web version allow users to look for orphanages near from yourself, see details about it and create new ones.

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [Configuring](#configuring)
      * [.env](#env)
      * [API](#api)
* [Usage](#usage)
* [Running the tests](#running-the-tests)
  * [Coverage Report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/happy-web/main/screenshots/landing.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/happy-web/main/screenshots/map.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/happy-web/main/screenshots/form.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/happy-web/main/screenshots/orphanage.png" width="49%"/>

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
Configure your environment variables and remember to start the [API](https://github.com/DiegoVictor/happy-api) before to start this app.

### .env
In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

key|description|default
---|---|---
REACT_APP_API_URL|API's url with version (v1)|`http://localhost:3333/v1`

### API
Start the [API](https://github.com/DiegoVictor/happy-api) (see its README for more information). In case of any change in the API's `port` or `host` remember to update the [`.env`](#env) too.

# Usage
To start the app run:
```
$ yarn start
```
Or:
```
npm run start
```

# Running the tests
[Jest](https://jestjs.io) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage Report
To generate/update the coverage report:
```
$ yarn test:coverage
```
Or:
```
$ npm run test:coverage
```
> You can see the coverage report inside `tests/coverage`.
