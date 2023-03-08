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
			const url=`https://wild-gray-parrot-gear.cyclic.app/api/v1/users/me`;

			fetch(url, {
				method: 'GET',
				signal
			})
			.then(res => res.json())
			.then(res =>{
				console.log(res);
				if(res.status !== "fail"){
					setIsLogedIn(isLogedIn => true);
					setUser(user => res.data.user);	
				}
			})
			.catch(error=>{
				console.log(error);
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

    return (
        <UserContext.Provider value={{user,isLogedIn,err,isPending}}> {children} </UserContext.Provider>
    );
}

