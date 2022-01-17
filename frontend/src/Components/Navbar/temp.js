import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import './Navbar.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { StockOutlined} from '@ant-design/icons';

const { Header } = Layout;



class Navbar extends React.Component() {
    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
      };
    render() {
        const { current } = this.state;
        return (
            <Header className="header">
                <Menu theme='dark' mode="horizontal">
                    <Menu.Item key="SenateTrades" icon={<StockOutlined />}>
                        <Link exact to='/congress-trades'>Senate Trades</Link>
                    </Menu.Item>

                    <Menu.Item key="SenateProfiles" icon={<StockOutlined />}>
                        <Link exact to='/congress-people'>Senate Profiles</Link>
                    </Menu.Item>
                    
                </Menu>
            
            </Header>
        )
    }
}

export default Navbar;