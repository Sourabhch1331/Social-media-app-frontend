/* eslint-disable no-unused-vars */
import { useState, useContext, useRef} from "react";
import {useNavigate} from 'react-router-dom';

import {UserContext} from '../../contexts/UserContextProvide';
import style from '../../css-modules/Form.module.css';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import Loading from '../Loading';

const Login = ()=>{
    const emailRef=useRef("")
    const passwordRef=useRef("")

    const [isPending,setIsPending] = useState(false);

    const navigate=useNavigate();

    const {setErr,setIsLogedIn} = useContext(UserContext);

    const handleSubmit = async (event)=>{
        
        event.preventDefault();
        setIsPending(true); 
        const data={
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value.trim()
        };
        
        try{
            const url='https://socionet.onrender.com/api/v1/user/login';
           
            fetch(url, {
				method: 'POST',
                body: JSON.stringify(data),
                credentials:'include',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
			})
            .then(res => res.json())
            .then(res=>{
    
                if(!res.status || res.status !== "success"){
                    swal(res.message);
                    setErr(err => res.message || "something went wrong!");
                }
                else{
                    setIsLogedIn((prev) => true);
                    window.location.href='/';
                }
                setIsPending(false); 
            });
        }
        catch(error){
            console.log("err 💥",error);
            setIsPending(false); 
        };

    };

    return (
        <div className={style.formWrapper}>
            <form className={style.form} onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                Email
                <input 
                    type="email" 
                    ref={emailRef}
                    placeholder="example@gmail.com"
                    name="email"
                    // onChange={handleChange}
                />
                Password
                <input 
                    type="password" 
                    ref={passwordRef}
                    placeholder="**********"
                    name="password"
                    // onChange={handleChange}
                />
                {!isPending ? <button type="submit">Login</button>:<Loading/>}
            </form>
        
            <div className={style.already}>
                <div className={style.flex}>
                    <div className={style.mg}>Don't have a Account ?</div>
                    <Link className={style.noStyle} to='/signup'>Click Here to Register</Link>
                </div>
            </div>
        </div>
    
    )

}

export default Login;