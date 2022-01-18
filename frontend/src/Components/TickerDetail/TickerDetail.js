// Purpose: create ticker detail page

// IMPORTS
import React from 'react';

import { Table, Tag, Row, Col, Card } from 'antd';
import "./TickerDetail.css"

import {Themes, TradingViewWidget} from 'react-tradingview-widget';

import FooterComponent from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'


import reqwest from 'reqwest';
import Sorter from '../../Utils/Sorter/Sorter';

// Initilizing the columns of our table
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
        dataIndex: 'name',
        key: 'name',
        render: text => <a style={{ textDecoration: "none" }} href={`http://localhost:3000/congress-people/${text}`}>{text}</a>
    },
    {
        title: 'Source',
        dataIndex: 'ptrLink',
        key: 'ptrLink',
        render: link => <a style={{ textDecoration: "none" }} href={link}>Source</a>,
    },
];

// For pagination to work we need to get the user input, such as page size, and current page number this is what the function does
const getURLParams = params => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

class CongressTrades extends React.Component {
  // Static variables that we will fetch later on 
  state = {
    // Variable to hold the data we retrieve from our request
    data: [],
    // Keeps track of pagination variables
    pagination: {
      // Current page of the user
      current: 1,
      // Current page size of the user's table
      pageSize: 20,
    },
    // Initilzing a skeleton loader
    loading: false,
  };

  // This function is called when this component is first mounted to DOM(meaning when its first visually represented)
  componentDidMount() {
    // We assign the pagination variable what we initilzed earlier in the state variable
    const { pagination } = this.state;
    // Fetch this variable
    this.fetch({ pagination });
  }

  // Function called when any changes are done to the table
  handleTableChange = (pagination) => {
    // Fetch the pagination variable to validate the pagination request of the user
    this.fetch({
      pagination,
    });
  };

  // Request the info from the backend
  fetch = (params = {}) => {
    // Set the skeleton loader to true while we are making the request
    this.setState({ loading: true });
    reqwest({
      url: `http://127.0.0.1:8000/government/ticker/${this.props.match.params.slug}/?format=json`,
      method: 'get',
      type: 'json',
      // Get the user params to validate the pagination for the request URL
      data: getURLParams(params),
      // Upon the requeset validiating
    }).then(data => {
      // Assign variables respectively
      this.setState({
        // Set skeleton loader to false as data is loaded
        loading: false,
        data: data.results,
        pagination: {
          ...params.pagination,
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
          <div className = "headerSummaryDiv">
              <h1 className = "headerSummaryText">Summary for the last 30 days</h1>
            </div>

              {/* Stats*/}
            <div className="site-card-wrapper" style={{marginBottom: 20}}>
            <Row gutter={[16, 16]} style={{ margin: 10 }}>
              <Col xs={24} xl={8}>
                <Card hoverable title="Number of Transactions" className = "smooth-card">
                  <h1 style={{ fontSize: '30px' }}>4</h1>
                  <p style={{ bottom: 0, margin: 0 }}>Total Number of Trades in Disclosure</p>
                </Card>
              </Col>
              <Col xs={24} xl={8}>
                <Card hoverable title="Total Trade Volume" className = "smooth-card">
                  <h1 style={{ fontSize: '30px' }}>$2,350.00</h1>

                  <p style={{ bottom: 0, margin: 0 }}>Combined Volume of Asset Sales + Purchases</p>
                </Card>
              </Col>
              <Col xs={24} xl={8}>
                <Card hoverable title="Trade Type Ratio" className = "smooth-card">
                  <h1 style={{ fontSize: '30px' }}><font color='green'>4</font>/<font color='red'>4</font></h1>

                  <p style={{ bottom: 0, margin: 0 }}>Purchases Trades / Sales Trades</p>
                </Card>
              </Col>
            </Row>
          </div>
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