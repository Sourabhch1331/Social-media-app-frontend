/* eslint-disable no-unused-vars */
import { useState } from 'react';
import style from '../css-modules/SideBar.module.css';
import {Link} from 'react-router-dom';


const SideNavBar = ()=> {
    const [active,setActive] = useState(null);
    
    // const 

    const handleClick =(event) => {
        if(active){
            let curr=active;
            curr.classList.remove(style.whiteBg);
        }
        event.target.classList.add(style.whiteBg);
        
        setActive(active => event.target);
    }

    return (
        <div className={style.navBar}>
            <ul>
                <li><Link onClick={handleClick} to='/'>Feed</Link></li>
                <li><Link onClick={handleClick} to='/all-users'>All Users</Link></li>
                <li><Link onClick={handleClick} to='/post'>Create Post</Link></li>
                <li><Link onClick={handleClick} to='/my-post'>My post</Link></li>
                <li><Link onClick={handleClick} to='/my-profile'>My profile</Link></li>
                <li><Link onClick={handleClick} to='/about'>About</Link></li>
                
            </ul>
        </div>
    )
};

export default SideNavBar;