/* eslint-disable no-unused-vars */
import {useState,useEffect} from 'react';
import {Route,Routes} from 'react-router-dom';
import { useContext } from 'react';
import style from'./css-modules/App.module.css';
import Header from './components/Header';
import SideNavBar from './components/SideNavBar';
import LogIn from './components/authComponents/Login';
import SignUp from './components/authComponents/SignUp';
import AllPost from './components/AllPost.jsx';
import AllUsers from './components/AllUsers.jsx';
import {UserContextProvider} from './contexts/UserContextProvide';


function App() {
	
	return (
		<UserContextProvider>
			<div className="App">
				<Header/>
				<div className={style.main}>
					<SideNavBar />
					<div className={style.hero}>
						<Routes>
							<Route path='/' element={<AllPost/>} />
							<Route path='/all-users' element={<AllUsers/>} />
							<Route path='/login' element={<LogIn/>} />
							<Route path='/signup' element={<SignUp/>} />
						</Routes>
					</div>
				</div>
				
			</div>
		</UserContextProvider>
		

	);
}

export default App;
