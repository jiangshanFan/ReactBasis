import React from 'react'

// 元素集合--React元素也是对象，可以直接放入 {} 中当做表达式
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>);

/*function ListItems(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>);

  return <ul>{listItems}</ul>
}*/

//用 Key 提取组件
function Item(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function ListItems(props) {  // 元素的 key 只有放在就近的数组上下文中才有意义。  一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <Item key={number.toString()}
              value={number} />
  );
  return (
    <ul>{listItems}</ul>
  );
}


// 在JSX中嵌入 map()
function NumberList(props) {
  const numbers = props.numbers;
  return ( //这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在 JavaScript 中一样，何时需要为了可读性提取出一个变量，这完全取决于你。
           // 但请记住，如果一个 map() 嵌套了太多层级，那可能就是你提取组件的一个好时机。有时候清晰的代码，会造成复杂度的增加，适当提取。
    <ul>
      {numbers.map((number) =>
        <Item key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}

// key 只是在兄弟节点之间必须唯一,不需要全局唯一
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  // key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值： 比如 id
  const content = props.posts.map((post) =>
    <div id={post.id} label={post.id} key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      <hr />
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

export {
  listItems,
  ListItems,
  NumberList,
  Blog,
}