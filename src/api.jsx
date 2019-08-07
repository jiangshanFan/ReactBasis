import React from 'react'

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        Some text.
        <h2>A heading</h2>
        <input type="text" ref={this.inputRef} />
      </React.Fragment>
    );
  }

  componentDidMount() {
    console.log(this.inputRef);  // {current: input}
    this.inputRef.current.focus();
  }
}


export {
  MyComponent,
}