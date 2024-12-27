## Installing dependencies

* required dependencies
    * Node,
    * Watchman,
    * React Native CL interface,
    * Xcode
      * Reason: 🧠tooling -- to build your -- React Native app for iOS 🧠
      * | develop your app, ANY editor can be used
    * CocoaPods

### Node & Watchman
```shell
brew install node
brew install watchman
```

* requirements
    * Node v18.18+

* [Watchman](https://facebook.github.io/watchman)
    * 👀recommended for better performance 👀

### Xcode

* install Xcode -- via the -- [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
  * use the **latest version** of Xcode
  * -> ALSO install
    * iOS Simulator
    * ALL necessary tools -- to build your -- iOS app

#### Xcode Command Line Tools

* Xcode, **Settings... (or Preferences...)** , Locations panel, install the tools 

  ![Xcode Command Line Tools](/website/static/docs/assets/GettingStartedXcodeCommandLineTools.png)

#### Installing an iOS Simulator | Xcode

* **Xcode > Settings... (or Preferences...)** > **Platforms (or Components)** tab, select a simulator

#### CocoaPods

* [CocoaPods](https://cocoapods.org/)
  * := dependency management system -- for -- iOS
  * == Ruby [gem](https://en.wikipedia.org/wiki/RubyGems)
  * see [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html) 

### [Optional] Configuring your environment

* | React Native v0.69,
  * 👀you can configure the Xcode environment -- via -- `.xcode.env` 👀

* `.xcode.env`
  * environment variable | it,
    * export the path -- to the -- `node` executable
    * ways to customize it
      * with your own path or
      * your own `node` version manager
  * recommendations
    * source the `.xcode.env` | your build script phases

* if you are using [NVM](https://nvm.sh/) & [zsh](https://ohmyz.sh/) -> you can help Xcode find your Node executable

  ```zsh
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  ```

