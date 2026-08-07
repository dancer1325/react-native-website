# What is Codegen?

* **Codegen**
  * == tool /
    * allows
      * generate scaffolding code
        * -> avoid writing REPETITIVE code == save time
    * tightly coupled -- with a -- React Native app
    * uses
      * OPTIONAL
        * OTHERWISE, you write ALL the generated code MANUALLY
    * use cases
      * / EACH time to build an iOS OR Android app,
        * React Native AUTOMATICALLY invokes it (== call Codegen scripts)
      * | develop [Turbo Native Modules](../turbo-native-modules) + Fabric Native Components,
        * you can run MANUALLY 
  * scripts
    * live | `react-native` NPM package

## How Codegen Works

* Codegen 
  * crawls your project's folders
    * starting from
      * directory / you specify | your "package.json"
    * looking for
      * ".js" / contain the specification -- for -- your custom modules and components
  * | find a spec file,
    * generate boilerplate code / associated with it
      * C++ glue-code
      * platform-specific code
        * | Android,
          * Java code
        * | iOS,
          * Objective-C++

* Spec files
  * == ".js" /
    * written | typed dialect   
      * supported by React Native
        * Flow
        * TypeScript
