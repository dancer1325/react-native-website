---
id: landing-page
title: About the New Architecture
---

* | Since 2018
  * core internals of React Native -- have been redesigned by -- React Native team
    * Reason: 🧠 enable developers -- to create -- higher-quality experiences 🧠
* | 2024
  * React Native uses
    * Meta's production apps
* _New Architecture_ term
  * 👀== NEW framework architecture + open source 👀
    * experimental from [React Native 0.68](/blog/2022/03/30/version-068#opting-in-to-the-new-architecture) 

## Why a New Architecture?

* React Native previous architecture
  * limitations / prevented developers -- from -- crafting experiences / high polish
    * Reason: 🧠due to the existing design of the framework 🧠

### Synchronous Layout and Effects

* if you want to build adaptive UI experiences -> requires 
  * measuring your views' 
    * size
    * position
  * adjusting layout
    * _Example:_ via [`onLayout` event](/docs/view.md#onlayout) 
* state updates | `onLayout` callback
  * EVEN AFTER painting the previous render 
    * 👀== users may see between rendering the initial layout -- & -- responding to layout measurements 👀 
      * intermediate states or
      * visual jumps
    * 👀way to avoid previous behavior | New Architecture 👀
      * synchronous access to layout information
      * properly scheduled updates / NO intermediate state -- is visible to -- users
      * _Example1:_ rendering a Tooltip
        * Measuring and placing a tooltip | view -> showcase what synchronous rendering unlocks
        * tooltip -- requires -- its target view position
          * Reason: 🧠 determine where it should render 🧠
        * | current architecture
          * `onLayout` get the view's measurements & 
          * update the positioning of the tooltip -- based on -- location of the view

        ```jsx
        function ViewWithTooltip() {
          // ...
        
          // We get the layout information and pass to ToolTip to position itself
          const onLayout = React.useCallback(event => {
            targetRef.current?.measureInWindow((x, y, width, height) => {
              // This state update is not guaranteed to run in the same commit
              // This results in a visual "jump" as the ToolTip repositions itself
              setTargetRect({x, y, width, height});
            });
          }, []);
        
          return (
            <>
              <View ref={targetRef} onLayout={onLayout}>
                <Text>Some content that renders a tooltip above</Text>
              </View>
              <Tooltip targetRect={targetRect} />
            </>
          );
        }
        ```

        * | New Architecture
          * [`useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect) synchronously measure and apply layout updates | 1! commit / avoid the visual "jump" 

        ```jsx
        function ViewWithTooltip() {
          // ...
        
          useLayoutEffect(() => {
            // The measurement and state update for `targetRect` happens in a single commit
            // allowing ToolTip to position itself without intermediate paints
            targetRef.current?.measureInWindow((x, y, width, height) => {
              setTargetRect({x, y, width, height});
            });
          }, [setTargetRect]);
        
          return (
            <>
              <View ref={targetRef}>
                <Text>Some content that renders a tooltip above</Text>
              </View>
              <Tooltip targetRect={targetRect} />
            </>
          );
        }
        ```
      * _Example2:_ Asynchronous measurement and render of the ToolTip  
        * view /
          * -- is moving to the -- 
            * corners of the viewport &
            * center
          * has a tooltip rendered | 
            * above or below it
            * AFTER a short delay -- of the -- view movement
          ![](/website/static/img/new-architecture/async-on-layout.gif)
        * [see code](https://gist.github.com/lunaleaps/eabd653d9864082ac1d3772dac217ab9)
      * _Example3:_ Synchronous measurement and render of the ToolTip
        * == previous one / BUT view & tooltip move in unison
          ![](/website/static/img/new-architecture/sync-use-layout-effect.gif)
        * [see code](https://gist.github.com/lunaleaps/148756563999c83220887757f2e549a3)

### Support for Concurrent Renderer and Features

* New Architecture 
  * supports
    * concurrent rendering
      * -> inherited improvements
        * automatic batching
    * features / shipped | [React 18+](https://react.dev/blog/2022/03/29/react-v18) 
      * _Example:_ Suspense for data-fetching, Transitions

* _Example:_ Automatic Batching
  * slider -- specifies -- how many tiles to render
  * if you drag the slider from 0 to 1000 -> will fire off a quick succession of state updates and re-renders
  * [same code](https://gist.github.com/lunaleaps/79bb6f263404b12ba57db78e5f6f28b2) / rendering frequent state updates
    * -- via -- legacy renderer
      * -> if the slider value is adjusted [0, 1000] -> UI slowly renders 1000 views 

    ![](/website/static/img/new-architecture/legacy-renderer.gif)

    * -- via -- React 18 renderer
      * -> UI resolves views faster / WITHOUT MANY intermediate states -> smoother UI  

    ![](/website/static/img/new-architecture/react18-renderer.gif)

    * are NOW batched

* [Transitions](https://react.dev/reference/react/useTransition)
  * NEW concurrent features
  * allows
    * expressing the priority of UI updates / ensure a responsive UX 
      * uses
        * if you mark an update -- as -- lower priority -> React can "interrupt" rendering the update -- to handle -- higher priority updates

* _Example:_ Using `startTransition`
  * goal
    * interrupt in-progress rendering -- to handle a -- newer state update
  * == previous example + transitions 

* TODO:
We wrap the tile number state update with `startTransition` to indicate that rendering the tiles can be interrupted.
`startTransition` also provides a `isPending` flag to tell us when the transition is complete.

```jsx
function TileSlider({value, onValueChange}) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <View>
        <Text>
          Render {value} Tiles
        </Text>
        <ActivityIndicator animating={isPending} />
      </View>
      <Slider
        value={1}
        minimumValue={1}
        maximumValue={1000}
        step={1}
        onValueChange={newValue => {
          startTransition(() => {
            onValueChange(newValue);
          });
        }}
      />
    </>
  );
}

function ManyTiles() {
  const [value, setValue] = useState(1);
  const tiles = generateTileViews(value);
  return (
      <TileSlider onValueChange={setValue} value={value} />
      <View>
        {tiles}
      </View>
  )
}
```

You'll notice that with the frequent updates in a transition, React renders fewer intermediate states because it bails out of rendering the state as soon as it becomes stale.
In comparison, without transitions, more intermediate states are rendered.
Both examples still use automatic batching. 
Still, transitions give even more power to developers to batch in-progress renders.

A video demonstrating an app rendering many views (tiles) according to a slider input. 
The views are rendered in batches as the slider is quickly adjusted from 0 to 1000. 
There are less batch renders in comparison to the next video.
![](/website/static/img/new-architecture/with-transitions.gif)
Rendering tiles with transitions to interrupt in-progress renders of stale state
[See code](https://gist.github.com/lunaleaps/eac391bf3fe4c85953cefeb74031bab0/revisions)


A video demonstrating an app rendering many views (tiles) according to a slider input. 
The views are rendered in batches as the slider is quickly adjusted from 0 to 1000.
![](/website/static/img/new-architecture/without-transitions.gif)
Rendering tiles without marking it as a transition
[See code](https://gist.github.com/lunaleaps/eac391bf3fe4c85953cefeb74031bab0/revisions)


### Fast JavaScript/Native Interfacing

* New Architecture
  * [asynchronous bridge](https://reactnative.dev/blog/2018/06/14/state-of-react-native-2018#architecture) between JavaScript and native -- is replaced it with -- JavaScript Interface (JSI)
 
* JSI
  * := interface /
    * allows
      * JS hold -- a reference to -- a C++ object
      * C++ hold -- a reference to -- a JS object
      * | memory reference, invoke methods / NO serialization costs
        * INCLUDING initializing & re-rendering native core components -- _Example:_ `View` & `Text` --
      * exposing OTHER complex instance-based types -- _Example:_ databases, images, audio samples, etc. -- 
  * enables [VisionCamera](https://github.com/mrousavy/react-native-vision-camera)
    * == popular camera library for React Native /
      * frames ([10MB, 1GB]) are processed | real time

## What can I expect from enabling the New Architecture?

* New Architecture
  * enables previous mentioned features and improvements
    * SOME -- may need -- refactoring 
      * _Example:_ synchronous layout effects or concurrent features 
  * -- may NOT immediately improve -> performance or user experience
  * see [investigation in rendering performance](https://github.com/reactwg/react-native-new-architecture/discussions/123)

* [current areas of exploration](https://github.com/react-native-community/discussions-and-proposals/discussions/651)
  * web alignment
  * [Updates to the event loop model](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0744-well-defined-event-loop.md)
  * [Node and layout APIs](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0607-dom-traversal-and-layout-apis.md)
  * [Styling and layout conformance](https://github.com/facebook/yoga/releases/tag/v2.0.0)
  * ...

## Should I use the New Architecture today?

* React Native v0.76
  * 👀NEW Architecture is enabled by default | ALL React Native projects 👀
* ways to disable New Architecture

### Android

1. `newArchEnabled=false` | `android/gradle.properties`

```diff title="gradle.properties"
# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
-newArchEnabled=true
+newArchEnabled=false
```

### iOS

1. add `ENV['RCT_NEW_ARCH_ENABLED'] = '0'` | `ios/Podfile` 's main [scope of the Podfile](https://github.com/react-native-community/template/blob/0.76-stable/template/ios/Podfile)
  ```diff
  + ENV['RCT_NEW_ARCH_ENABLED'] = '0'
  # Resolve react_native_pods.rb with node to allow for hoisting
  require Pod::Executable.execute_command('node', ['-p',
    'require.resolve(
  ```

2. Install your CocoaPods dependencies with the command:

  ```shell
  bundle exec pod install
  ```
