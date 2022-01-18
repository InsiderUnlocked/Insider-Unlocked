import React from 'react';

import { Table, Tag } from 'antd';
import { Layout, Image, Row, Col, Card } from 'antd';

import FooterComponent from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'
import { TitleSearch } from '../Filters/TitleSearch';
import { StatusFilter } from '../Filters/StatusFilter';
import reqwest from 'reqwest';

const { Content } = Layout;

const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: text => <a href={`http://localhost:3000/congress-people/${text}`}>{text}</a>
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

const getRandomuserParams = params => ({
  results: params.pagination.pageSize,
  offset: (params.pagination.current - 1) * 100,
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
      url: 'http://127.0.0.1:8000/government/congress-all/?format=json',
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
        <Layout>
          <Navbar />
          <Content>
          <div style={{ position: 'relative', marginLeft: 25, marginTop: 10 }}>
              <h1 style={{ display: 'inline', position: 'relative'  }}>Summary for the last 30 days</h1>
              <div style={{ display: 'inline', right: 25, position: 'absolute' }}>
              </div>
            </div>

            {/* Stats*/}
            <div className="site-card-wrapper" style={{ marginBottom: 20, marginRight: 20, marginLeft: 20, marginTop: 20 }}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col xs={24} xl={8}>
                  <Card hoverable title="Number of Transactions" style={{borderRadius: '15px', boxShadow: '1px 1px 1px 1px #000000' }}>
                    <h1 style={{ fontSize: '30px' }}>4</h1>

                    <p style={{ bottom: 0, margin: 0 }}>Total number of trades in disclosure</p>
                  </Card>
                </Col>
                <Col xs={24} xl={8}>
                  <Card hoverable title="Total Trade Volume" style={{borderRadius: '15px', boxShadow: '1px 1px 1px 1px #000000' }}>
                    <h1 style={{ fontSize: '30px' }}>$2,350.00</h1>

                    <p style={{ bottom: 0, margin: 0 }}>Combined volume of asset sales + purchases</p>
                  </Card>
                </Col>
                <Col xs={24} xl={8}>
                  <Card hoverable title="Trade Type Ratio" style={{borderRadius: '15px', boxShadow: '1px 1px 1px 1px #000000' }}>
                    <h1 style={{ fontSize: '30px' }}><font color='green'>4</font>/<font color='red'>4</font></h1>

                    <p style={{ bottom: 0, margin: 0 }}>Purchases trades / Sales trades</p>
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
          </Content>

        </Layout>
    );
  }
}

export default CongressTrades;

// ReactDOM.render(<App />, mountNode);