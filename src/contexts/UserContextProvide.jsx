/* eslint-disable no-unused-vars */
import {createContext,useState,useEffect} from 'react';

export const UserContext = createContext({user:null,isLogedIn:false,err:null,isPending:true});


export const UserContextProvider = ({children})=>{
    const [user,setUser] = useState(null);
	const [isLogedIn,setIsLogedIn] = useState(false);
	const [err,setErr] = useState(null);
	const [isPending,setIsPending] = useState(true);

	useEffect(()=>{
		const controller = new AbortController();
		const signal = controller.signal;

		const getUser= ()=>{
			const url=`https://socionet.onrender.com/api/v1/user/me`;
			
			fetch(url, {
				method: 'GET',
				credentials:'include',
				signal
			})
			.then(res => res.json())
			.then(res =>{
				if(res.status !== "fail"){
					setIsLogedIn(true);
					setUser(user => res.data.user);	
				}else{
					throw new Error(res.message);
				}
			})
			.catch(error=>{
				console.log("error",error);
				if(error.name !== 'AbortError'){
					setErr(err => error);
				}
			});
			setIsPending(isPending => false);
		}
		
		getUser();

		return ()=>{
			controller.abort();
		}

	},[]);

	const values={
		user,
		setUser,
		isLogedIn,
		setIsLogedIn,
		err,
		setErr
	}

    return (
        <UserContext.Provider value={values}> {children} </UserContext.Provider>
    );
}

