---
id: using-a-scrollview
title: Using a ScrollView
---

* [ScrollView](scrollview.md)
  * == generic scrolling container / can contain MULTIPLE components & views 
    * scrollable items
      * can be heterogeneous
    * `horizontal`
      * prop / enable scrolling vertically or horizontally
      * alternative
        * | Android,
          * -- via -- [ViewPager](https://github.com/react-native-community/react-native-viewpager) component
    * `pagingEnabled`
      * prop / scroll -- swiping -- gestures
    * `maximumZoomScale` and `minimumZoomScale`
      * props / enable zoom in and out -- via -- pinch and expand gestures
    * ALL items are rendered ALTHOUGH they are NOT currently shown | screen
  * uses
    * small list of items
  * _Example:_ see [blank expo project](https://github.com/dancer1325/expo-examples/tree/master/blank) 
    * vertical `ScrollView` / has images + text

      ```SnackPlayer name=Using%20ScrollView
      import React from 'react';
      import {Image, ScrollView, Text} from 'react-native';
    
      const logo = {
        uri: 'https://reactnative.dev/img/tiny_logo.png',
        width: 64,
        height: 64,
      };
    
      const App = () => (
        <ScrollView>
          <Text style={{fontSize: 96}}>Scroll me plz</Text>
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Text style={{fontSize: 96}}>If you like</Text>
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Text style={{fontSize: 96}}>Scrolling down</Text>
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Text style={{fontSize: 96}}>What's the best</Text>
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Text style={{fontSize: 96}}>Framework around?</Text>
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Image source={logo} />
          <Text style={{fontSize: 80}}>React Native</Text>
        </ScrollView>
      );
    
      export default App;
      ```

* recommendations
  * if list of items so long / can NOT fit | screen -> use a `FlatList`
    * see [learn about list views](using-a-listview.md)
