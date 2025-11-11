import React, { useState } from 'react';
import axios from 'axios';
import '../components/login.css';
import { useNavigate } from 'react-router-dom';

    
function Login() {
const [formData, setFormData] = useState({ username: '', password: '' });
const [message, setMessage] = useState('');
const [token, setToken] = useState(null);
const navigator=useNavigate();

const handleChange = (e) => {
    setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
    }));
};

const handleLogin = () => {
    window.location.href = " http://localhost:8010/api/accounts/oauth/render";
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await axios.post(' http://localhost:8010/api/accounts  ', formData);
    const res = response.data;

    if (res.status === 0) {

        setMessage('✅ 登录成功！欢迎 ' + res.data.username);
        setToken(res.token);
        localStorage.setItem("token",res.token);
        localStorage.setItem("ifLogin",true);
        localStorage.setItem("tips",res.data.cartItemNum)
        navigator('/main')
    } else {
        setMessage('❌ ' + res.message);
    }

    } catch (error) {
    console.error('请求失败：', error);
    setMessage('❌ 网络或服务器错误');
    }
};

return (
    <div className="login-container">
    <h2>登录</h2>
    <form onSubmit={handleSubmit} className="login-form">
        <input
        type="text"
        name="username"
        placeholder="用户名"
        value={formData.username}
        onChange={handleChange}
        className="login-input"
        />
        <input
        type="password"
        name="password"
        placeholder="密码"
        value={formData.password}
        onChange={handleChange}
        className="login-input"
        />
        <button type="submit" className="login-button">登录</button>
        <a href='/register'>register</a>
    </form>
    <button type="submit" className="login-button" onClick={handleLogin}>login with github</button>
    {message && <div className="login-message">{message}</div>}
    </div>
);
}

export default Login;