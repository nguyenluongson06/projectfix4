import React from 'react';
import '../css/login.css';

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Account Login</h1>
                <p className="login-description">
                    If you are already a member, you can login with your email address and password.
                </p>

                <form className="login-form">
                    <label htmlFor="enter-email" className="form-label">Email Address</label>
                    <input
                        id="enter-email-login-id"
                        type="email"
                        placeholder="Enter your email"
                        className="form-input"
                        required
                    />

                    <label htmlFor="enter-password" className="form-label">Password</label>
                    <input
                        id="enter-password-login-id"
                        type="password"
                        placeholder="Enter your password"
                        className="form-input"
                        required
                    />

                    <div className="remember-me">
                        <input type="checkbox" id="remember_id" />
                        <label htmlFor="remember_id">Remember me</label>
                    </div>

                    <button id="login_button_id" className="login-button">
                        Login Account
                    </button>
                </form>

                <div className="signup-prompt">
                    <span>Don't have an account? </span>
                    <a href="/signin" className="signup-link">Sign up here</a>
                </div>
            </div>
        </div>
    );
}
