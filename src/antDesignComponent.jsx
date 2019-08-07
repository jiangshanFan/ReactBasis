import React from 'react'
import { ConfigProvider, DatePicker, message, Alert } from 'antd'
import 'antd/dist/antd.css'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文antd/es/locale-provider/zh_CN
import zhCN from 'antd/es/locale-provider/zh_CN'
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class AntDesignComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = date => {
    message.info(`您选择的日期是： ${date.format('YYYY-MM-DD')}`);
    this.setState({date});
  };

  render() {
    const { date } = this.state;
    return (
      <ConfigProvider locale={zhCN}>
        <div style={{ width: 400, margin: '100px auto' }}>
          <DatePicker onChange={this.handleChange} />
          <div style={{ marginTop: 20 }}>
            当前日期：{date ? date.format('YY/MM/DD') : '未选择'}
            <Alert message={`当前日期：${date ? date.format('YYYY-MM-DD') : '未选择'}`} type="success" />
          </div>
        </div>
      </ConfigProvider>
    );
  }
}


export {
  AntDesignComponent,
}