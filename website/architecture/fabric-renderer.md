---
id: fabric-renderer
title: Fabric
---

* Fabric
  * 👀== React Native's NEW rendering system 👀
    * NEW ==
      * | 2018
        * began it's development 
      * | 2021
        * used by Facebook app 
    * == conceptual evolution of LEGACY render system
    * 💡core principles💡
      * unify more render logic | C++,
      * improve interoperability -- with -- [host platforms](architecture-glossary.md#host-platform),
      * unlock NEW capabilities for React Native
  * see [glossary](architecture-glossary.md#fabric-renderer)
  * avoids
    * platform specifics
    * code snippets or pointers

* goal of this documentation
  * Fabric's
    * key concepts,
    * motivation,
    * benefits,
    * render pipeline | different scenarios

## Motivations and Benefits of the new renderer

* render architecture
  * -- redesigned to -- 
    * unlock better UX
      * _Example:_
        * renderer can measure & render synchronously React surfaces  
          * Reason: 🧠[host views](architecture-glossary.md#host-view-tree-and-host-view) -- has improved interoperability with -- React views 🧠
          * | legacy architecture
            * React Native layout was asynchronous -> layout “jump” issue | embed a React Native rendered view | _host view_
        * renderer -- can prioritize certain -- user interactions / handled in a timely manner
          * -- via -- multi-priority & synchronous events 
        * [Integration -- with -- React Suspense](https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html)
          * -> MORE intuitive design of data fetching | React apps
        * Enable React [Concurrent Features](https://github.com/reactwg/react-18/discussions/4) | React Native
        * Easier to implement server side rendering | React Native
    * benefits about code quality, performance, and extensibility
      - **Type safety:**
        - ACROSS JS and [host platforms](architecture-glossary.md#host-platform) 
        - code generation
          - -- via -- JS component declarations
          - --generate -- C++ structs / hold the props
        - if JS component mismatch with host component props -> triggers a build error
      - **Shared C++ core**
        - renderer is implemented in C++ / 's core -- is shared among -- platforms 
          - ->
            - higher consistency
            - easier to adopt React Native | NEW platforms
      - **Better Host Platform Interoperability**
        - Reason: 🧠Synchronous and thread-safe layout calculation -- improves -- UX | embed host components | React Native 🧠
        - -> easier integration with host platform frameworks / require synchronous APIs
      - **Improved Performance**
        - performance improvements | concrete platform -> can be applied | EVERY platform
          - Reason: 🧠 NEW cross-platform implementation of the renderer system 🧠
        - _Example:_ view flattening originally was a performance solution | Android -> NOW provided | Android and iOS
      - **Consistency AMONG different platforms**
        - Reason: 🧠 NEW render system is cross-platform 🧠
      - **Faster Startup**
        - 👀Host components are lazily initialized by default 👀
      - **Less serialization of data between JS -- & -- host platform**
        - -- done via -- JSON
        - transfer of data -- via using [JavaScript Interfaces (JSI)](architecture-glossary.md#javascript-interfaces-jsi), to access -- JavaScript values directly 
