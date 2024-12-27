---
id: hermes
title: Using Hermes
---

* [Hermes](https://hermesengine.dev)
  * := JavaScript engine
    * open-source 
    * optimized for React Native
      * == improved start-up time + decreased memory usage + smaller app size  
    * used by default by React Native

## Bundled Hermes

* 👀React Native -- comes with a -- **bundled version** of Hermes 👀
  * build / EACH React Native's release  
    * -> Hermes version -- FULLY compatible with the -- React Native
  * see [Hermes technical implementation](../website/architecture/bundled-hermes)

## Confirming Hermes is in use

* ways to confirm Hermes is used
  * if you've created a NEW app from scratch & Hermes is enabled -> | welcome view, you would see it 

    ![Where to find JS engine status in AwesomeProject](/website/static/docs/assets/HermesApp.jpg)

  * check `HermesInternal` global variable

    ```jsx
    const isHermes = () => !!global.HermesInternal;
    ```
    * if you are using a NON-standard way of loading the JS bundle 
      * standard way of loading JS bundle | React Native & hermes -- is via -- pre-compiled bytecode (`.hbc` files)
      * _Example of NON-standard way of loading the JS bundle:_ load raw JavaScript files directly or use a different bundling method
      * -> possible that 
        * `HermesInternal` variable is available
        * BUT you are NOT using the highly optimised pre-compiled bytecode
          * -> confirm that you are using the `.hbc` files 

* way to check the benefits of Hermes
  * 👀make a release build/deployment of your app to compare 👀
    * == | build time,
      * JS code -- is compiled to -- Hermes Bytecode
    * _Example:_ | root of your project
      * | Android

        ```shell
        npm run android -- --mode="release"
        
        # or
        yarn android --mode release
        ```
      * | ios

        ```shell
        npm run ios -- --mode="Release"
        
        # or
        yarn ios --mode Release
        ```

## Switching back to JavaScriptCore

* see allowed [JavaScript engine](javascript-environment)

### Android

* | `android/gradle.properties`

  ```diff
  # Use this property to enable or disable the Hermes JS engine.
  # If set to false, you will be using JSC instead.
  hermesEnabled=false
  ```

### iOS

* | `ios/Podfile` 

  ```diff
     use_react_native!(
       :path => config[:reactNativePath],
  +    :hermes_enabled => false,
       # An absolute path to your application root.
       :app_path => "#{Pod::Config.instance.installation_root}/.."
     )
  ```
