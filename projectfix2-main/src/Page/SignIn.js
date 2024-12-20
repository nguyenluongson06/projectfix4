// App.js
import React from 'react';

import Footer from '../component/common/footer';
import Navbar from '../component/common/navbar';
import SigninApp from '../component/Login/SigninApp'
const Login = () => {
    return (
        <div>
            <Navbar />
            <SigninApp/>

            <Footer />
        </div>
    );
};

export default Login;
