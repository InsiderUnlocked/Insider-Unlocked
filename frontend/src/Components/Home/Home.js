// Import Libraries
import { Layout } from 'antd';
import './Home.css';

import Navbar from '../Navbar/Navbar'
import FooterComponent from '../Footer/Footer';


const Home = () => {  
  return (
    <div className='App'>
      <Layout>
        <Navbar />
        <FooterComponent />
      </Layout>
    </div>
  )
}

export default Home;
