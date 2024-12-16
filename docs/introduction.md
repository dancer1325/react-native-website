---
id: getting-started
title: Introduction
description: This helpful guide lays out the prerequisites for learning React Native, using these docs, and setting up your environment.
---

* used by
  * advanced iOS developers
  * React beginners

## Prerequisites

* JavaScript fundamentals 
  * see [Mozilla Developer's JS introduction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) 

## Interactive examples

* via Snack Player
  * == tool /
    * created by Expo
    * embed & run React Native projects | different platforms
    * code is live & editable
  * play directly | your browser
  * if you want to set up a local development environment -> follow [this guide](set-up-your-environment)

* _Example:_ 
    ```SnackPlayer name=Hello%20World
    import React from 'react';
    import {Text, View} from 'react-native';
    
    const YourApp = () => {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Try editing me! 🎉</Text>
        </View>
      );
    };
    
    export default YourApp;
    ```
