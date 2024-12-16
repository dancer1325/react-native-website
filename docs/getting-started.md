---
id: environment-setup
title: Get Started with React Native
hide_table_of_contents: true
---

* React Native
  * allows
    * React developers -> can create native apps
    * native developers -- can, via React Native, gain -- parity between native platforms
      * Reason: 🧠write COMMON features 1! 🧠
  * recommendations
    * 👀use React Native -- through a -- **Framework** 👀
      * Reason: 🧠 provide from the start, core features for,
        * approaches to navigation,
        * accessing native APIs,
        * dealing with native dependencies,
        * ...🧠
      * if you do NOT use a framework 
        * -> 👀you need to spend to add & maintain 👀
          * write your own solutions / implement core features, or
          * add collection of pre-existing libraries -- to create a -- skeleton of a Framework
        * see
          * [set up your environment](set-up-your-environment)
          * [get started without a framework](getting-started-without-a-framework)
      * _Example:_ [Expo](https://expo.dev)

* Expo
  * := production-grade React Native Framework /
    * free
    * open source
  * [Discord community](https://chat.expo.dev)
  * provided features
    * file-based routing,
    * high-quality universal libraries,
    * enable to write plugins / modify native code WITHOUT having to manage native files
  * Expo team works -- in close collaboration with the -- React Native team
  * Expo Application Services (EAS)
    * == optional set of services / complements Expo

## Start a new React Native project with Expo

* supported platforms
  * 'android',
  * 'ios', 
  * 'tv',
  * 'web'

* `npx create-expo-app@latest`
  * create a NEW Expo project

* see [Expo’s getting started](https://docs.expo.dev/get-started/set-up-your-environment)
