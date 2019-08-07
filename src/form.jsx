import React from 'react'

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value.toUpperCase()});
  }

  handleSubmit(e) {
    alert('提交的名字： ' + this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>名字：<input type="text" value={this.state.value} onChange={this.handleChange} /></label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}


class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '请撰写一篇关于你喜欢的 DOM 元素的文章.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的文章: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          文章:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

let multi = [];
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ['lime']};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    multi.push(event.target.value);
    this.setState({value: multi});
  }

  handleSubmit(event) {
    alert('你喜欢的风味是: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味:
          <select multiple={true} value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}


// 文件input标签
const file = <div><input type="file" /><input type="text" value="hi" readOnly /></div>;


// 处理多个输入 —> 当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作。
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });  // vip
  }

  render() {
    return (
      <form>
        <label>参与： <input type="checkbox" name="isGoing" checked={this.state.isGoing} onChange={this.handleInputChange} /></label>
        <br />
        <label>来宾人数： <input type="number" name="numberOfGuests" value={this.state.numberOfGuests} onChange={this.handleInputChange} /></label>
      </form>
    );
  }
}

export {
  NameForm,
  EssayForm,
  FlavorForm,
  file,
  Reservation
}