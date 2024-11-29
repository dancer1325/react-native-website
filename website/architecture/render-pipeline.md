---
id: render-pipeline
title: Render, Commit, and Mount
---


* React Native renderer pipeline
  * 👀== sequence of steps / render React logic -- to a -- [host platform](architecture-glossary.md#host-platform) 👀
    * when does it occur?
      * |
        * initial renders
        * UI state updates
    * steps
      1. **Render:**
         1. React -- executes product logic / creates a -- [React Element Trees](architecture-glossary.md#react-element-tree-and-react-element) | JavaScript
         2. renderer -- creates, from React Element Trees, the -- [React Shadow Tree](architecture-glossary.md#react-shadow-tree--react-shadow-node) | C++
      2. **Commit**
         1. Once the React Shadow Tree is fully created -> renderer -- triggers a -- commit /
            1. React Element Tree and NEWLY created React Shadow Tree -- are promoted to the -- “next tree” / to be mounted
            2. -- schedules calculation of -- its layout information
      3. **Mount:**
         1. React Shadow Tree + results of layout calculation -- is transformed into a -- [Host View Tree](architecture-glossary.md#host-view-tree-and-host-view)
    * 👀previous steps -- may -- occur | DIFFERENT threads 👀
      * see [Threading Model](threading-model)

  ![React Native renderer Data flow](/website/static/docs/assets/Architecture/renderer-pipeline/data-flow.jpg)

---

## Initial Render

* _Example:_ you want to render

    ```jsx
    function MyComponent() {
      return (
        <View>
          <Text>Hello, World</Text>
        </View>
      );
    }
    
    // <MyComponent />      == React Element
    ```

* _React Element_ -- is recursively reduced by React to a -- terminal [React Host Component](architecture-glossary.md#react-host-components-or-host-components)  
  * ways to reduce
    * invoke the
      * initial render or
      * its `.render` method, if it's implemented -- via -- JavaScript class
  * 👀recursively UNTIL every _React Element_ can NOT be reduced any further👀
* _React Element Tree_ -- is, following the previous one, reduced to a -- _React Element Tree_ of [React Host Component](architecture-glossary.md#react-host-components-or-host-components)

### Phase 1. Render

![Phase one: render](/website/static/docs/assets/Architecture/renderer-pipeline/phase-one-render.png)

* | process of element reduction | _React Host Components_ 
  * renderer -- ALSO synchronously creates a -- [React Shadow Node](architecture-glossary.md#react-shadow-tree--react-shadow-node)
    * Reason: 🧠 EACH _React Element_ is invoked 🧠
    * ❌NOT happens | [React Composite Components](architecture-glossary.md#react-composite-components) ❌ 
    * _Example:_ previous example
      * `<View>` -- leads to the creation of a -- `ViewShadowNode` object
      * `<Text>` -- leads to the creation of a -- `TextShadowNode` object
      * there is NO a _React Shadow Node_ of `<MyComponent>`
    * 👀if React creates a parent-child relationship | 2 _React Element Nodes_ -> renderer creates the SAME parent-child relationship | 2 corresponding _React Shadow Nodes_ 👀
      * == way to assemble _React Shadow Tree_ 
    * operations (creation of _React Shadow Node_, creation of parent-child relationship | 2 _React Shadow Nodes_) are
      * synchronous
      * thread-safe
      * executed -- from -- React (JavaScript) | renderer (C++) | NORMALLY JavaScript thread

* _React Element Tree_ (& its constituent _React Element Nodes_) do NOT exist indefinitely
  * Reason: 🧠== temporal representation materialized by “fibers” | React 🧠 
  * EACH “fiber” 
    * == host component
    * stores a C++ pointer -- , via a JSI, to the -- _React Shadow Node_
  * [see more about “fibers”](https://github.com/acdlite/react-fiber-architecture#what-is-a-fiber) 

* _React Shadow Tree_
  * 💡immutable 💡
    * 👀if you want to update ANY _React Shadow Node_ -> renderer creates a NEW _React Shadow Tree_👀 
      * renderer -- provides -- cloning operations / [state updates MORE performant](render-pipeline#react-state-updates)
  * AFTER the _React Shadow Tree_ is complete -> renderer -- triggers a -- commit of the _React Element Tree_ 

* _Example:_ (Following previous example) render phase result

  ![Step one](/website/static/docs/assets/Architecture/renderer-pipeline/render-pipeline-1.png)

### Phase 2. Commit

![Phase two: commit](/website/static/docs/assets/Architecture/renderer-pipeline/phase-two-commit.png)

* commit phase == _Layout Calculation_ +  _Tree Promotion_
  * **Layout Calculation**
    * := operation / calculates -- via invoking Yoga -- the
      * _React Shadow Node_'s 
        * position
        * size  
    * requirements
      * EACH _React Shadow Node_’s styles 
        * originated from a _React Element_ | JS
      * layout constraints of the root of the _React Shadow Tree_
        * -- determines the -- amount of available space / resulting nodes can occupy
    * MOST of them are executed (completely) | C++
      * ALTHOUGH, layout calculation of SOME components -- depend on the -- _host platform_ (_Example:_ `Text`, `TextInput`)
      * text size & position needs to be calculated | _host platform_ layer
        * Reason: 🧠text size & position -- is specific to -- EACH _host platform_🧠
        * how does it work?
          * Yoga invokes a function / defined | _host platform_ 

    ![Step two](/website/static/docs/assets/Architecture/renderer-pipeline/render-pipeline-2.png)

  * **Tree Promotion (New Tree → Next Tree)**
    * := operation / promotes the new _React Shadow Tree_ -- as the -- “next tree” / to be mounted 
      * == 
        * new _React Shadow Tree_ 
          * has ALL the information -- to be -- mounted
          * -- represents the -- LATEST state of the _React Element Tree_
        * “next tree” mounts | next UI Thread's “tick” 

  * BOTH previous operations are ASYNCHRONOUSLY executed | background thread

### Phase 3. Mount

![Phase three: mount](/website/static/docs/assets/Architecture/renderer-pipeline/phase-three-mount.png)

* TODO:
The mount phase transforms the _React Shadow Tree_ (which now contains data from layout calculation) into a _Host_ _View Tree_ with rendered pixels on the screen. As a reminder, the _React Element Tree_ looks like this:

```jsx
<View>
  <Text>Hello, World</Text>
</View>
```

At a high level, React Native renderer creates a corresponding [Host View](architecture-glossary.md#host-view-tree-and-host-view) for each _React Shadow Node_ and mounts it on screen. In the example above, the renderer creates an instance of `android.view.ViewGroup` for the `<View>` and `android.widget.TextView` for `<Text>` and populates it with “Hello World”. Similarly for iOS a `UIView` is created and text is populated with a call to `NSLayoutManager`. Each host view is then configured to use props from its React Shadow Node, and its size and position is configured using the calculated layout information.

![Step two](/docs/assets/Architecture/renderer-pipeline/render-pipeline-3.png)

In more detail, the mounting phase consists of these three steps:

- **Tree Diffing:** This step computes the diff between the “previously rendered tree” and the “next tree” entirely in C++. The result is a list of atomic mutation operations to be performed on host views (e.g. `createView`, `updateView`, `removeView`, `deleteView`, etc). This step is also where the React Shadow Tree is flattened to avoid creating unnecessary host views. See [View Flattening](view-flattening) for details about this algorithm.
- **Tree Promotion (Next Tree → Rendered Tree)**: This step atomically promotes the “next tree” to “previously rendered tree” so that the next mount phase computes a diff against the proper tree.
- **View Mounting**: This step applies the atomic mutation operations onto corresponding host views. This step executes in the _host platform_ on UI thread.

**Additional Details**

- The operations are synchronously executed on UI thread. If the commit phase executes on background thread, the mounting phase is scheduled for the next “tick” of UI thread. On the other hand, if the commit phase executes on UI thread, mounting phase executes synchronously on the same thread.
- Scheduling, implementation, and execution of the mounting phase heavily depends on the _host platform_. For example, the renderer architecture of the mounting layer currently differs between Android and iOS.
- During the initial render, the “previously rendered tree” is empty. As such, the tree diffing step will result in a list of mutation operations that consists only of creating views, setting props, and adding views to each other. Tree diffing becomes more important for performance when processing [React State Updates](#react-state-updates).
- In current production tests, a _React Shadow Tree_ typically consists of about 600-1000 _React Shadow Nodes_ (before view flattening), the trees get reduced to ~200 nodes after view flattening. On iPad or desktop apps, this quantity may increase 10-fold.

---

## React State Updates

* goal
  * render pipeline's phases | update the _React Element Tree_'s state

* _Example:_ you’ve rendered the following component | initial render

    ```jsx
    function MyComponent() {
      return (
        <View>
          <View
            style={{backgroundColor: 'red', height: 20, width: 20}}
          />
          <View
            style={{backgroundColor: 'blue', height: 20, width: 20}}
          />
        </View>
      );
    }
    ```

    ![expected tree | AFTER Initial Render](/website/static/docs/assets/Architecture/renderer-pipeline/render-pipeline-4.png)

Notice that **Node 3** maps to a host view with a **red background**, and **Node 4** maps to a host view with a **blue background**. Assume that as the result of a state update in JavaScript product logic, the background of the first nested `<View>` changes from `'red'` to `'yellow'`. This is what the new _React Element Tree_ might look:

```jsx
<View>
  <View
    style={{backgroundColor: 'yellow', height: 20, width: 20}}
  />
  <View
    style={{backgroundColor: 'blue', height: 20, width: 20}}
  />
</View>
```

**How is this update processed by React Native?**

When a state update occurs, the renderer needs to conceptually update the _React Element Tree_ in order to update the host views that are already mounted. But in order to preserve thread safety, both the _React Element Tree_ as well as the _React Shadow Tree_ must be immutable. This means that instead of mutating the current _React Element Tree_ and _React Shadow Tree_, React must create a new copy of each tree which incorporates the new props, styles, and children.

Let’s explore each phase of the render pipeline during a state update.

### Phase 1. Render

![Phase one: render](/docs/assets/Architecture/renderer-pipeline/phase-one-render.png)

When React creates a new _React Element Tree_ that incorporates the new state, it must clone every _React Element_ and _React Shadow Node_ that is impacted by the change. After cloning, the new _React Shadow Tree_ is committed.

React Native renderer leverages structural sharing to minimize the overhead of immutability. When a _React Element_ is cloned to include the new state, every _React Element_ that is on the path up to the root is cloned. **React will only clone a React Element if it requires an update to its props, style, or children.** Any _React Elements_ that are unchanged by the state update are shared by the old and new trees.

In the above example, React creates the new tree using these operations:

1. CloneNode(**Node 3**, `{backgroundColor: 'yellow'}`) → **Node 3'**
2. CloneNode(**Node 2**) → **Node 2'**
3. AppendChild(**Node 2'**, **Node 3'**)
4. AppendChild(**Node 2'**, **Node 4**)
5. CloneNode(**Node 1**) → **Node 1'**
6. AppendChild(**Node 1'**, **Node 2'**)

After these operations, **Node 1'** represents the root of the new _React Element Tree_. Let's assign **T** to the “previously rendered tree” and **T'** to the “new tree”:

![Render pipeline 5](/docs/assets/Architecture/renderer-pipeline/render-pipeline-5.png)

Notice how **T** and **T'** both share **Node 4**. Structural sharing improves performance and reduces memory usage.

### Phase 2. Commit

![Phase two: commit](/docs/assets/Architecture/renderer-pipeline/phase-two-commit.png)

After React creates the new _React Element Tree_ and _React Shadow Tree_, it must commit them.

- **Layout Calculation:** Similar to Layout Calculation during [Initial Render](#initial-render). One important difference is that layout calculation may cause shared _React Shadow Nodes_ to be cloned. This can happen because if the parent of a shared _React Shadow Node_ incurs a layout change, the layout of the shared _React Shadow Node_ may also change.
- **Tree Promotion (New Tree → Next Tree):** Similar to Tree Promotion during [Initial Render](#initial-render).

### Phase 3. Mount

![Phase three: mount](/docs/assets/Architecture/renderer-pipeline/phase-three-mount.png)

- **Tree Promotion (Next Tree → Rendered Tree)**: This step atomically promotes the “next tree” to “previously rendered tree” so that the next mount phase computes a diff against the proper tree.
- **Tree Diffing:** This step computes the diff between the “previously rendered tree” (**T**) and the “next tree” (**T'**). The result is a list of atomic mutation operations to be performed on _host views_.
  - In the above example, the operations consist of: `UpdateView(**Node 3**, {backgroundColor: 'yellow'})`
  - The diff can be calculated for any currently mounted tree with any new tree. The renderer can skip some intermediate versions of the tree.
- **View Mounting**: This step applies the atomic mutation operations onto corresponding _host views_. In the above example, only the `backgroundColor` of **View 3** will be updated (to yellow).

![Render pipeline 6](/docs/assets/Architecture/renderer-pipeline/render-pipeline-6.png)

---

## React Native Renderer State Updates

* 
For most information in the _Shadow Tree_, React is the single owner and single source of truth. 
* All data originates from React and there is a single-direction flow of data.

However, there is one exception and important mechanism: components in C++ can contain state that is not directly exposed to JavaScript, and JavaScript is not the source of truth. 
C++ and _Host Platform_ control this _C++ State_. 
Generally, this is only relevant if you are developing a complicated _Host Component_ that needs _C++ State_.
The vast majority of _Host Components_ do not need this functionality.

For example, `ScrollView` uses this mechanism to let the renderer know what the current offset is.
The update is triggered from the _host platform_, specifically from the host view that represents the `ScrollView` component. 
The information about offset is used in an API like [measure](https://reactnative.dev/docs/direct-manipulation#measurecallback).
Since this update stems from the host platform, and does not affect the React Element Tree, this state data is held by _C++ State_.

* _C++ State_ updates
  * == [React State Updates](render-pipeline#react-state-updates)
  With two important differences:

1. They skip the “render phase” since React is not involved.
2. The updates can originate and happen on any thread, including the main thread.

### Phase 2. Commit

![Phase two: commit](/docs/assets/Architecture/renderer-pipeline/phase-two-commit.png)

When performing a _C++ State_ update, a block of code requests an update of a `ShadowNode` (**N**) to set _C++ State_ to value **S**. React Native renderer will repeatedly attempt to get the latest committed version of **N**, clone it with a new state **S**, and commit **N’** to the tree. If React, or another _C++ State_ update, has performed another commit during this time, the _C++ State_ commit will fail and the renderer will retry the _C++ State_ update many times until a commit succeeds. This prevents source-of-truth collisions and races.

### Phase 3. Mount

![Phase three: mount](/docs/assets/Architecture/renderer-pipeline/phase-three-mount.png)

The _Mount Phase_ is practically identical to the [Mount Phase of React State Updates](#react-state-updates). The renderer still needs to recompute layout, perform a tree diff, etc. See the sections above for details.
