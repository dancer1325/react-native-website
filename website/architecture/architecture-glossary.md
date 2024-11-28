---
id: architecture-glossary
title: Glossary
slug: /glossary
---

## Dev Menu

* available | development builds
* -- offers access to -- VARIOUS
  * development actions
  * debugging actions
* see [documentation](/docs/debugging.md)

## Fabric Renderer

* React Native vs React framework
  * 👀SAME code executed 👀
  * rendering
    * React Native -- renders to -- general platform views (host views)
      * 👀-- done via -- Fabric Renderer 👀
    * React framework -- renders to -- DOM nodes (== web’s host views)
 
* Fabric Renderer
  * enables that
    * React
      * talks -- to -- each platform
      * manage its host view instances 
  * exists |
    * JavaScript
    * targets interfaces / -- made available by -- C++ code
  * see [this blog](https://overreacted.io/react-as-a-ui-runtime/#renderers)

## Host platform

* == platform / embed React Native (_Example:_ Android, iOS, macOS, Windows)

## Host View Tree (and Host View)

* == Tree representation of views | host platform (e.g. Android, iOS)
  * | Android
    * host views == instances of `android.view.ViewGroup`, `android.widget.TextView`, etc
      * == building blocks of the host view tree 
* 's size and location -- are based on -- `LayoutMetrics` calculated with Yoga
* 's style and content -- are based on -- React Shadow Tree's information

## JavaScript Interfaces (JSI)

* == lightweight API -- to embed a -- JavaScript engine | C++ application 
* uses
  * 👀by Fabric, to communicate Fabric’s C++ core -- & -- React👀

## Java Native Interface (JNI)

* == [API to write Java native methods](https://docs.oracle.com/javase/8/docs/technotes/guides/jni/)
* uses
  * 👀by Fabric, to communicate Fabric’s C++ core -- & -- Android👀

## React Component

* 👀== JavaScript function or class / instructs -- how to create a -- React Element 👀 
* see [this blog](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)

## React Composite Components

* React Components / `render` implementations

## React Host Components or Host Components

* React Host Components
  * := React Components / their view implementation -- is provided by a -- host view (_Example:_ `<View>, <Text>` )
    * | Web, 
      * ReactDOM's Host components == components -- _Example:_ `<p>` & `<div>` --

## React Element Tree (and React Element)

* _React Element Tree_
  * --- created by -- React | JavaScript
  * == React Elements

* _React Element_
  * == plain JavaScript object / 
    * describes -- what should -- appear | screen 
    * contains
      * props,
      * styles,
      * children
  * ONLY exist | JavaScript
  * -- can represent -- instantiations of
    * React Composite Components or
    * React Host Components
* see [this blog](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)

## React Native Framework

* React Native
  * allows
    * developers can -- via [React programming paradigm](https://react.dev/learn/thinking-in-react) -- ship applications | native targets
  * 's team
    * is focused on creating (/ fit the MOST general use case | developing native apps)
      * **core APIs**
      * **functionalities** 

* 👀requirements to ship native apps | production👀
  * tools & libraries / NOT provided by default -- as part of -- React Native
    * uses
      * publish applications | dedicated store
      * routing & navigation mechanisms

* **React Native Framework**
  * previous tools & libraries /
    * form a cohesive framework
    * built | React Native
  * _Example:_
    * [Expo](https://expo.dev/)
      * == Open Source React Native Framework 

## React Shadow Tree & React Shadow Node

* _React Shadow Tree_
  * -- created by the -- Fabric Renderer
  * 👀== React Shadow Nodes👀
* React Shadow Node 
  * := object / 
    * -- represents a -- React Host Component -- to be -- mounted
    * their props -- come from -- JavaScript
    * contain
      * layout information (x, y, width, height)
    * exist
      * if you use Fabric -> | C++
      * BEFORE Fabric -> | mobile runtime heap (e.g. Android JVM)

## Yoga Tree (and Yoga Node)

* _Yoga Tree_
  * uses
    * by [Yoga](https://www.yogalayout.dev/) -- to calculate -- React Shadow Tree's layout information 
* _Yoga Node_
  * created (typically) / EACH React Shadow Node
    * Reason: 🧠 React Native -- via Yoga, calculate -- layout
    * typically == NOT ALWAYS
