/* eslint-disable no-unused-vars */
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import style from '../css-modules/Header.module.css';
import {UserContext} from '../contexts/UserContextProvide';


const Header = ()=>{
    const userContext = useContext(UserContext);
    
    console.log(userContext);

    return (
        <header className={style.navBar}>
            <span></span>
            <h2>Socionect</h2>
            <ul>
                <li><Link to='/login'>login</Link></li>
                <li><Link to='/signup'>signup</Link></li>
            </ul>
        </header>
    )
}

export default Header;