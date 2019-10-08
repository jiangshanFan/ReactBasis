import React, { Component } from 'react'

// Context
// Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

// 在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），
// 这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

// 何时使用 Context
// 使用 Context 之前的考虑

// API
//  React.createContext
//  Context.Provider
//  Class.contextType
//  Context.Consumer

// 示例
//  动态 Context
//  在嵌套组件中更新 Context
//  使用多个 Context

// 注意事项
// 废弃的 API

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class ThemeButton extends Component {
  // ====================== 指定 contextType 读取当前的 theme context。
  // ====================== React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return (
      <button theme={this.context}>{this.context}</button>
    );
  }
}


// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}


class ContextComponent extends Component {
  render () {
    // ========================== 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}


export {
  ContextComponent,
}

// Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。
//
// 如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。
/* 一种无需 context 的解决方案是将 Avatar 组件自身传递下去，因而中间组件无需知道 user 或者 avatarSize 等 props：缺点很多：
这种对组件的控制反转减少了在你的应用中要传递的 props 数量，这在很多场景下会使得你的代码更加干净，使你对根组件有更多的把控。
但是，这并不适用于每一个场景：这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，并且会强行将低层组件适应这样的形式，这可能不会是你想要的。

而且你的组件并不限制于接收单个子组件。你可能会传递多个子组件，甚至会为这些子组件（children）封装多个单独的“接口（slots）”，正如这里的文档所列举的

function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;  // slots-1
  const topBar = (  // slots-2
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
 */

// ================== 使用 context 的通用的场景包括管理当前的 locale，theme，或者一些缓存数据，这比替代方案要简单的多。

/*
待理解：
1.Context API
2.动态 Context
3.在嵌套组件中更新 Context
4.消费多个 Context
5.注意事项：将value状态提升到父节点的 state 中
 */