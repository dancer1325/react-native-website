## Installing dependencies

* required dependencies
  * Node,
  * Watchman,
  * React Native CL interface,
  * JDK,
  * Android Studio
    * Reason: 🧠tooling -- to build your -- React Native app for Android 🧠
    * | develop your app, ANY editor can be used

### Node & Watchman

```shell
brew install node
brew install watchman
```

* requirements
  * Node v18.18+

* [Watchman](https://facebook.github.io/watchman)
  * 👀recommended for better performance 👀

### Java Development Kit

* recommended installing the OpenJDK distribution Azul **Zulu**

```shell
brew install --cask zulu@17

# Get path to where cask was installed to find the JDK installer
brew info --cask zulu@17

# ==> zulu@17: <version number>
# https://www.azul.com/downloads/
# Installed
# /opt/homebrew/Caskroom/zulu@17/<version number> (185.8MB) (note that the path is /usr/local/Caskroom on non-Apple Silicon Macs)
# Installed using the formulae.brew.sh API on 2024-06-06 at 10:00:00

# Navigate to the folder
open /opt/homebrew/Caskroom/zulu@17/<version number> # or /usr/local/Caskroom/zulu@17/<version number>
```

* add or update your `JAVA_HOME` environment variable | `~/.zshrc` or `~/.bash_profile`
  * _Example:_ if JDK located | `/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`

    ```shell
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
    ```

* recommendations
  * JDK 17
    * Reason: 🧠 if you use JDK v17+ -> you MAY encounter problems 🧠

### Android development environment

#### <h4 id="android-studio">1. Install Android Studio</h4>

* [Download and install Android Studio](https://developer.android.com/studio/index.html)
  * check that you select
    * `Android SDK`
    * `Android SDK Platform`
    * `Android Virtual Device`

#### <h4 id="android-sdk">2. Install the Android SDK</h4>

* Android SDK
  * by default, it's installed with Android Studio
  * ⚠️if you want to build a React Native app / native code -> install `Android 15 (VanillaIceCream)` SDK ⚠️
    * check | 
      * Android SDK > SDK Platforms &
        * select "Show Package Details"
      * Android SDK > SDK Tools
        * select "Show Package Details"
  * if you want to install additional Android SDKs -> use the Android Studio's SDK Manager 

![Android Studio Welcome](/website/static/docs/assets/GettingStartedAndroidStudioWelcomeMacOS.png)

#### <h4>3. Configure the ANDROID_HOME environment variable</h4>

* 👀environment variables / required by React Native tools -- to -- build apps with native code 👀
  * add | 
    * `~/.zprofile` or `~/.zshrc` or
    * if you are using `bash` -> `~/.bash_profile` or `~/.bashrc`

    ```shell
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```
  * run `source ~/.zprofile` (or `source ~/.bash_profile` for `bash`)
    * Reason: 🧠to load the config | your current shell 🧠
  * verify them

    ```shell
    echo $ANDROID_HOME
    echo $PATH
    ```

## <h2>Preparing the Android device</h2>

* uses
  * run your React Native Android app | v 
* ways
  * physical Android device, or
  * Android Virtual Device

### <h3>Using a physical device</h3>

* plug it | your computer 
  * -- via -- USB cable
  * follow [these instructions](running-on-device.md)

### <h3>Using a virtual device</h3>

* steps
  * open `./AwesomeProject/android` | Android Studio
  * see the list of available Android Virtual Devices (AVDs) | Android Studio's "AVD Manager"

    ![Android Studio AVD Manager](/website/static/docs/assets/GettingStartedAndroidStudioAVD.png)

  * if you want to [create a new AVD](https://developer.android.com/studio/run/managing-avds.html)
    * 👀select the **VanillaIceCream** API Level 35 👀
