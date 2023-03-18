/* eslint-disable no-unused-vars */
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import style from '../css-modules/Header.module.css';
import {UserContext} from '../contexts/UserContextProvide';
// import {Cookies} from 'js-cookie';


const Header = ()=>{
    const {isLogedIn,user} = useContext(UserContext);
    
    // console.log(UserContext);
    
    return (
        <header className={style.navBar}>
            <span></span>
            <h2>Socionet</h2>
            {!isLogedIn ? <AuthBar />:<UserIcon {...user}/> }

        </header>
    )
}

const AuthBar = ()=>{
    return(
        <ul>
            <li><Link to='/login'>login</Link></li>
            <li><Link to='/signup'>signup</Link></li>
        </ul>
    )
};

const UserIcon = (props)=> {
    const {setIsLogedIn,setUser} = useContext(UserContext);

    const logOut = () => {
        try{
            const url = 'https://socionet.onrender.com/api/v1/user/logout';
            fetch(url, {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(()=>{
                setIsLogedIn(false);
                setUser(null)
            })
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <div className={style.userIcon}>
            <img className={style.userPhoto} src={props.photo} alt="User_photo" />
            <button className={style.logoutBtn} onClick={logOut}>LogOut</button>
        </div>
    )
}

export default Header;