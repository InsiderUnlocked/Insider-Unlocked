// Purpose: Build out our main page which is the trades of the congress

// Imports
import React, { useState } from "react";
import { Table, Tag, Card, Col, Row, DatePicker, Space } from "antd";
import { Layout } from "antd";
import FooterComponent from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import reqwest from "reqwest";
import "./CongressTrades.css";
import { TitleSearch } from "../../Utils/Search/TitleSearch";



// Initilze our columns
const columns = [
  {
    title: "Transaction Date",
    dataIndex: "transactionDate",
    key: "transactionDate",
    sorter: (a, b) => new Date(a.transactionDate) - new Date(b.transactionDate)
  },
  {
    title: "Ticker",
    dataIndex: "ticker",
    key: "ticker",
    render: (text) => (
      <a href={`https://insiderunlocked.web.app/ticker/${text}`}>{text}</a>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Purchase/Sale",
    key: "type",
    dataIndex: "type",
    render: (type) => (
      <Tag
        color={type === "Sale" || type === "S" ? "volcano" : "green"}
        key={type === "S" || type === "Sale" ? "Sale" : "Purchase"}
      >
        {type === "S" || type === "Sale" ? "Sale" : "Purchase"}
      </Tag>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <a href={`https://insiderunlocked.web.app/congress-people/${text}`}>{text}</a>
    ),
  },
  {
    title: "Source",
    dataIndex: "ptrLink",
    key: "ptrLink",
    render: (link) => <a href={link}>Source</a>,
  },
];

// For pagination to work we need to get the user input, such as page size, and current page number this is what the function does
const getURLParams = (params) => ({
  // Set the ticker search
  search: params.ticker,
  // Limit represents how much data per page
  limit: params.pagination.pageSize,
  // offset represents how much data is being ignored
  offset: (params.pagination.current - 1) * params.pagination.pageSize,
});


// Initilze that our content is equal to the layout
const { Content } = Layout;
// const [totalTradeVolume, setTotalTradeVolumer] = useState([]);
// const [purchaseSaleRatio, setPurchaseSaleRatio] = React.useState({0: 0});

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

    ticker: "",
    // Initilzing a skeleton loader
    loading: false,
    
    totalTradeVolume: 0,
    purchases: 0,
    sales: 0,
    totalTransactions: 0,
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
  
  handleSearch = (ticker, pagination) => {
    
    this.setState({ ticker });
    this.fetch({
      pagination,
      ticker,
    });
  };


  // Request the info from the backend
  fetch = (params = {}) => {
    // Set the skeleton loader to true while we are making the request
    this.setState({ loading: true });
    reqwest({
      url: "http://localhost:8000/government/summary-stats/90/?format=json",
      method: "get",
      type: "json",
      // Get the user params to validate the pagination for the request URL
      data: getURLParams(params),
      // Upon the requeset validiating
    }).then((data) => {
      console.log("hello 2nd");
      console.log(data);
      // Assign variables respectively
      this.setState({
        // Set skeleton loader to false as data is loaded
        loading: false,
        // Assign the data
        data: data.results,
        // Assign the pagination variables
        pagination: {
          ...params.pagination,
          total: data.count - params.pagination.pageSize,
        },
        totalTradeVolume: data.results[0].totalVolume,
        purchases: data.results[0].purchases,
        sales: data.results[0].sales,
        totalTransactions: data.results[0].total,
      });
    });
  };

  

  render() {
    const { data, pagination, loading, totalTradeVolume, purchases, sales, totalTransactions } = this.state;
    return (
      <Layout style={{ marginRight: 0, minHeight: 1100 }}>
        {/* Rendering our navbar*/}
        <Navbar />
        {/* Initilzing our content */}
        <Content>
            {/* Rendering our Header Summary Text*/}
            <div className="headerSummaryDiv">
              <h1 className="headerSummaryText">Summary for the last 90 days</h1>
            </div>

          {/* Rendering our 3 Stats Cards*/}
          <div className="site-card-wrapper" style={{marginBottom: 20}}>
            <Row gutter={[16, 16]} style={{ margin: 10 }}>
              <Col xs={24} xl={8}>
                <Card hoverable title="Number of Transactions" className = "smooth-card">
                  <h1 style={{ fontSize: '30px' }}>{totalTransactions}</h1>
                  <p style={{ bottom: 0, margin: 0 }}>Total Number of Trades in Disclosure</p>
                </Card>
              </Col>
              <Col xs={24} xl={8}>
                <Card hoverable title="Total Trade Volume" className = "smooth-card">
                  <h1 style={{ fontSize: '30px' }}>{totalTradeVolume}</h1>

                  <p style={{ bottom: 0, margin: 0 }}>Combined Volume of Asset Sales + Purchases</p>
                </Card>
              </Col>
              <Col xs={24} xl={8}>
                <Card hoverable title="Trade Type Ratio" className = "smooth-card">
                  <h1 style={{ fontSize: '30px' }}><font color='green'>{purchases}</font>/<font color='red'>{sales}</font></h1>

                  <p style={{ bottom: 0, margin: 0 }}>Purchases Trades / Sales Trades</p>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Rendering our search component*/}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TitleSearch
              onSearch={this.handleSearch}
              style={{ marginRight: 20 }}
            />
          </div>

          {/* Rendering our table */}
          <Table
            // Make columns and rows bordered
            bordered
            // Assign columns
            columns={columns}
            // Assign data
            dataSource={data}
            // Assign pagination
            pagination={pagination}
            // Assign skeleton loader
            loading={loading}
            // On change to this table call the handleTableChange function
            onChange={this.handleTableChange}
            // Some styling
            scroll={{ x: "max-content", y: "48vh" }}
            style={{ margin: 20, boxShadow: "1px 1px 1px 1px #ccc" }}
          />
        </Content>
        <FooterComponent />
      </Layout>
    );
  }
}

export default CongressTrades;
