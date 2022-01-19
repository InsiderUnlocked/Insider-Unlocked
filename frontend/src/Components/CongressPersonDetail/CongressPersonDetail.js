// Purpose: Build out person detail page

// Imports
import React from "react";
import { Card, Table, Tag, Avatar } from "antd";
import { Layout, Col, Row, DatePicker } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FooterComponent from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { TitleSearch } from "../../Utils/Search/TitleSearch";
import reqwest from "reqwest";
import "./CongressPersonDetail.css";

// Initilze that our content is equal to the layout
const { Content } = Layout;

// Initilze our columns
const columns = [
  {
    title: "Transaction Date",
    dataIndex: "transactionDate",
    key: "transactionDate",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Ticker",
    dataIndex: "ticker",
    key: "ticker",
    render: (text) => (
      <a
        style={{ textDecoration: "none" }}
        href={`https://insiderunlocked.web.app/ticker/${text}`}
      >
        {text}
      </a>
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
  },
  {
    title: "Source",
    dataIndex: "ptrLink",
    key: "ptrLink",
    render: (link) => (
      <a style={{ textDecoration: "none" }} href={link}>
        Source
      </a>
    ),
  },
];

// For pagination to work we need to get the user input, such as page size, and current page number this is what the function does
const getURLParams = (params) => ({
  // Limit represents how much data per page
  limit: params.pagination.pageSize,
  // offset represents how much data is being ignored
  offset: (params.pagination.current - 1) * params.pagination.pageSize,
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
    // Initilze stats
    stats: {
      // Intilize the total number of records
      total: 0,
      // Intilize the total volume
      volume: 0,
      // intilize the number of purchases
      purchases: 0,
      // intilize the number of sales
      sales: 0,
    },
    justTest: 0,
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
      url: `http://127.0.0.1:8000/government/congress-person/${this.props.match.params.slug}/?format=json`,
      method: "get",
      type: "json",
      // Get the user params to validate the pagination for the request URL
      data: getURLParams(params),
      // Upon the requeset validiating
    }).then((data) => {


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

      // once we gets stats variables, connect to the stats backend
      });
    }).then(() => {
      reqwest({
        url: `http://127.0.0.1:8000/government/summary-stats/90/?format=json`,
        method: "get",
        type: "json",
        // Upon the requeset validiating
      }).then((response) => {
        this.setState({
          stats: {
            // Assign the stats variables
            volume: response.results[0].totalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            total: response.results[0].total,
            purchases: response.results[0].purchases,
            sales: response.results[0].sales,
          },
        });
      })
      
    });
  };

  render() {
    const { data, pagination, loading, stats } = this.state;
    return (
      <Layout style={{ marginRight: 0 }}>
        {/* Rendering our navbar*/}
        <Navbar />
        {/* Initilzing our content */}
        <Content>
          {/* Rendering our top card which talks/shows the senator were talking about*/}
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "15px",
              marginTop: "15px",
            }}
          >
            <Card
              hoverable
              title={this.props.match.params.slug}
              className = "smooth-card"
            >
              <Avatar size={125} icon={<UserOutlined />} />
            </Card>
          </div>

          {/* Rendering our 3 Stats Cards*/}
          <div className="site-card-wrapper" style={{ marginBottom: 20 }}>
            <Row gutter={[16, 16]} style={{ margin: 10 }}>
              <Col xs={24} xl={8}>
                <Card
                  hoverable
                  title="Number of Transactions"
                  className = "smooth-card"
                >
                  <h1 style={{ fontSize: "30px" }}>{stats.total}</h1>

                  <p style={{ bottom: 0, margin: 0 }}>
                    Total Number of Trades in Disclosure
                  </p>
                </Card>
              </Col>
              <Col xs={24} xl={8}>
                <Card
                  hoverable
                  title="Total Trade Volume"
                  className = "smooth-card"
                >
                  <h1 style={{ fontSize: "30px" }}>${stats.volume}</h1>

                  <p style={{ bottom: 0, margin: 0 }}>
                    Combined Volume of Asset Sales + Purchases
                  </p>
                </Card>
              </Col>
              <Col xs={24} xl={8}>
                <Card
                  hoverable
                  title="Trade Type Ratio"
                  className = "smooth-card"
                >
                  <h1 style={{ fontSize: "30px" }}>
                    <font color="green">{stats.purchases}</font>/<font color="red">{stats.sales}</font>
                  </h1>

                  <p style={{ bottom: 0, margin: 0 }}>
                    Purchases Trades / Sales Trades
                  </p>
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
