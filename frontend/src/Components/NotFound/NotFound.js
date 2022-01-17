// Import Libraries
import { Layout, Button, Result } from 'antd';
import './NotFound.css';

import Navbar from '../Navbar/Navbar'
import FooterComponent from '../Footer/Footer';
import { Link } from 'react-router-dom'
const { Content } = Layout;

const NotFound = () => {  
  return (
    <div className='App'>
      <Layout>
        <Navbar />
        <Content>
           <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link exact to='/'><Button totype="primary">Back Home</Button></Link>}
            />
        </Content>
        <FooterComponent />
      </Layout>
    </div>
  )
}

export default NotFound;