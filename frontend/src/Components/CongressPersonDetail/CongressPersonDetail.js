import React from 'react';

import { Card, Table, Tag, Avatar } from 'antd';
import { Layout, Col, Row, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import FooterComponent from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'
import { StatusFilter } from "../Filters/StatusFilter";
import { TitleSearch } from "../Filters/TitleSearch";
import reqwest from 'reqwest';
import "./CongressPersonDetail.css"

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
      render: text => <a style={{ textDecoration: "none" }} href={`http://localhost:3000/ticker/${text}`}>{text}</a>
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
    },
    {
        title: 'Source',
        dataIndex: 'ptrLink',
        key: 'ptrLink',
        render: link => <a style={{ textDecoration: "none" }} href={link}>Source</a>,
    },
];

const getRandomuserParams = params => ({
  limit: params.pagination.pageSize,
  offset: params.pagination.current  * params.pagination.pageSize,
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
      url: `http://127.0.0.1:8000/government/congress-person/${this.props.match.params.slug}/?format=json`,
      method: 'get',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      console.log(data);
      console.log(data.count);
      console.log(params.pagination.pageSize);
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
      <div style={{backgroundColor: "black", position: "relative", height: "100%"}}>
      <Navbar />
        <div style={{ marginLeft: "20px", marginRight: "20px", marginBottom: "15px", marginTop: "15px"}}>
        <Card hoverable title={this.props.match.params.slug} style={{borderRadius: '15px', boxShadow: '1px 1px 1px 1px #000000' }}>
          <Avatar size={125} icon={<UserOutlined />} />

        </Card>
        </div>
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