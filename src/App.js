import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

import { We, Clock, Toggle, LoggingButton, LoggingButtons } from './base'
import { Greeting, LoginControl, Mailbox, Page } from './if'
import { Blog, listItems, ListItems, NumberList } from './list'
import { NameForm, EssayForm, FlavorForm, file, Reservation } from './form'
import { Calculator } from './improve'
import { WelcomeDialog, SplitPane, BaseDialog, SignUpDialog } from './combination'
import { FilterableProductTable } from './React'
import { MyComponent } from './api'
import { WebAccessibility } from './high/accessibility'
import { AntDesignComponent } from "./antDesignComponent";
import { ContextComponent } from "./high/context";

import BasicExample from "./router/Basic"
import ParamsExample from "./router/UrlParameters"
import AuthExample from "./router/RedirectsAuth";

// import { curry } from "lodash";

const Glossary = React.lazy(() => import('./NamedExports')); // ============================ must after the normal import, need to be wrapped in Suspense

function App() {
  const name = 'Lisa';
  const element = <h1>Hello, {name}</h1>;
  const user = {avatarUrl: logo,};
  function getGreeting(name) {
    if (name) {
      return <h1>Hello, {name}!</h1>  // JSX本身也是表达式
    }
    return <h1>Hello, Stranger.</h1>
  }

  const elements = <div tabIndex="0">{2+5}</div>;  // 直接使用表达式
  const el = <img src={user.avatarUrl} className="App-logo" alt="img" />;  // 指定标签的属性值

  const multi = (  // 指定子元素
    <div>
      <h1>Hello!</h1>
      <h2>Good to see you here.</h2>
    </div>
  );

  const response = { potentiallyMaliciousInput: 'attack'};

  const title = response.potentiallyMaliciousInput;
  const attack = <h1>{title}</h1>;
  const messages = ['React', 'Re: React', 'Re:Re: React'];

  const posts = [  // list
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
  ];

  const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];


  // 柯里化
  // const split = curry((x, str) => str.split(x));
  // const join = curry((x, arr) => arr.join(x));
  // const replaceSpaceWithComma = compose(join(','), split(' '));
  // const replaceCommaWithDash = compose(join('-'), split(','));

  // console.log(replaceSpaceWithComma('h ello'));

  return (
    <div className="App" style={{marginBottom: '20px'}}>
      {element}
      {elements}
      {getGreeting(name)}
      {getGreeting()}
      {el}
      {multi}
      {attack}
      <We name="Sara" title="name" />
      <Clock />
      <LoggingButton />
      <LoggingButtons />
      <Toggle />
      <LoginControl />
      <Greeting isLoggedIn={false} />
      <Mailbox unreadMessages={messages} />
      <Page />
      <ul>{listItems}</ul>
      <ListItems numbers={['1-1', '2-1', '3-1', '4-1', '5-1']} />
      <NumberList numbers={['1-1-1', '2-1-1', '3-1-1', '4-1-1', '5-1-1']} />
      <Blog posts={posts} />
      <hr />
      form: <NameForm />
      form: <EssayForm />
      form: <FlavorForm />
      {file}
      <Reservation />
      <Calculator />
      <WelcomeDialog />
      <BaseDialog />
      <SignUpDialog />
      <SplitPane left={<h1>hello</h1>} right={<h2>nice!</h2>} />
      <FilterableProductTable products={PRODUCTS} />
      <AntDesignComponent />
      <MyComponent />
      <WebAccessibility />
      <Suspense fallback={<div>Loading...</div>}>
        <Glossary items={[{term: 1, description: 'term 1', id: 1,},{term: 2, description: 'term 2', id: 2,}]} />
      </Suspense>
      <ContextComponent />
      <BasicExample />
      <ParamsExample />
      <AuthExample />
    </div>
  );
}

export default App;
