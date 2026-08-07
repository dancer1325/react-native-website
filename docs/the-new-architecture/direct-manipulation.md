---
id: direct-manipulation-new-architecture
title: Direct Manipulation
---

* goal
  * make changes DIRECTLY | component / WITHOUT using state/props -- to -- trigger a re-render of the entire subtree
    * _Examples:_ 
      * | browser web,
        * modify a DOM node
      * | mobile apps,
        * modify views 
          * -- thanks to -- `setNativeProps`

* `setNativeProps`
  * use cases
    * if FREQUENT re-rendering creates a performance bottleneck

TODO: 
Direct manipulation will not be a tool that you reach for frequently
* You will typically only be using it for creating continuous animations to avoid the overhead of rendering 
the component hierarchy and reconciling many views.
`setNativeProps` is imperative and stores state in the native layer (DOM, UIView, etc.) and not within your React components,
which makes your code more difficult to reason about.

Before you use it, try to solve your problem with `setState` and [`shouldComponentUpdate`](https://react.dev/reference/react/Component#shouldcomponentupdate).
:::

## setNativeProps to edit TextInput value

Another very common use case of `setNativeProps` is to edit the value of the TextInput
* The `controlled` prop of TextInput can sometimes drop characters when the `bufferDelay` is low and the user types very quickly
* Some developers prefer to skip this prop entirely and instead use `setNativeProps`
to directly manipulate the TextInput value when necessary.

* _Example:_ edit the input | tap a button
  * check example/my-app


You can use the [`clear`](../textinput#clear) method to clear the `TextInput` which clears the current input text using the same approach.

## Avoiding conflicts with the render function

If you update a property that is also managed by the render function, you might end up with 
some unpredictable and confusing bugs because anytime the component re-renders and that property changes, 
whatever value was previously set from `setNativeProps` will be completely ignored and overridden.
