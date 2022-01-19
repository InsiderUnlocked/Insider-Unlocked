// Purpose: Build out the page that shows all the senate


// Imports
import React from 'react';
import { Table, Tag } from 'antd';
import { Layout, Image, Row, Col, Card, Space } from 'antd';
import FooterComponent from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'
import { TitleSearch } from "../../Utils/Search/TitleSearch";
import reqwest from 'reqwest';

// Initilze that our content is equal to the layout
const { Content } = Layout;

// Initilze our columns
const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      // remove dots from the name
      render: text => <a href={`https://insiderunlocked.web.app/congress-people/${text.replace(/\./g, " ")}`}>{text}</a>
    },
    {
      title: 'Party',
      dataIndex: 'currentParty',
      key: 'currentParty',
    },
    {
      title: 'Chamber',
      dataIndex: 'currentChamber',
      key: 'currentChamber',
    },
    {
        title: 'image',
        dataIndex: 'image',
        key: 'image',
        render: image => <Image width={100} src={image}/>,
    },
    {
        title: 'state',
        dataIndex: 'currentState',
        key: 'currentState',
    },
];

// For pagination to work we need to get the user input, such as page size, and current page number this is what the function does
const getURLParams = (params) => ({
  // Set the name search
  search: params.name,
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

    name: "",
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

  handleSearch = (name, pagination) => {
    // Handles the search, takes the value of the user input
    // make this input part of the request url
    this.setState({ name });
    // Fetch the data with the new ticker
    this.fetch({
      pagination,
      name,
    });
  };
  // Request the info from the backend
  fetch = (params = {}) => {
    // Set the skeleton loader to true while we are making the request
    this.setState({ loading: true });
    reqwest({
      url: 'http://127.0.0.1:8000/government/congress-all/?format=json',
      method: 'get',
      type: 'json',
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
        <Layout style={{ marginRight: 0, minHeight: 1100}}>
          {/* Rendering our navbar*/}
          <Navbar />
          {/* Initilzing our content */}
          <Content>

           {/* Rendering our Header Summary Text*/}
           <div className="headerSummaryDiv">
            <h1 className="headerSummaryText">All of congress</h1>
          </div>
          {/* create a grid of cards */}
          <Row gutter={[24, 24]} style={{ margin: 10 }}>
            {/* Loop through the data and render the cards */}
            {data.map((item) => (
              <Col xs={24} xl={4} key={item.id}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={item.image} style={{height: 250}} />}
                >
                  {/* make text bold*/}
                  
                  <p> Full Name: {item.fullName}</p>
                  <p>{item.currentParty}</p>
                  <p>{item.currentChamber}</p>
                  <p>{item.currentState}</p>

                </Card>
              </Col>
            ))}
          
          </Row>
          <div className="headerSummaryDiv">
            
          </div>
          </Content>
          <FooterComponent />
        </Layout>
    );
  }
}

export default CongressTrades;

// ReactDOM.render(<App />, mountNode);