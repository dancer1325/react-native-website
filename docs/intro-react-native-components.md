---
id: intro-react-native-components
title: Core Components and Native Components
description: 'React Native lets you compose app interfaces using Native Components. Conveniently, it comes with a set of these components for you to get started with right now—the Core Components!'
---

* React Native
  * how does it work?
    * using JavaScript, you can
      * access your [platform’s APIs](native-platforms.md)
      * describe your UI's appearance and behavior -- via -- React components

* React components
  * == bundles of reusable & nestable code
  * 👀's API structure == React Native's API structure 👀

## Views and mobile development

* | Android and iOS development
  * **view**
    * 👀== basic building block of UI 👀
    * == small rectangular element | screen /
      * allows
        * displaying text, images
        * respond -- to -- user input
      * _Example:_ line of text or a button
    * 👀SOME kinds of views -- can contain -- OTHER views 👀

![](../website/static/docs/assets/diagram_ios-android-views.svg)

## Native Components

* Views
  * are written | 
    * Android development, in Kotlin or Java
    * iOS development, in Swift or Objective-C
  * | React Native
    * -- are invoked, via React components, with -- JavaScript
    * 👀| runtime, React Native -- creates the corresponding -- Android and iOS views 👀 == **Native Components**

* React Native's **Core Components**
  * == Native Components
    * built-in
    * set of essential
    * ready-to-use
  * controls -- to -- activity indicators
  * == subset of React Components
  ![React Native's Core Components == subset of React Components / ship with React Native](/website/static/docs/assets/diagram_react-native-components.svg)

* React Native
  * lets you build your OWN Native Components for
    * [Android](legacy/native-components-android.md)
    * [iOS](legacy/native-components-ios.md) 
  * 👀see [Native Community components](https://reactnative.directory) 👀

## Core Components

* [here](components-and-apis) 

* MOST common one
  * ⚠️this documentation 
    * -- refers to a -- legacy set of API
    * needs to be updated to the New Architecture ⚠️

| React Native UI Component | Android View   | iOS View         | Web Analog              | Description                                                                                            |
| ------------------------- | -------------- | ---------------- | ----------------------- |--------------------------------------------------------------------------------------------------------|
| `<View>`                  | `<ViewGroup>`  | `<UIView>`       | A non-scrolling `<div>` | container / supports layout -- with -- flexbox, style, some touch handling, and accessibility controls |
| `<Text>`                  | `<TextView>`   | `<UITextView>`   | `<p>`                   | Displays, styles, and nests strings of text & handles touch events                                     |
| `<Image>`                 | `<ImageView>`  | `<UIImageView>`  | `<img>`                 | Displays different types of images                                                                     |
| `<ScrollView>`            | `<ScrollView>` | `<UIScrollView>` | `<div>`                 | generic scrolling container / can contain MULTIPLE components & views                                  |
| `<TextInput>`             | `<EditText>`   | `<UITextField>`  | `<input type="text">`   | Allows the user to enter text                                                                          |
