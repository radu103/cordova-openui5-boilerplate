## Pre-requirements

* NodeJS LTS
* Android Studio
* Gradle
* `npm install -g npm@latest`
* `npm install -g @ui5/cli`
* `npm install -g cordova`
* `npm install -g eslint`

## UI5 tooling

UI5 app is developed in "www/webapp" folder and builds to "www/dist".

```bash
cd www
ui5 build
ui5 rebiuld
ui5 serve 
npm run lint
npm run build-self-contained
```

## Cordova App 

Serves the "www/dist" folder built by UI5 tooling)

```bash
cordova run browser
cordova run android
```

or

```bash
npm run browser
npm run android
```

## After cloning 

* `npm install` in main folder
* `cd www & npm install` in www folder

## Features

Auto load of dynamic "core" & "plugin" block components defined in folder "modules"