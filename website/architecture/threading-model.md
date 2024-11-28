---
id: threading-model
title: Threading Model
---

* goal
  * define the threading model
  * examples about thread usage of the render pipeline

* React Native renderer
  * -- designed to be -- thread safe
    * -- via using -- immutable data structures | framework's internals / enforced by C++ “const correctness” feature
      * == EVERY update | React -> creates or clones NEW objects | renderer (NOT update data structures) 
    * -> React's APIs are exposed
      * thread safe
      * synchronous 

* types of threads / used by renderer
  - **UI thread** / main
    - 👀ONLY thread / -- can manipulate -- host views 👀
    - if there is a HIGH priority event | UI Thread -> renderer can execute ALL the render pipeline synchronously | UI thread

      ![](/website/static/docs/assets/Architecture/threading-model/case-2.jpg)

  - **JS thread**
    - uses
      - React’s
        - render phase,
        - layout
    - MOST common scenario
      ![JS thread vs UI thread use](/website/static/docs/assets/Architecture/threading-model/case-1.jpg)

* Threading model symbols

  ![Threading model symbols](/website/static/docs/assets/Architecture/threading-model/symbols.png)


## Render Scenarios

### Default or continuous event interruption

* render phase -- due to low priority event | UI thread -- is interrupted + merged the state
  * available this scenario |
    * React
    * React Native
  * render process -- continues -- executing | JS thread

  ![](/website/static/docs/assets/Architecture/threading-model/case-3.jpg)


---

### Discrete event interruption

* render phase -- due to high priority event | UI thread -- is interrupted + merged the state 
  * render phase -- executes -- synchronously | UI thread

![](/website/static/docs/assets/Architecture/threading-model/case-4.jpg)

---

### C++ State update

* [Update](render-pipeline#react-native-renderer-state-updates) 
  * originates | UI thread
  * skips rendering phase

![](/website/static/docs/assets/Architecture/threading-model/case-6.jpg)

