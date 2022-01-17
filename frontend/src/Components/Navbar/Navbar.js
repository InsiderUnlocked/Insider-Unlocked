import { Layout, Menu } from 'antd';
import { Input } from 'antd';
import { Link } from 'react-router-dom'
import './Navbar.css';
import { StockOutlined, UserOutlined} from '@ant-design/icons';
const { Header } = Layout;
const { SubMenu } = Menu;

//  Imports for Navbar
const centerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  };
  
const rightStyle = { position: 'absolute', top: 0, right: 0 };

const { Search } = Input;
const onSearch = value => console.log(value);

const Navbar = () => {
    return (
        <Header className="header">  
            
            <Link to="/">
                <div className="logo">Insider Unlocked</div>
            </Link>
            
            <Menu theme='dark' mode="horizontal">
                <Menu.Item key="SenateTrades" icon={<StockOutlined />}>
                        <Link exact to='/Senate-Trades'>Senate Trades</Link>
                    </Menu.Item>

                    <Menu.Item key="SenateProfiles" icon={<UserOutlined />}>
                        <Link exact to='/Senate-People'>Senate Profiles</Link>
                    </Menu.Item>
            </Menu>
        </Header>
    )
}

export default Navbar;