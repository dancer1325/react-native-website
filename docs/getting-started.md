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
  * provided features
    * file-based routing,
    * high-quality universal libraries,
    * enable to write plugins / modify native code WITHOUT having to manage native files

## Start a new React Native project with Expo

* TODO:
<PlatformSupport platforms={['android', 'ios', 'tv', 'web']} />

Expo is a production-grade React Native Framework. Expo provides developer tooling that makes developing apps easier, such as file-based routing, a standard library of native modules, and much more.

Expo's Framework is free and open source, with an active community on [GitHub](https://github.com/expo) and [Discord](https://chat.expo.dev). The Expo team works in close collaboration with the React Native team at Meta to bring the latest React Native features to the Expo SDK.

The team at Expo also provides Expo Application Services (EAS), an optional set of services that complements Expo, the Framework, in each step of the development process.

To create a new Expo project, run the following in your terminal:

```shell
npx create-expo-app@latest
```

Once you’ve created your app, check out the rest of Expo’s getting started guide to start developing your app.

<BoxLink href="https://docs.expo.dev/get-started/set-up-your-environment">Continue with Expo</BoxLink>
