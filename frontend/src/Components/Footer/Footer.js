import { Layout } from 'antd';
import { FaDiscord } from 'react-icons/fa';

import './Footer.css';

const { Footer } = Layout;

const centerStyle = { position: 'relative', display: 'flex'};
  
const FooterComponent = () => {
    return (
        <div className="footer">
            {/* <span>Copyright © 2021 Insider Unlocked, Inc. All rights reserved</span> */}
        </div>
    )
}

export default FooterComponent