// App.js
import React from 'react';

import Footer from '../component/common/footer';
import Navbar from '../component/common/navbar';
import LoginApp from "../component/Login/LoginApp";
const Login = () => {
    return (
        <div>
            <Navbar />
            <LoginApp/>

            <Footer />
        </div>
    );
};

export default Login;
