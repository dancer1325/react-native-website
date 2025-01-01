---
id: getting-started-without-a-framework
title: Get Started Without a Framework
hide_table_of_contents: true
---

* supported platforms
  * 'android',
  * 'ios',
  * 'macOS',
  * 'tv',
  * 'watchOS',
  * 'web',
  * 'windows',
  * 'visionOS'

* requirements
  * follow [set up your environment](set-up-your-environment)

### Step 1: Creating a new application

<RemoveGlobalCLI />

* ways to create a NEW application
  * `npx @react-native-community/cli@latest init NewProjectName` 
    * generate a NEW project -- via -- [React Native Community CLI](https://github.com/react-native-community/cli)
  * OTHER TP CLI
    * _Example:_ [Ignite CLI](https://github.com/infinitered/ignite) 

* OTHER use cases
  * integrate React Native | EXISTING application,
  * you've installed [Expo](https://docs.expo.dev/bare/installing-expo-modules/) | your project, or
  * you're adding Android support | EXISTING React Native project 
    * see [Integration with Existing Apps](integration-with-existing-apps.md)

* Problem: with iOS
  * Attempts: | `ios/`
    ```
    bundle install
    bundle exec pod install
    ```

#### [Optional] Using a specific version or template

* `--version` 
  * start a new project -- with a -- SPECIFIC React Native version
  * _Example:_

    ```shell
    npx @react-native-community/cli@X.XX.X init NewProject --version X.XX.X
    ```

* `--template`
  * start a project -- with a -- CUSTOM React Native template
  * see [here](https://github.com/react-native-community/cli/blob/main/docs/init.md#initializing-project-with-custom-template)

### Step 2: Start Metro

* [Metro](https://metrobundler.dev/)
  * == JS build tool -- for -- React Native
    * JSX syntax -- , via [Babel](https://babel.dev/), is transformed to -- executable JavaScript
  * ways to start the Metro development server
    * `npm start`
    * `yarn start`
  * == web bundlers (_Example:_ Vite, webpack) 

### Step 3: Start your application

* goal
  * Metro Bundler run | its own terminal
* | NEW terminal,
  * ways to run
    * `npm run android` or
    * `yarn android`
    * if you have got problems -> see the [Troubleshooting](troubleshooting.md)

### Step 4: Modifying your app

* if you modify your app (_Example:_ `App.tsx`) & you want to reflect the changes -> press the <kbd>R</kbd> key twice OR select `Reload` | Dev Menu (<kbd>Ctrl</kbd> + <kbd>M</kbd>)
