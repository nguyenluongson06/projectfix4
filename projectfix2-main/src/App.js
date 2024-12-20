import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Page/HomePage';
import EventDetail from './Page/EventDetails';
import Cart from './Page/Cart';
import Checkout from './Page/Checkout';
import './app.css';
import Login from './Page/Login';
import Music from './Page/Music';
import Sport from './Page/Sport';
import Stageandart from "./Page/Stageandart";
import Talkshow from './Page/Talkshow';
import Signin from './Page/SignIn';

const App = () => {
	return (
		<Router>
			<Routes>
				{/* Định tuyến các trang */}
				<Route path='/' element={<HomePage />} />
				<Route path='/events/:eventUuid' element={<EventDetail />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/checkout' element={<Checkout />} />
				<Route path='/login' element={<Login />} />
				<Route path='/music' element={<Music />} />
				<Route path='/sport' element={<Sport />} />
				<Route path='/stageandart' element={<Stageandart />} />
				<Route path='/talkshow' element={<Talkshow/>}/>
				<Route path='/signin' element={<Signin/>} />
			</Routes>
		</Router>
	);
};

export default App;
