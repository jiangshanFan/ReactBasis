import React from 'react'

//状态提升
// 通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的。
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

// 转换数值函数
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const scaleNames = {
      c: 'Celsius',
      f: 'Fahrenheit'
    };
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (  // 此组件只处理 React 元素所需要的业务逻辑， 而不涉及处理多个不同的渲染元素 ******
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      name: 'c'
    };
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({temperature: temperature, name: 'c'});
  }

  handleFahrenheitChange(temperature) {
    this.setState({temperature: temperature, name: 'f'});
  }

  render() {  // 涉及到状态提升，将所有的逻辑处理都要同时提升，提取的组件中只处理 React 元素 ******
    const temperature = this.state.temperature;
    const name = this.state.name;
    const celsius = name === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = name ==='c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} onChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={fahrenheit}  onChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    )
  }
}


export {
  Calculator,
}