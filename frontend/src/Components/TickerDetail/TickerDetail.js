import React from 'react';

import { Table, Tag } from 'antd';
import { Layout } from 'antd';

import FooterComponent from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'
import TradingViewWidget from 'react-tradingview-widget';
import { Themes } from 'react-tradingview-widget';
import "./TickerDetail.css"
import reqwest from 'reqwest';

const { Content } = Layout;

const columns = [
    {
      title: 'Transaction Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'ticker',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Purchase/Sale',
      key: 'type',
      dataIndex: 'type',
      render: type => <Tag color={type === 'Sale' || type === 'S' ? 'volcano' : 'green'} key={type === 'S' || type === 'Sale' ? 'Sale' : 'Purchase'}>{type === 'S' || type === 'Sale' ? 'Sale' : 'Purchase'}</Tag>,
    },
    {
        title: 'Name',
        dataIndex: 'congress_name',
        key: 'congress_name',
        render: text => <a style={{ textDecoration: "none" }} href={`http://localhost:3000/congress-people/${text}`}>{text}</a>
    },
    {
        title: 'Source',
        dataIndex: 'ptrLink',
        key: 'ptrLink',
        render: link => <a style={{ textDecoration: "none" }} href={link}>Source</a>,
    },
];

const getRandomuserParams = params => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

class CongressTrades extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 20,
    },
    loading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    reqwest({
      url: `http://127.0.0.1:8000/government/ticker/${this.props.match.params.slug}/?format=json`,
      method: 'get',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      console.log(data);
      this.setState({
        loading: false,
        data: data.results,
        pagination: {
          ...params.pagination,
        //   total: 200,
          // 200 is mock data, you should read it from server
          total: data.count,
        },
      });
    });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <div style={{backgroundColor: "black", position: "relative"}}>
          <Navbar />
            <div className="trading-widg">
            
            <TradingViewWidget
              backgroundColor="#141414"
              symbol={this.props.match.params.slug}
              theme={Themes.DARK}
              locale="en"
              autosize

            />

            </div>

            <Table
                bordered
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={this.handleTableChange}
                scroll={{x: "max-content", y: '48vh' }}
                style={{ margin: 20, boxShadow: '1px 1px 1px 1px #ccc'}}

              />
          <FooterComponent />
      </div>
    );
  }
}

export default CongressTrades;