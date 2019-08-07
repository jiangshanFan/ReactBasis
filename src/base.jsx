import React from 'react'

/*function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));  // Every 1000ms, refresh the DOM. If you want to see, you can modified the index.js（the similar ReactDOM)
}

setInterval(tick, 1000);*/

// 函数组件
function We(props) {
  return <h1>Hello, What's your {props.title}: {props.name}</h1>;
}

/*// 多功能复杂组件，可以通过拆分成可复用的组件库
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img src={props.author.avatarUrl} alt={props.author.name} className="Avatar"/>
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}*/

// class组件
class Clock extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, Clock!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}


// 事件处理 -- 特别注意绑定this， 否则会造成undefined
class Toggle extends React.Component {  // 推荐使用
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class LoggingButton extends React.Component {  // 推荐使用
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

// 使用箭头函数可以绑定this, 此语法问题在于每次渲染 loggingButton时都会创建不同的回调函数， 但是在作为prop传递给子组件时，可能会进行额外的重新渲染，造成性能问题
class LoggingButtons extends React.Component {
  handleClick(val, e) {
    console.log('this is:', this);
    console.log('this is:', val);
    console.log('this is:', e);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      // React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。
      <button onClick={(e) => this.handleClick(3, e)}>
        Click me
      </button>  // <button onClick={this.handleClick.bind(this, 3)}>
    );
  }
}

export {
  We,
  Clock,
  Toggle,
  LoggingButton,
  LoggingButtons
}