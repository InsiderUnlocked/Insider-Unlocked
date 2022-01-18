import React from 'react';

import { Table, Tag, Card, Col, Row, DatePicker, Space } from 'antd';
import { Layout } from 'antd';

import FooterComponent from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'

import reqwest from 'reqwest';

import './CongressTrades.css';

import { TitleSearch } from '../Filters/TitleSearch';
import { StatusFilter } from '../Filters/StatusFilter';



const { Content } = Layout;



const columns = [
    {
      title: 'Transaction Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'ticker',
      render: text => <a href={`http://localhost:3000/ticker/${text}`}>{text}</a>,
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
        dataIndex: 'name',
        key: 'name',
        render: text => <a href={`http://localhost:3000/congress-people/${text}`}>{text}</a>
    },
    {
        title: 'Source',
        dataIndex: 'ptrLink',
        key: 'ptrLink',
        render: link => <a href={link}>Source</a>,
    },
];

const getURLParams = params => ({
  limit: params.pagination.pageSize,
  offset: params.pagination.current  * params.pagination.pageSize,
  // ...params,
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
      url: 'http://127.0.0.1:8000/government/congress-trades/?format=json',
      method: 'get',
      type: 'json',
      data: getURLParams(params),
    }).then(data => {
      console.log(data);
      this.setState({
        loading: false,
        data: data.results,
        pagination: {
          ...params.pagination,
          total: data.count - params.pagination.pageSize,
        },
      });
    });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Layout style={{ marginRight: 0 }}>
        <Navbar />
        <Content>
          <div className = "headerSummaryDiv">
              <h1 className = "headerSummaryText">Summary for the last 30 days</h1>
            </div>

            {/* Stats*/}
            <div className="site-card-wrapper" style={{marginBottom: 20}}>
            <Row gutter={[16, 16]} style={{ margin: 10 }}>
              <Col xs={24} xl={8}>
                <Card hoverable title="Number of Transactions" style={{borderRadius: '15px', boxShadow: '1px 1px 1px 1px #000000' }}>
                  <h1 style={{ fontSize: '30px' }}>4</h1>

                  <p style={{ bottom: 0, margin: 0 }}>Total Number of Trades in Disclosure</p>
                </Card>
              </Col>
              <Col xs={24} xl={8}>
                <Card hoverable title="Total Trade Volume" style={{borderRadius: '15px', boxShadow: '1px 1px 1px 1px #000000' }}>
                  <h1 style={{ fontSize: '30px' }}>$2,350.00</h1>

                  <p style={{ bottom: 0, margin: 0 }}>Combined Volume of Asset Sales + Purchases</p>
                </Card>
              </Col>
              <Col xs={24} xl={8}>
                <Card hoverable title="Trade Type Ratio" style={{borderRadius: '15px', boxShadow: '1px 1px 1px 1px #000000' }}>
                  <h1 style={{ fontSize: '30px' }}><font color='green'>4</font>/<font color='red'>4</font></h1>

                  <p style={{ bottom: 0, margin: 0 }}>Purchases Trades / Sales Trades</p>
                </Card>
              </Col>
            </Row>
          </div>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"  }}>
            <StatusFilter
            filterBy={this.handleFilter}
            style={{float: "left", marginLeft: 25}}
            />
            <TitleSearch onSearch={this.handleSearch} style={{marginRight: 20}} />
            </div>

            {/* Table */}
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
        </Content>
        <FooterComponent />
      </Layout>
    );
  }
}

export default CongressTrades;
