import React from 'react'

// React 哲学
// 我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。

// React 最棒的部分之一是引导我们思考如何构建一个应用。

// 你会看到我们的应用中包含五个组件。我们已经将每个组件展示的数据标注为了斜体。
/*
      FilterableProductTable (橙色): 是整个示例应用的整体
      SearchBar (蓝色): 接受所有的用户输入
      ProductTable (绿色): 展示数据内容并根据用户输入筛选结果
      ProductCategoryRow (天蓝色): 为每一个产品类别展示标题
      ProductRow (红色): 每一行展示一个产品
      你可能注意到，ProductTable 的表头（包含 “Name” 和 “Price” 的那一部分）并未单独成为一个组件。这仅仅是一种偏好选择，如何处理这一问题也一直存在争论。
      就这个示例而言，因为表头只起到了渲染数据集合的作用——这与 ProductTable 是一致的，所以我们仍然将其保留为 ProductTable 的一部分。
      但是，如果表头过于复杂（比如我们需为其添加排序功能），那么将它作为一个独立的 ProductTableHeader 组件就显得很有必要了。
*/

// 现在我们已经确定了设计稿中应该包含的组件，接下来我们将把它们描述为更加清晰的层级。设计稿中被其他组件包含的子组件，在层级上应该作为其子节点。
/*
    FilterableProductTable
      SearchBar
      ProductTable
        ProductCategoryRow
        ProductRow
*/

class ProductCategoryRow  extends React.Component {
  render() {
    const category = this.props.category;
    return ( // colSpan="2" ☞ 合并两列
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      // filter
      if (product.name.indexOf(filterText) === -1) {

        return ;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }

      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });



    return (
      <div style={{width: '200px', margin: '0 auto'}}>
        {rows.length ?
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table> :
          <h1>暂无相关数据！</h1>
        }
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockOnlyChange(e) {
    this.props.onInStockOnlyChange(e.target.checked);
  }

  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    return (
      <form>
        <input type="text" placeholder="Search..." value={filterText} onChange={this.handleFilterTextChange} />
        <p>
          <input type="checkbox" checked={inStockOnly} onChange={this.handleInStockOnlyChange} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: 'ball',
      inStockOnly: true,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({filterText: filterText});
  }

  handleInStockOnlyChange(inStockOnly) {
    this.setState({inStockOnly: inStockOnly});
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockOnlyChange={this.handleInStockOnlyChange}
        />

        <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
}


export {
  FilterableProductTable,
}