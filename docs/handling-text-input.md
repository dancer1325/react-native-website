---
id: handling-text-input
title: Handling Text Input
---

* [`TextInput`](textinput#content)
  * == [Core Component](intro-react-native-components) /
    * allows
      * user can enter text == user -- interacts with the -- app
  * `onChangeText={function}`
    * prop / if the text changes -> `function` is called
  * `onSubmitEditing={function}`
    * prop / if the text is submitted -> `function` is called
  * _Example1:_ user types & you're translating their words -- into a -- different language /
    * EVERY single word | this language == 🍕 
      * "Hello there Bob" == "🍕 🍕 🍕"

    ```SnackPlayer name=Handling%20Text%20Input
    import React, {useState} from 'react';
    import {Text, TextInput, View} from 'react-native';
    
    const PizzaTranslator = () => {
      // "text" is stored | state, because it changes over time
      const [text, setText] = useState('');
      return (
        <View style={{padding: 10}}>
          <TextInput
            style={{height: 40, padding: 5}}
            placeholder="Type here to translate!"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
          />
          <Text style={{padding: 10, fontSize: 42}}>
            {text
              .split(' ')
              .map(word => word && '🍕')
              .join(' ')}
          </Text>
        </View>
      );
    };
    
    export default PizzaTranslator;
    ```
  * _Example2:_
    * see [React docs](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
