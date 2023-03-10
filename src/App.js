/* eslint-disable no-unused-vars */
import {useState,useEffect} from 'react';
import {Route,Routes} from 'react-router-dom';
import { useContext } from 'react';
import './css-modules/App.module.css';
import Header from './components/Header';
import {UserContextProvider} from './contexts/UserContextProvide';


function App() {
	
	return (
		<UserContextProvider>
			<div className="App">
				<Header/>
				{/* <NavBar/> */}
				
				{/* <Routes>
					<Route path='/' element={<Home/>} />
					<Route path='/login' element={<LogIn/>} />
					<Route path='/sigUp' element={<SignUp/>} />
				</Routes> */}
			</div>
		</UserContextProvider>
		

	);
}

export default App;
