---
id: debugging
title: Debugging Basics
---

## Opening the Dev Menu

* in-app developer menu
  * -- provided by -- React Native
  * offers SEVERAL debugging options
  * ways to access it
    * shaking your device or
    * keyboard shortcuts
      - iOS Simulator: <kbd>Ctrl</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>Z</kbd> (or Device > Shake)
      - Android emulators: <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS) or <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows and Linux)
    * run `adb shell input keyevent 82` |
      * Android devices' terminal or
      * Android emulators' terminal

    ![The React Native Dev Menu](/website/static/docs/assets/debugging-dev-menu-076.jpg)
  * disabled | production builds


## Opening DevTools

* [React Native DevTools](./react-native-devtools)
  * ways to open
    - Select "Open DevTools" in the Dev Menu
    - Press <kbd>j</kbd> from the CLI (`npx react-native start`)
  * | first launch, DevTools will open
    * welcome panel
    * console drawer 
    * | top of the window, you -- can navigate to -- OTHER panels (_Example:_ integrated React Components Inspector and Profiler)

    ![React Native DevTools opened to the "Welcome" pane](/website/static/docs/assets/debugging-rndt-welcome.jpg)

  * -- powered by a -- dedicated debugging architecture / 
    * built | React Native
    * uses a customized build of the [Chrome DevTools](https://developer.chrome.com/docs/devtools) frontend
    * -> debugging features
      * familiar,
      * browser-aligned
      * -- deeply integrated & built for -- E2E reliability
  * requirements
    * install
      * Google Chrome or
      * Microsoft Edge
    * ONLY | Hermes engine

#### Flipper & alternative debugging tools

* Flipper
  * 👀-- replaced by -- React Native DevTools 👀
    * [see here](https://shift.infinite.red/why-you-dont-need-flipper-in-your-react-native-app-and-how-to-get-by-without-it-3af461955109)
  * == Experimental Debugger + Hermes debugger (Chrome) frontends

* React Native DevTools
  * -- designed for -- debugging React app concerns
    * != replace native tools
      * == legacy debugging methods are ALSO offered
        * _Example:_ Direct JSC Debugging & Remote JS Debugging (deprecated) (see [Other Debugging Methods](./other-debugging-methods))

## LogBox

* TODO:
LogBox is an in-app tool that displays when warnings or errors are logged by your app.

![A LogBox warning and an expanded LogBox syntax error](/website/static/docs/assets/debugging-logbox-076.jpg)

:::note
LogBox is disabled in release (production) builds.
:::

### Fatal Errors

When an unrecoverable error occurs, such as a JavaScript syntax error, LogBox will open with the location of the error. In this state, LogBox is not dismissable since your code cannot be executed. LogBox will automatically dismiss once the syntax error is fixed — either via Fast Refresh or after a manual reload.

### Console Errors and Warnings

Console errors and warnings are displayed as on-screen notifications with a red or yellow badge.

- **Errors** will display with a notification count. Tap the notification to see an expanded view and to paginate through other logs.
- **Warnings** will display a notification banner without details, prompting you to open React Native DevTools.

When React Native DevTools is open, all errors except fatal errors will be hidden to LogBox. We recommend using the Console panel within React Native DevTools as a source of truth, due to various LogBox options which can hide or adjust the level of certain logs.

<details>
<summary>**💡 Ignoring logs**</summary>

LogBox can be configured via the `LogBox` API.

```js
import {LogBox} from 'react-native';
```

#### Ignore all logs

LogBox notifications can be disabled using `LogBox.ignoreAllLogs()`. This can be useful in situations such as giving product demos.

```js
LogBox.ignoreAllLogs();
```

#### Ignore specific logs

Notifications can be disabled on a per-log basis via `LogBox.ignoreLogs()`. This can be useful for noisy warnings or those that cannot be fixed, e.g. in a third-party dependency.

```js
LogBox.ignoreLogs([
  // Exact message
  'Warning: componentWillReceiveProps has been renamed',

  // Substring or regex match
  /GraphQL error: .*/,
]);
```

:::note

LogBox will treat certain errors from React as warnings, which will mean they don't display as an in-app error notification. Advanced users can change this behaviour by customising LogBox's warning filter using [`LogBoxData.setWarningFilter()`](https://github.com/facebook/react-native/blob/d334f4d77eea538dff87fdcf2ebc090246cfdbb0/packages/react-native/Libraries/LogBox/Data/LogBoxData.js#L338).

:::

</details>

## Performance Monitor

On Android and iOS, an in-app performance overlay can be toggled during development by selecting **"Perf Monitor"** in the Dev Menu. Learn more about this feature [here](/docs/performance).

![The Performance Monitor overlay on iOS and Android](/docs/assets/debugging-performance-monitor.jpg)

:::info
The Performance Monitor runs in-app and is a guide. We recommend investigating the native tooling under Android Studio and Xcode for accurate performance measurements.
:::
