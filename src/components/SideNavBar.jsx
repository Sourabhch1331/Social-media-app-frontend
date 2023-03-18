/* eslint-disable no-unused-vars */

import style from '../css-modules/SideBar.module.css';
import {Link} from 'react-router-dom';


const SideNavBar = ()=> {
    
    return (
        <div className={style.navBar}>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/serach'>Search</Link></li>
                <li><Link to='/post'>Create Post</Link></li>
                <li><Link to='/my-post'>My post</Link></li>
                <li><Link to='/my-profile'>My profile</Link></li>
                <li><Link to='/about'>About</Link></li>
            
            </ul>
        </div>
    )
};

export default SideNavBar;