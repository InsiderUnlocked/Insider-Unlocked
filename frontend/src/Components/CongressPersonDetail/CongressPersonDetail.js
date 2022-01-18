// Purpose: Build out person detail page

// Imports
import React from "react";
import { Card, Table, Tag, Avatar } from "antd";
import { Layout, Col, Row, DatePicker } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FooterComponent from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { TitleSearch } from "../Filters/TitleSearch";
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
        href={`http://localhost:3000/ticker/${text}`}
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
  offset: params.pagination.current * params.pagination.pageSize,
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
      });
    });
  };

  render() {
    const { data, pagination, loading } = this.state;
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
              style={{
                borderRadius: "15px",
                boxShadow: "1px 1px 1px 1px #000000",
              }}
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
                  style={{
                    borderRadius: "15px",
                    boxShadow: "1px 1px 1px 1px #000000",
                  }}
                >
                  <h1 style={{ fontSize: "30px" }}>4</h1>

                  <p style={{ bottom: 0, margin: 0 }}>
                    Total Number of Trades in Disclosure
                  </p>
                </Card>
              </Col>
              <Col xs={24} xl={8}>
                <Card
                  hoverable
                  title="Total Trade Volume"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "1px 1px 1px 1px #000000",
                  }}
                >
                  <h1 style={{ fontSize: "30px" }}>$2,350.00</h1>

                  <p style={{ bottom: 0, margin: 0 }}>
                    Combined Volume of Asset Sales + Purchases
                  </p>
                </Card>
              </Col>
              <Col xs={24} xl={8}>
                <Card
                  hoverable
                  title="Trade Type Ratio"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "1px 1px 1px 1px #000000",
                  }}
                >
                  <h1 style={{ fontSize: "30px" }}>
                    <font color="green">4</font>/<font color="red">4</font>
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
