<div align="center">
    <img src="https://i.imgur.com/NuFogo7.png" alt="Logo" width="240">
    <h1>World Affairs Conference</h1>
    <p>North America's largest and Canada's oldest annual student-run current events conference.</p>
</div>

![Codecov](https://img.shields.io/codecov/c/github/worldaffairsconference/worldaffairscon.org) ![Netlify](https://img.shields.io/netlify/4e98066d-e3af-45bd-8af5-e22bba156e34) ![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/worldaffairsconference/worldaffairscon.org/deploy-prod.yaml) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# WAC-Pasiphae

> A new era of World Affairs Conference information technology infrastructure

## Local Development

### Setup

1. Install [Node.js 20.x.x](https://nodejs.org/en), [GitHub CLI](https://cli.github.com/), [PNPM](https://pnpm.io/installation), and [Firebase CLI](https://firebase.google.com/docs/cli).
2. Clone the repository locally.
    ```shell
    gh repo clone worldaffairsconference/worldaffairs.ucc.on.ca
    ```
3. Install dependencies.
    ```shell
    pnpm i
    ```
4. Set the Firebase project.
    ```
    firebase use test
    ```
5. Copy `.env.example` into `.env` and fill in the environment variable values from the Vault.

### Usage

-   To start the Firebase (Firestore + Auth) emulator, run
    ```shell
    firebase emulators:start --import ./firebase/emulator-data --export-on-exit
    ```
-   To start the development server, run
    ```shell
    pnpm dev
    ```
-   To run the unit tests, use
    ```shell
    pnpm test:unit         # To run once
    pnpm test:unit:watch   # To watch for file changes
    ```
-   To run end-to-end tests, run
    ```
    pnpm test:e2e
    ```

### Source control

-   All commit messages should be formatted according to [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). This repository is [Commitizen-friendly](https://github.com/commitizen/cz-cli), so running `git commit` should automatically open a prompt to ensure conformity.
-   Commits should **never** be pushed directly to the `main` branch, as this would bypass the testing phase. Instead, every code modification should be made as a pull request.
