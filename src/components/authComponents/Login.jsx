/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect} from "react";
import {UserContext} from '../../contexts/UserContextProvide';
import style from '../../css-modules/Login.module.css';
import swal from 'sweetalert';

const Login = ()=>{
    const [formData,setFormData] = useState({email:"",password:""});
    const [isPending,setIsPending] = useState(false);

    const {setErr} = useContext(UserContext);

    const handleChange = (event) => {
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]:event.target.value
            }
        });
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();
        setIsPending(true); 
        const data={
            email: formData.email.trim(),
            password: formData.password.trim()
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
                    window.location.href='/'
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
        <>
            <form className={style.form} onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                Email
                <input 
                    type="email" 
                    placeholder="example@gmail.com"
                    name="email"
                    onChange={handleChange}
                />
                Password
                <input 
                    type="password" 
                    placeholder="**********"
                    name="password"
                    onChange={handleChange}
                />
                <button type="submit">{!isPending ? 'Login':'LogingIn..'}</button>
            </form>
        </>
    )

}

export default Login;