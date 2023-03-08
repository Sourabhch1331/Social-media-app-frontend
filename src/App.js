/* eslint-disable no-unused-vars */
import {createContext,useState,useEffect} from 'react';
import {Route,Routes} from 'react-router-dom';

import './css-modules/App.module.css';
import Header from './components/Header';

const userContext = createContext({user:null,isLogedIn:false});

function App() {
	const [userDetails,setUserDetails] = useState(null);
	const [isLogedIn,setIsLogedIn] = useState(false);
	const [err,setErr] = useState(null);
	const [isPending,setIsPending] = useState(true);

	

	useEffect(()=>{
		const controller = new AbortController();
		const signal = controller.signal;


		const getUser= async ()=>{
			const url=`https://wild-gray-parrot-gear.cyclic.app/api/v1/me`;
				fetch(url, {
					method: 'GET',
					signal
				})
				.then(res => res.json())
				.then(res => console.log(res))
				.catch(err=>{
					if(err.name !== 'AbortError'){
						console.log("Error 💥",err);
					}
				});
		}
		
		// getUser();

		return ()=>{
			controller.abort();
		}

	},[]);

	return (
		<div className="App">
			<userContext.Provider value={userDetails}>
				<Header/>
				{/* <NavBar/> */}
				<div>side bar</div>
				<Routes>
					<Route path='/login' element={<h1>login page</h1>} />
				</Routes>
			</userContext.Provider>
			</div>

	);
}

export default App;
