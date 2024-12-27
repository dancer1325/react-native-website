---
id: bundled-hermes
title: Bundled Hermes
---

* goal
  * **how** Hermes & React Native **are built**

## What is 'Bundled Hermes'

* | React Native v0.69.0+,
  * **Bundled Hermes**
    * := distribution model / 
      * 👀EVERY version of React Native + **built alongside** to a Hermes version 👀
        * == JS engine / alongside EACH React Native version, has been
          * built
          * tested
            * -> you can use 

## Why we moved to 'Bundled Hermes'

* Historically,
  * 👀React Native's release process != Hermes's release process 👀
    * -> confusion if a specific version of Hermes -- was compatible with a -- specific version of React Native

* [Hermes' JSI code](https://github.com/facebook/hermes/tree/main/API/jsi/jsi) == [React Native's JSI code](https://github.com/facebook/react-native/tree/main/packages/react-native/ReactCommon/jsi/jsi)
  * ❌if the JSI get out of sync -> build of Hermes -- NOT compatible with a -- build of React Native ❌
    * see [here](https://github.com/react-native-community/discussions-and-proposals/issues/257)

* Nowadays
  * React Native release process 
    * includes
      * download Hermes
      * build Hermes
      * | build Hermes
        * 1! copy of JSI is used

## How this will impact | app developers

* NO impact
  * == transparent to you

### iOS Users

* we've moved the `hermes-engine` / you're using
* | React Native v0.69-
  * users -- would download a -- [pod](https://github.com/CocoaPods/Specs/blob/master/Specs/5/d/0/hermes-engine/0.11.0/hermes-engine.podspec.json)
* | React Native v0.69+
  * users -- would instead use a -- podspec / 
    * defined | `react-native` NPM package's `sdks/hermes-engine/hermes-engine.podspec`
    * relies on a
      * pre-built tarball of Hermes / upload | Maven
      * React Native GitHub Release (_Example:_ [React Native v0.70.4](https://github.com/facebook/react-native/releases/tag/v0.70.4))

### Android Users

* update the [`android/app/build.gradle`](https://github.com/facebook/react-native/blob/main/template/android/app/build.gradle)

  ```diff
  dependencies {
      // ...
  
      if (enableHermes) {
  +       implementation("com.facebook.react:hermes-engine:+") {
  +           exclude group:'com.facebook.fbjni'
  +       }
  -       def hermesPath = "../../node_modules/hermes-engine/android/";
  -       debugImplementation files(hermesPath + "hermes-debug.aar")
  -       releaseImplementation files(hermesPath + "hermes-release.aar")
      } else {
          implementation jscFlavor
      }
  }
  ```

* | React Native v0.69-,
  * users -- will be consuming -- `hermes-engine` NPM package's 
    * `hermes-debug.aar`
    * `hermes-release.aar` 

* | React Native v0.69+,
  * users -- will be consuming -- `react-native` NPM package's Android multi-variant artifacts / available | `android/com/facebook/react/hermes-engine/` 
    * React Native [will remove the `hermes-engine` dependency soon](https://github.com/facebook/react-native/blob/c418bf4c8fe8bf97273e3a64211eaa38d836e0a0/package.json#L105)

#### Android Users | New Architecture

* 👀users | New Architecture -> will build Hermes & React Native -- from -- source 👀
  * Reason: 🧠due to the nature of our native code build setup == how to use the NDK 🧠 
  * -> Android first build performance hit 
    * if you want to optimize your build time -> see [speeding up your Build phase](/docs/build-speed.md)

#### Android Users | New Architecture building | Windows
* TODO:
* extra steps
  * Make sure the [environment is configured properly](https://reactnative.dev/docs/environment-setup), with Android SDK & node.
  * Install [cmake](https://community.chocolatey.org/packages/cmake) with Chocolatey
  * Install either:
    * [Build Tools for Visual Studio 2022](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022).
    * [Visual Studio 22 Community Edition](https://visualstudio.microsoft.com/vs/community/) - Picking only the C++ desktop development is sufficient.
    * Make sure the [Visual Studio Command Prompt](https://docs.microsoft.com/en-us/visualstudio/ide/reference/command-prompt-powershell?view=vs-2022) is configured correctly. This is required as the proper C++ compiler environment variable is configured in those command prompt.
    * Run the app with `npx react-native run-android` inside a Visual Studio Command Prompt.

### Can users still use another engine?

* enable/disable Hermes
  * | Android, 
    * `enableHermes` variable
      * | React Native 0.70,
        * by default, `enableHermes=true`
  * | iOS, 
    * `hermes_enabled` variable
      * | React Native 0.70,
        * by default, `hermes_enabled=true`

## How this will impact | contributor and extension developers

### How is Bundled Hermes working under the hood?

* relies on **downloading a tarball of Hermes source code** -- from the -- `facebook/react-native` repository's `facebook/hermes` repository
  * == **git submodule**
  * == mechanism -- for -- OTHER native dependencies (_Example:_ Folly, Glog, etc.)
  * _Examples:_
    * _Example1:_ if you build React Native from `main` -> you fetch a tarball of `facebook/hermes` repository's `main`
    * _Example2:_ if you build React Native from a release branch -> you fetch a tarball of `facebook/hermes` repository's tag
      * specific tag name used is stored | `sdks/.hermesversion`
        * _Example:_ [file | v0.69](https://github.com/facebook/react-native/blob/0.69-stable/sdks/.hermesversion)

#### Android implementation details

* TODO:
To implement this on Android, we've added a new build inside the `/ReactAndroid/hermes-engine` of React Native that will take care of building Hermes and packaging for consumption ([See here for more context](https://github.com/facebook/react-native/pull/33396)).

You can now trigger a build of Hermes engine by invoking:

```bash
// Build a debug version of Hermes
./gradlew :ReactAndroid:hermes-engine:assembleDebug
// Build a release version of Hermes
./gradlew :ReactAndroid:hermes-engine:assembleRelease
```

from the React Native `main` branch.

You won't need to install extra tools (such as `cmake`, `ninja` or `python3`) in your machine as we configured the build to use the NDK versions of those tools.

On the Gradle consumer side, we also shipped a small improvement on the consumer side: we moved from `releaseImplementation` & `debugImplementation` to `implementation`. This is possible because the newer `hermes-engine` Android artifact is **variant aware** and will properly match a debug build of the engine with a debug build of your app. You don't need any custom configuration here (even if you use `staging` or other build types/flavors).

However, this made this line necessary in the template:

```
exclude group:'com.facebook.fbjni'
```

This is needed as React Native is consuming `fbjni` using the non-prefab approach (i.e. unzipping the `.aar` and extracting `.so` files). Hermes-engine, and other libraries, are using prefab instead to consume fbjni. We're looking into [addressing this issue](https://github.com/facebook/react-native/pull/33397) in the future so the Hermes import will be a oneliner.

#### iOS implementation details

The iOS implementation relies on a series of scripts that lives in the following locations:

- [`/scripts/hermes`](https://github.com/facebook/react-native/tree/main/scripts/hermes). Those scripts contain logic to download the Hermes tarball, unzip it, and configure the iOS build. They're invoked at `pod install` time if you have the `hermes_enabled` field set to `true`.
- [`/sdks/hermes-engine`](https://github.com/facebook/react-native/tree/main/sdks/hermes-engine). Those scripts contain the build logic that is effectively building Hermes. They were copied and adapted from the `facebook/hermes` repo to properly work within React Native. Specifically, the scripts inside the `utils` folder are responsible of building Hermes for all the Mac platforms.

Hermes is built as part of the `build_hermes_macos` Job on CircleCI. The job will produce as artifact a tarball which will be downloaded by the `hermes-engine` podspec when using a published React Native release ([here is an example of the artifacts created for React Native 0.69 in `build_hermes_macos`](https://app.circleci.com/pipelines/github/facebook/react-native/13679/workflows/5172f8e4-6b02-4ccb-ab97-7cb954911fae/jobs/258701/artifacts)).

##### Prebuilt Hermes

If there are no prebuilt artifacts for the React Native version that is being used (i.e. you may be working with React Native from the `main` branch), then Hermes will need to be built from source. 
First, the Hermes compiler, `hermesc`, will be built for macOS during `pod install`, then Hermes itself will be built as part of the Xcode build pipeline using the `build-hermes-xcode.sh` script.

##### Building Hermes from source

Hermes is always built from source when using React Native from the `main` branch. If you are using a stable React Native version, you can force Hermes to be built from source by setting the `CI` envvar to `true` when using CocoaPods: `CI=true pod install`.

##### Debug symbols

The prebuilt artifacts for Hermes do not contain debug symbols (dSYMs) by default. We're planning on distributing these debug symbols for each release in the future. Until then, if you need the debug symbols for Hermes, you will need to build Hermes from source. A `hermes.framework.dSYM` will be created in the build directory alongside each of the Hermes frameworks.

### I'm afraid this change is impacting me

We'd like to stress that this is essentially an organizational change on _where_ Hermes is built and _how_ the code is syncronized between the two repositories. 
The change should be fully transparent to our users.

Historically, we used to cut a release of Hermes for a specific version of React Native (e.g. [`v0.11.0 for RN0.68.x`](https://github.com/facebook/hermes/releases/tag/v0.11.0)).

With 'Bundled Hermes', you can instead rely on a tag that will represent the version used when a specific version of React Native was cut.
