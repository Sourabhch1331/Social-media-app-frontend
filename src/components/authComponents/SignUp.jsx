/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect} from "react";
import swal from 'sweetalert';
import {UserContext} from '../../contexts/UserContextProvide';
import style from '../../css-modules/Login.module.css';

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
                console.log(res);
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
        <>
            <form className={style.form} onSubmit={handleSubmit}>
                <h2>Signup Form</h2>
                Name
                <input 
                    type="text" 
                    placeholder="Your Name"
                    name="name"
                    required
                    onChange={handleChange}
                />
                User Name
                <input 
                    type="text" 
                    placeholder="User Name"
                    name="username"
                    required
                    onChange={handleChange}
                />
                Email
                <input 
                    type="email" 
                    placeholder="example@gmail.com"
                    name="email"
                    required
                    onChange={handleChange}
                />
                Password
                <input 
                    type="password" 
                    placeholder="password"
                    name="password"
                    required
                    onChange={handleChange}
                />
                Confirm Password
                <input 
                    type="password" 
                    placeholder="password confirm"
                    name="passwordConfirm"
                    required
                    onChange={handleChange}
                />
                Upload Profile Photo
                <input 
                    className={style.photSelect}
                    type="file" 
                    placeholder="Upload Image"
                    name="photo"
                    onChange={handlePhotoSelection}
                />

                <button type="submit">{!isPending ? 'SignUp':'SigingUp..'}</button>
            </form>
        </>
    )

}

export default SignUp;