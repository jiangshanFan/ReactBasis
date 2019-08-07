import React, { Component, Fragment } from 'react'

// 无障碍辅助功能
// 标准和指南
class WebAccessibility extends Component {
  constructor(props) {
    super(props);
    this.state = {aria: '',};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({aria: e.target.value});
  }

  render() {
    return (
      <input
        type="text"
        aria-label="hello"
        aria-required="true"
        onChange={this.handleChange}
        value={this.state.aria}
        name="WCAG"
      />
    )
  }
}

// 语义化的 HTML
// 有时，语义化的 HTML 会被破坏。比如当在 JSX 中使用 <div> 元素来实现 React 代码功能的时候，
// 又或是在使用列表（<ol>， <ul> 和 <dl>）和 HTML <table> 时。 在这种情况下，我们应该使用 React Fragments 来组合各个组件。
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}


export {
  WebAccessibility,
  Glossary,
}