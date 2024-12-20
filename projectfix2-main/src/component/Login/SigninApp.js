import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate để chuyển hướng
import '../css/signin.css';

export default function SignIn() {
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [successMessage, setSuccessMessage] = useState(''); // Trạng thái cho thông báo thành công

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Xử lý logic đăng ký (ví dụ: gọi API để đăng ký)
        // Giả sử đăng ký thành công, bạn có thể hiển thị thông báo thành công
        setSuccessMessage('Registration successful! Redirecting to login...');

        // Sau một khoảng thời gian, chuyển hướng đến trang login
        setTimeout(() => {
            navigate('/login'); // Chuyển hướng đến trang login
        }, 2000); // Sau 2 giây chuyển hướng
    };

    return (
        <div className="signin-container">
            <div className="signin-card">
                <h1 className="signin-title">Create an Account</h1>
                <p className="signin-description">
                    Join us today to enjoy exclusive offers and manage your bookings.
                </p>

                {successMessage && <p className="success-message">{successMessage}</p>} {/* Hiển thị thông báo thành công */}

                <form className="signin-form" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        className="form-input"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="form-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="form-input"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="signin-button">
                        Create Account
                    </button>
                </form>

                <div className="login-prompt">
                    <span>Already have an account? </span>
                    <a href="/login" className="login-link">Login here</a>
                </div>
            </div>
        </div>
    );
}
