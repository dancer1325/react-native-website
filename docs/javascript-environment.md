---
id: javascript-environment
title: JavaScript Environment
---

## JavaScript Runtime

* | use React Native
  * your JS code -- is going to be -- running | <= 3 environments
    * MOST cases,
      * React Native use [Hermes](hermes)
    * if Hermes is disabled -> React Native will use [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore) 
      * == Safari's JS engine 
      * | iOS, it does NOT use JIT
        * Reason: 🧠 absence of writable executable memory | iOS apps 🧠
    * | use Chrome debugging, ALL JS code runs | Chrome itself / -- communicate ,via WebSockets, with -- native code 
      * Chrome uses [V8](https://v8.dev/) as its JavaScript engine

## JavaScript Syntax Transformers

* Syntax transformers
  * make writing code MORE enjoyable
    * Reason: 🧠allow you to use new JavaScript syntax WITHOUT waiting for support | ALL interpreters 🧠

* 👀React Native -- ships with the -- [Babel JavaScript compiler](https://babeljs.io) 🧠
  * -> [Babel supported transformations](https://babeljs.io/docs/plugins/#transform-plugins)

* [FULL list of React Native's enabled transformations](https://github.com/facebook/react-native/tree/main/packages/react-native-babel-preset)

<table>
<thead>
  <tr><th>Transformation</th><th>Code</th></tr>
</thead>
<tbody>
  <tr><td className="table-heading" colSpan="2">ECMAScript 5</td></tr>
  <tr>
    <td>Reserved Words</td>
    <td> `promise.catch(function() {...});` </td>
  </tr>
  <tr><td className="table-heading" colSpan="2">ECMAScript 2015 (ES6)</td></tr>
  <tr>
    <td>[Arrow functions](https://babeljs.io/docs/learn-es2015/#arrows)</td>
    <td> `&lt;C onPress={() => this.setState({pressed: true})} /&gt;` </td>
  </tr>
  <tr>
    <td>[Block scoping](https://babeljs.io/docs/learn-es2015/#let-const)</td>
    <td> `let greeting = 'hi';` </td>
  </tr>
  <tr>
    <td>[Call spread](https://babeljs.io/docs/learn-es2015/#default-rest-spread)</td>
    <td> `Math.max(...array);` </td>
  </tr>
  <tr>
    <td>[Classes](https://babeljs.io/docs/learn-es2015/#classes)</td>
    <td> `class C extends React.Component {render() { return <View />; }}` </td>
  </tr>
  <tr>
    <td>[Computed Properties](https://babeljs.io/docs/learn-es2015/#enhanced-object-literals)</td>
    <td> `const key = 'abc'; const obj = {[key]: 10};` </td>
  </tr>
  <tr>
    <td>[Constants](https://babeljs.io/docs/learn-es2015/#let-const)</td>
    <td> `const answer = 42;` </td>
  </tr>
  <tr>
    <td>[Destructuring](https://babeljs.io/docs/learn-es2015/#destructuring)</td>
    <td> `const {isActive, style} = this.props;` </td>
  </tr>
  <tr>
    <td>[for…of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)</td>
    <td> `for (var num of [1, 2, 3]) {...};` </td>
  </tr>
  <tr>
    <td>[Function Name](https://babeljs.io/docs/en/babel-plugin-transform-function-name)</td>
    <td> `let number = x => x;` </td>
  </tr>
  <tr>
    <td>[Literals](https://babeljs.io/docs/en/babel-plugin-transform-literals)</td>
    <td> `const b = 0b11; const o = 0o7; const u = 'Hello\u{000A}\u{0009}!';` </td>
  </tr>
  <tr>
    <td>[Modules](https://babeljs.io/docs/learn-es2015/#modules)</td>
    <td> `import React, {Component} from 'react';` </td>
  </tr>
  <tr>
    <td>[Object Concise Method](https://babeljs.io/docs/learn-es2015/#enhanced-object-literals)</td>
    <td> `const obj = {method() { return 10; }};` </td>
  </tr>
  <tr>
    <td>[Object Short Notation](https://babeljs.io/docs/learn-es2015/#enhanced-object-literals)</td>
    <td> `const name = 'vjeux'; const obj = {name};` </td>
  </tr>
  <tr>
    <td>[Parameters](https://babeljs.io/docs/en/babel-plugin-transform-parameters)</td>
    <td> `function test(x = 'hello', {a, b}, ...args) {}` </td>
  </tr>
  <tr>
    <td>[Rest Params](https://github.com/sebmarkbage/ecmascript-rest-spread)</td>
    <td> `function(type, ...args) {};` </td>
  </tr>
  <tr>
    <td>[Shorthand Properties](https://babeljs.io/docs/en/babel-plugin-transform-shorthand-properties)</td>
    <td> `const o = {a, b, c};` </td>
  </tr>
  <tr>
    <td>[Sticky Regex](https://babeljs.io/docs/en/babel-plugin-transform-sticky-regex)</td>
    <td> `const a = /o+/y;` </td>
  </tr>
  <tr>
    <td>[Template Literals](https://babeljs.io/docs/learn-es2015/#template-strings)</td>
    <td> const who = 'world'; const str = \Hello ${who}`; </td>
  </tr> 
  <tr> 
    <td>[Unicode Regex](https://babeljs.io/docs/en/babel-plugin-transform-unicode-regex)</td> 
    <td> `const string = 'foo💩bar'; const match = string.match(/foo(.)bar/u);` </td>
  </tr>
  
  <tr><td className="table-heading" colSpan="2">ECMAScript 2016 (ES7)</td></tr>
  <tr> 
    <td>[Exponentiation Operator](https://babeljs.io/docs/en/babel-plugin-transform-exponentiation-operator)</td> 
    <td> `let x = 10 ** 2;` </td>
  </tr>
  
  <tr><td className="table-heading" colSpan="2">ECMAScript 2017 (ES8)</td></tr>
  <tr> 
    <td>[Async Functions](https://github.com/tc39/ecmascript-asyncawait)</td> 
    <td> `async function doStuffAsync() {const foo = await doOtherStuffAsync();};` </td>
  </tr>
  <tr> 
    <td>[Function Trailing Comma](https://github.com/jeffmo/es-trailing-function-commas)</td> 
    <td> `function f(a, b, c,) {};` </td>
  </tr>

  <tr><td className="table-heading" colSpan="2">ECMAScript 2018 (ES9)</td></tr>
  <tr> 
    <td>[Object Spread](https://github.com/tc39/proposal-object-rest-spread)</td> 
    <td> `const extended = {...obj, a: 10};` </td>
  </tr>
  
  <tr><td className="table-heading" colSpan="2">ECMAScript 2019 (ES10)</td></tr>
  <tr> 
    <td>[Optional Catch Binding](https://babeljs.io/docs/en/babel-plugin-proposal-optional-catch-binding)</td> 
    <td> `try {throw 0; } catch { doSomethingWhichDoesNotCareAboutTheValueThrown();}` </td>
  </tr>
  
  <tr><td className="table-heading" colSpan="2">ECMAScript 2020 (ES11)</td></tr>
  * TODO:
  <TableRow name="Dynamic Imports" code="const package = await import('package'); package.function()" url="https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import" />
  <TableRow name="Nullish Coalescing Operator" code="const foo = object.foo ?? 'default';" url="https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator" />
  <TableRow name="Optional Chaining" code="const name = obj.user?.name;" url="https://github.com/tc39/proposal-optional-chaining" />
  
  <tr><td className="table-heading" colSpan="2">ECMAScript 2022 (ES13)</td></tr>
  <TableRow name="Class Fields" code="class Bork {static a = 'foo'; static b; x = 'bar'; y;}" url="https://babeljs.io/docs/en/babel-plugin-proposal-class-properties" />
  
  <tr><td className="table-heading" colSpan="2">Stage 1 Proposal</td></tr>
  <TableRow name="Export Default From" code="export v from 'mod';" url="https://babeljs.io/docs/en/babel-plugin-proposal-export-default-from" />
  
  <tr><td className="table-heading" colSpan="2">Miscellaneous</td></tr>
  <TableRow name="Babel Template" code="template(`const %%importName%% = require(%%source%%);`);" url="https://babeljs.io/docs/en/babel-template" />
  <TableRow name="Flow" code="function foo(x: ?number): string {};" url="https://flowtype.org/" />
  <TableRow name="ESM to CJS" code="export default 42;" url="https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs" />
  <TableRow name="JSX" code="<View style={{color: 'red'}} />" url="https://reactjs.org/docs/jsx-in-depth" />
  <TableRow name="Object Assign" code="Object.assign(a, b);" url="https://babeljs.io/docs/en/babel-plugin-transform-object-assign" />
  <TableRow name="React Display Name" code="const bar = createReactClass({});" url="https://babeljs.io/docs/en/babel-plugin-transform-react-display-name" />
  <TableRow name="TypeScript" code="function foo(x: {hello: true, target: 'react native!'}): string {};" url="https://www.typescriptlang.org/" />
</tbody>
</table>

## Polyfills

* 👀MANY standard functions are ALSO available | ALL supported JavaScript runtimes 👀

#### Browser

- [CommonJS `require`](https://nodejs.org/docs/latest/api/modules.html)
- `md [console.{log, warn, error, info, debug, trace, table, group, groupCollapsed, groupEnd}](https://developer.chrome.com/devtools/docs/console-api)`
- [`XMLHttpRequest`, `fetch`](network.md#content)
- [`{set, clear}{Timeout, Interval, Immediate}, {request, cancel}AnimationFrame`](timers.md#content)

#### ECMAScript 2015 (ES6)

- [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- `md Array.prototype.{[find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), [findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)}`
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- `md String.prototype.{[startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith), [endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith), [repeat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat), [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)}`

#### ECMAScript 2016 (ES7)

- `md Array.prototype.[includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)`

#### ECMAScript 2017 (ES8)

- `md Object.{[entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries), [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)}`

#### Specific

- `__DEV__`
