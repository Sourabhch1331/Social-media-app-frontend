/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect} from "react";
import swal from 'sweetalert';
import {UserContext} from '../../contexts/UserContextProvide';
import style from '../../css-modules/Form.module.css';
import {Link} from 'react-router-dom';
import Loading from "../Loading";

const SignUp = ()=>{
    const defaultValues = {
        name:"",
        username: "",
        email:"",
        password:"",
        passwordConfirm:""
    };
    const [formData,setFormData] = useState(defaultValues);
    const [photo,setPhoto] = useState(null);
    
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
    const handlePhotoSelection = (event) => {
        setPhoto(photo => event.target.files[0]);
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();
        setIsPending(true); 


        let data = new FormData();
        data.append('name',formData.name);
        data.append('username',formData.username);
        data.append('email',formData.email);
        data.append('password',formData.password);
        data.append('passwordConfirm',formData.passwordConfirm);
        
        if(photo){
            data.append('photo',photo);
        }
        
        try{
            const url='https://socionet.onrender.com/api/v1/user/signUp';
           
            fetch(url, {
				method: 'POST',
                body: data,
                credentials:'include'
			})
            .then(res => res.json())
            .then(res=>{
                // console.log(res);
                if(!res.status || res.status !== "success"){
                    setErr(err => res.message || "something went wrong!");
                    swal(res.message);
                }
                else{
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
                <h2>Signup Form</h2>
                
                <input 
                    type="text" 
                    placeholder="Name"
                    name="name"
                    required
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="User Name"
                    name="username"
                    required
                    onChange={handleChange}
                />
                <input 
                    type="email" 
                    placeholder="example@gmail.com"
                    name="email"
                    required
                    onChange={handleChange}
                />
                <input 
                    type="password" 
                    placeholder="password"
                    name="password"
                    required
                    onChange={handleChange}
                />
                
                <input 
                    type="password" 
                    placeholder="password confirm"
                    name="passwordConfirm"
                    required
                    onChange={handleChange}
                />
                Profile Photo
                <input 
                    className={style.photSelect}
                    type="file" 
                    placeholder="Upload Image"
                    name="photo"
                    onChange={handlePhotoSelection}
                />
                
                {!isPending ? <button type="submit">SignUp</button>:<Loading/>}
                
            </form>
            <div className={style.already}>
                <div className={style.flex}>
                    <div className={style.mg}>Already have a Account ?</div>
                    <Link className={style.noStyle} to='/login'>Click Here to Login</Link>
                </div>
            </div>
        </div>
    )

}

export default SignUp;