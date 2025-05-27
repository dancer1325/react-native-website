---
id: intro-react
title: React Fundamentals
description: To understand React Native fully, you need a solid foundation in React. This short introduction to React can help you get started or get refreshed.
---

* goal
  * React
    * components
    * JSX
    * props
    * state

* React Native
  * 👀runs | [React](https://react.dev/) 👀

* React
  * == popular open source library /
    * allows
      * building UIs -- via -- JavaScript

## Your first component

* _Example:_ Cat React component

    ```SnackPlayer name=Your%20Cat
    import React from 'react';
    import {Text} from 'react-native';          // import React Native's Text component
    
    // React component -- will render a -- React `<Text>` element
    const Cat = () => {
      return <Text>Hello, I am your cat!</Text>;
    };
    
    // export the React component -- to use -- | your app
    export default Cat;
    ```

* React components
  * == blueprints
  * 👀== function / -- is rendered as a -- **React element** 👀 

* React elements
  * describe WHAT you want to see | screen
  * written -- via -- JSX

* ways to export your component
  * ⚠️-- depend on your -- app’s file structure ⚠️
    * see [handy cheatsheet | JavaScript](https://medium.com/dailyjs/javascript-module-cheatsheet-7bd474f1d829)

## JSX

* == syntax | ".js"
  * enables to write React elements
    * _Example:_ `<Text>Hello, I am your cat!</Text>`
  * allowed ALL JS enable
    * declare variables
    * ...
* requirements
  * `import React from 'react'`
    * Reason: 🧠JSX is | React library 🧠
* used by
  * React
  * React Native
* see
  * [React docs](https://react.dev/learn/writing-markup-with-jsx)
* _Example:_

    ```SnackPlayer name=Curly%20Braces
    import React from 'react';
    import {Text} from 'react-native';
    
    const Cat = () => {
      const name = 'Maru';  // declare a variable
      return <Text>Hello, I am {name}!</Text>;
    };
    
    export default Cat;
    ```
* 👀ANY JS expression (ALSO function calls) will work between curly braces -- `{JSExpression}` -- 👀
  * == `{}` enable using JS functionality | JSX
  * _Example:_ `{getFullName("Rum", "Tum", "Tugger")}` |
    * JS
        ```SnackPlayer name=Curly%20Braces&ext=js
        import React from 'react';
        import {Text} from 'react-native';
        
        const getFullName = (firstName, secondName, thirdName) => {
          return firstName + ' ' + secondName + ' ' + thirdName;
        };
        
        const Cat = () => {
          return <Text>Hello, I am {getFullName('Rum', 'Tum', 'Tugger')}!</Text>;       // {JSExpression}
        };
        
        export default Cat;
        ```
    * TS
        ```SnackPlayer name=Curly%20Braces&ext=tsx
        import React from 'react';
        import {Text} from 'react-native';
        
        const getFullName = (
          firstName: string,
          secondName: string,
          thirdName: string,
        ) => {
          return firstName + ' ' + secondName + ' ' + thirdName;
        };
        
        const Cat = () => {
          return <Text>Hello, I am {getFullName('Rum', 'Tum', 'Tugger')}!</Text>; // {JSExpression}
        };
        
        export default Cat;
        ```

## Custom Components

* React paradigm
  * == nest & reuse React components 
    * _Example:_ nest [`Text`](text) + [`TextInput`](textinput) | [`View`](view) 

      ```SnackPlayer name=Custom%20Components
      import React from 'react';
      import {Text, TextInput, View} from 'react-native';
      
      const Cat = () => {
        return (
          <View>
            <Text>Hello, I am...</Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              defaultValue="Name me!"
            />
          </View>
        );
      };
      
      export default Cat;
      ```

### Developer notes

* | web
  * `<View>` == HTML's `<div>`
  * `<Text>` == HTML's `<p>` 

* | android
  * common practices
    * views inside `LinearLayout`, `FrameLayout`, `RelativeLayout`
      * Reason: 🧠 define how the view’s children are arranged | screen 🧠 

* | React Native,
  * `View`'s children’s layout -- via -- Flexbox  
  * see [layout with Flexbox](flexbox)

* React components
  * can be reused
    * _Example:_ 

  ```SnackPlayer name=Multiple%20Components
  import React from 'react';
  import {Text, View} from 'react-native';
  
  const Cat = () => {
    return (
      <View>
        <Text>I am also a cat!</Text>
      </View>
    );
  };
  
  // Cafe   parent component
  const Cafe = () => {
    return (
      <View>
        <Text>Welcome!</Text>
        <Cat />
        <Cat />
        <Cat />
      </View>
    );
  };
  
  export default Cafe;
  ```

* parent component
  * == ANY component / renders OTHER components

## Props / Properties

* allows you
  * 👀customize (how to render) ANY (custom, built-in) React components 👀
    * _Examples:_
      * _Example1:_ | JS, DIFFERENT `name` / EACH `<Cat>` 

        ```SnackPlayer name=Multiple%20Props&ext=js
        import React from 'react';
        import {Text, View} from 'react-native';
        
        const Cat = props => {
          return (
            <View>
              <Text>Hello, I am {props.name}!</Text>
            </View>
          );
        };
        
        const Cafe = () => {
          return (
            <View>
              <Cat name="Maru" />
              <Cat name="Jellylorum" />
              <Cat name="Spot" />
            </View>
          );
        };
        
        export default Cafe;
        ```

      * _Example2:_ | TS, DIFFERENT `name` / EACH `<Cat>`

        ```SnackPlayer name=Multiple%20Props&ext=tsx
        import React from 'react';
        import {Text, View} from 'react-native';
        
        type CatProps = {
          name: string;
        };
        
        const Cat = (props: CatProps) => {
          return (
            <View>
              <Text>Hello, I am {props.name}!</Text>
            </View>
          );
        };
        
        const Cafe = () => {
          return (
            <View>
              <Cat name="Maru" />
              <Cat name="Jellylorum" />
              <Cat name="Spot" />
            </View>
          );
        };
        
        export default Cafe;
        ```

      * _Example3:_ [`Image`](image)'s [`source`](image#source)

        ```SnackPlayer name=Props
        import React from 'react';
        import {Text, View, Image} from 'react-native';
        
        const CatApp = () => {
          return (
            <View>
              <Image
                source={{
                  uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
                }}
                style={{width: 200, height: 200}}
              />
              <Text>Hello, I am your cat!</Text>
            </View>
          );
        };
        
        export default CatApp;
        ```

* uses
  * configure a component | renders

* `{{ }}`
  * 👀pass JS object | JSX 👀
    * Reason: 🧠
      * | JSX,
        * JS values -- are referenced with -- `{}`
          * uses
            * pass | props, something != string as props --  _Example:_ `<Cat food={["fish", "kibble"]} age={2} />` --
      * | JS
        * objects -- are denoted with -- `{}`
          * _Example:_ `{width: 200, height: 200}` 🧠
  * _Example:_ `style={{width: 200, height: 200}}` 

## State

* state
  * == component’s personal data storage == components memory 
  * uses
    * handle data /  
      * changes over time or
      * comes from user interaction
  * if you want to add state | component -> call [React’s `useState` Hook](https://react.dev/learn/state-a-components-memory)
    A Hook is a kind of function that lets you “hook into” React features.
    For example, `useState` is a Hook that lets you add state to function components.
    You can learn more about [other kinds of Hooks in the React documentation.](https://react.dev/reference/react)


Their hunger, which we expect to change over time (unlike their names), is stored as state.
To feed the cats, press their buttons—which will update their state.


<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=State&ext=js
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

const Cat = props => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default Cafe;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=State&ext=tsx
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

type CatProps = {
  name: string;
};

const Cat = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default Cafe;
```

</TabItem>
</Tabs>

First, you will want to import `useState` from React like so:

```tsx
import React, {useState} from 'react';
```

Then you declare the component’s state by calling `useState` inside its function.
In this example, `useState` creates an `isHungry` state variable:

```tsx
const Cat = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);
  // ...
};
```

> You can use `useState` to track any kind of data: strings, numbers, Booleans, arrays, objects.
> For example, you can track the number of times a cat has been petted with `const [timesPetted, setTimesPetted] = useState(0)`!

Calling `useState` does two things:

- it creates a “state variable” with an initial value—in this case the state variable is `isHungry` and its initial value is `true`
- it creates a function to set that state variable’s value—`setIsHungry`

It doesn’t matter what names you use. 
But it can be handy to think of the pattern as `[<getter>, <setter>] = useState(<initialValue>)`.

Next you add the [`Button`](button) Core Component and give it an `onPress` prop:

```tsx
<Button
  onPress={() => {
    setIsHungry(false);
  }}
  //..
/>
```

Now, when someone presses the button, `onPress` will fire, calling the `setIsHungry(false)`.
This sets the state variable `isHungry` to `false`.
When `isHungry` is false, the `Button`’s `disabled` prop is set to `true` and its `title` also changes:

```tsx
<Button
  //..
  disabled={!isHungry}
  title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
/>
```

> You might’ve noticed that although `isHungry` is a [const](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/const), it is seemingly reassignable!
> What is happening is when a state-setting function like `setIsHungry` is called, its component will re-render.
> In this case the `Cat` function will run again—and this time, `useState` will give us the next value of `isHungry`.

Finally, put your cats inside a `Cafe` component:

```tsx
const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};
```

> See the `<>` and `</>` above? These bits of JSX are [fragments](https://react.dev/reference/react/Fragment). 
> Adjacent JSX elements must be wrapped in an enclosing tag. 
> Fragments let you do that without nesting an extra, unnecessary wrapping element like `View`.

---

Now that you’ve covered both React and React Native’s Core Components, let’s dive deeper on some of these core components by looking at [handling `<TextInput>`](handling-text-input).
