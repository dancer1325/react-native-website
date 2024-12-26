---
id: metro
title: Metro
---

* [Metro](https://metrobundler.dev/)
  * used by 
    * 👀React Native -- to -- build your JavaScript code and assets 👀

## Configuring Metro

* your project's `metro.config.js`
  * Metro configuration options
  * export either
    * **an object**
      * 👀 recommended 👀
      * will be merged | top of Metro's internal config defaults
    * [**a function**](#advanced-using-a-config-function) /
      * called with Metro's internal config defaults
      * should return a final config object
      * uses
        * read the Metro's base default config object
        * set options dynamically
      * use cases
        * advanced
  * default one  

    <!-- prettier-ignore -->
    ```js
    const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
    
    /**
     * Metro configuration
     * https://metrobundler.dev/docs/configuration
     *
     * @type {import('metro-config').MetroConfig}
     */
    const config = {};    // object to customize
    
    module.exports = mergeConfig(getDefaultConfig(__dirname), config);
    ```

* requirements | your React Native projects
  * [`@react-native/metro-config`](https://www.npmjs.com/package/@react-native/metro-config) or 
  * [`@expo/metro-config`](https://www.npmjs.com/package/@expo/metro-config)

### Advanced: Using a config function

* | `@react-native/metro-config` v0.72.1+
  * 👀if you want to access the complete default config -> NO longer necessary to use a config function 👀 
  * _Examples:_
    * _Example1:_

      <!-- prettier-ignore -->
      ```js
      const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
    
      module.exports = function (baseConfig) {
        const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));
        const {resolver: {assetExts, sourceExts}} = defaultConfig;
    
        return mergeConfig(
          defaultConfig,
          {
            resolver: {
              assetExts: assetExts.filter(ext => ext !== 'svg'),
              sourceExts: [...sourceExts, 'svg'],
            },
          },
        );
      };
      ```

    * _Example2:_ customise `sourceExts` -- reading the -- defaults from `@react-native/metro-config`

        <!-- prettier-ignore -->
        ```js
        const defaultConfig = getDefaultConfig(__dirname);
        
        const config = {
        resolver: {
            sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
          },
        };
        
        module.exports = mergeConfig(defaultConfig, config);
        ```
    
      * recommendations
        * if you want to override -> copy + edit

            <!-- prettier-ignore -->
            ```js
            const config = {
            resolver: {
                sourceExts: ['js', 'ts', 'tsx', 'svg'],
            },
            };
            ```

## Learn more about Metro

- [Metro website](https://metrobundler.dev/)
- [Metro configuration](https://metrobundler.dev/docs/configuration)
- [Video: "Metro & React Native DevX" talk at App.js 2023](https://www.youtube.com/watch?v=c9D4pg0y9cI)
