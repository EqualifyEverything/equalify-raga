# equalify-raga

This is the Equalify chrome-extension for sending usability issues straight to the Equalify API.

## table of contents

- [equalify-raga](#equalify-raga)
  - [table of contents](#table-of-contents)
  - [Structure](#structure)
    - [dummyAPI](#dummyapi)
  - [Setup](#setup)
  - [Running](#running)
  - [Updating](#updating)
    - [Background/index.ts](#backgroundindexts)
    - [manifest.json](#manifestjson)
    - [Webpack config](#webpack-config)
  - [Content Scripts](#content-scripts)
  - [Packing](#packing)
  - [Secrets](#secrets)
  - [Resources:](#resources)
    - [Original boilerplate details](#original-boilerplate-details)
      - [Features](#features)
    - [TypeScript](#typescript)
    - [Webpack auto-reload and HRM](#webpack-auto-reload-and-hrm)
    - [Intelligent Code Completion](#intelligent-code-completion)


## Structure

All your extension's code must be placed in the `src` folder.

The boilerplate is already prepared to have a popup, an options page, a background page, and a new tab page (which replaces the new tab page of your browser). But feel free to customize these.

### dummyAPI

`dummyAPI` is a dummy API for sending POST requests to instead of flooding a real end point. It uses the same `API_Constants.ts` `EqualifyIssueType`s to define the api end points.

## Setup

```bash
npm install
```

You will need to load the chrome-extension as an unpacked chrome extension into your browser. Go to `chrome://extensions/` in Chrome. Enable `Developer Mode` and then click `Load unpacked`. Navigate to this repo and select the `build/` dir to load.

## Running

The easy managed way is to run the pm2 script:

```bash
pm2 start
```
This will launch the dummyAPI server (and it's Typescript watcher) and the chrome-extension webpack dev server all in one go. You can peep the logs by saying `pm2 logs` at any time, or `pm2 dash` to get the HUD with all the deets.

## Updating

Running things under pm2 everything should automatically recompile and update. 

However, some changes require clicking the reload symbol on the `chrome://extensions` page. Maybe there's a way around this? IDK! We'll find out...

Known things that need a click of the reload are: 

### Background/index.ts

Not sure why this can't be hot reloaded. Hmm...

### manifest.json

If you change the manifest.json file you will need to manually reload the extension. add a hot key or change the permissions 

### Webpack config

If you change the webpack config make sure to `pm2 restart` since the webpack changes aren't automatically detected as a thing requiring a restart.


## Content Scripts

Although this boilerplate uses the webpack dev server, it's also prepared to write all your bundles files on the disk at every code change, so you can point, on your extension manifest, to your bundles that you want to use as [content scripts](https://developer.chrome.com/extensions/content_scripts), but you need to exclude these entry points from hot reloading [(why?)](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/4#issuecomment-261788690). To do so you need to expose which entry points are content scripts on the `webpack.config.js` using the `chromeExtensionBoilerplate -> notHotReload` config. Look the example below.

Let's say that you want use the `myContentScript` entry point as content script, so on your `webpack.config.js` you will configure the entry point and exclude it from hot reloading, like this:

```js
{
  …
  entry: {
    myContentScript: "./src/js/myContentScript.js"
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["myContentScript"]
  }
  …
}
```

and on your `src/manifest.json`:

```json
{
  "content_scripts": [
    {
      "matches": ["https://www.google.com/*"],
      "js": ["myContentScript.bundle.js"]
    }
  ]
}
```

## Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

## Secrets

If you are developing an extension that talks with some API you probably are using different keys for testing and production. Is a good practice you not commit your secret keys and expose to anyone that have access to the repository.

To this task this boilerplate import the file `./secrets.<THE-NODE_ENV>.js` on your modules through the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: '123' };
```

_./src/popup.js_

```js
import secrets from 'secrets';
ApiCall({ key: secrets.key });
```

:point_right: The files with name `secrets.*.js` already are ignored on the repository.

## Resources:

- [Webpack documentation](https://webpack.js.org/concepts/)
- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)


### Original boilerplate details

#### Features

This is a basic Chrome Extensions boilerplate to help you write modular and modern Javascript code, load CSS easily and [automatic reload the browser on code changes](https://webpack.github.io/docs/webpack-dev-server.html#automatic-refresh).

This boilerplate is updated with:

- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)
- [React 18](https://reactjs.org)
- [Webpack 5](https://webpack.js.org/)
- [Webpack Dev Server 4](https://webpack.js.org/configuration/dev-server/)
- [React Refresh](https://www.npmjs.com/package/react-refresh)
- [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
- [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)

This boilerplate is heavily inspired by and adapted from [https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate), with additional support for React 18 features, Webpack 5, and Webpack Dev Server 4.

### TypeScript

This boilerplate now supports TypeScript! The `Options` Page is implemented using TypeScript. Please refer to `src/pages/Options/` for example usages.

### Webpack auto-reload and HRM

To make your workflow much more efficient this boilerplate uses the [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) to development (started with `npm start`) with auto reload feature that reloads the browser automatically every time that you save some file in your editor.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 npm run start
```

### Intelligent Code Completion

Thanks to [@hudidit](https://github.com/lxieyang/equalify-chrome-extension/issues/4)'s kind suggestions, this boilerplate supports chrome-specific intelligent code completion using [@types/chrome](https://www.npmjs.com/package/@types/chrome).


Please open up an issue to nudge me to keep the npm packages up-to-date. FYI, it takes time to make different packages with different versions work together nicely.

---

Michael Xieyang Liu | [Website](https://lxieyang.github.io)


