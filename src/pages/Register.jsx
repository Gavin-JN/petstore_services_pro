import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        address: '',
        sex: '',  // 性别字段
        faverCategory: ''  // 喜欢动物的字段
    });

    const [usernameExists, setUsernameExists] = useState(false);
    const naviagte=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 检查用户名是否存在
    useEffect(() => {
        const checkUsername = async () => {
            try {
                const res = await axios.get(` http://localhost:8010/api/accounts/sessions?username=${formData.username}`);
                if (res.data.exists) {
                    setUsernameExists(true);
                } else {
                    setUsernameExists(false);
                }
            } catch (error) {
                console.error('请求失败：', error);
            }
        };

        if (formData.username) {
            checkUsername();
        }
    }, [formData.username]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (usernameExists) {
            alert('用户名已存在，请选择其他用户名');
            return;
        }

        try {
            const res = await axios.post(' http://localhost:8010/api/accounts', formData);
            if (res.data.status === 0) {
                alert('注册成功！');
                naviagte('/login')
            } else {
                alert('注册失败，请稍后再试');
            }
        } catch (error) {
            console.error('请求失败：', error);
            alert('网络或服务器错误');
        }
    };

    return (
        <div className="register-container">
            <h2>注册</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    name="username"
                    placeholder="用户名"
                    value={formData.username}
                    onChange={handleChange}
                    className="register-input"
                />
                {usernameExists && <p className="error-text">用户名已存在</p>}
                <input
                    type="password"
                    name="password"
                    placeholder="密码"
                    value={formData.password}
                    onChange={handleChange}
                    className="register-input"
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="名"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="register-input"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="姓"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="register-input"
                />
                 {/* 性别字段 */}
                <label htmlFor="sex">性别：</label>
                <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="register-input"
                >
                    <option value="">请选择性别</option>
                    <option value="MALE">男</option>
                    <option value="FEMALE">女</option>
                    <option value="OTHER">其他</option>
                </select>
                <input
                    type="email"
                    name="email"
                    placeholder="邮箱"
                    value={formData.email}
                    onChange={handleChange}
                    className="register-input"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="电话号码"
                    value={formData.phone}
                    onChange={handleChange}
                    className="register-input"
                />
                <input
                    type="text"
                    name="country"
                    placeholder="国家"
                    value={formData.country}
                    onChange={handleChange}
                    className="register-input"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="地址"
                    value={formData.address}
                    onChange={handleChange}
                    className="register-input"
                />


                {/* 动物喜好下拉框 */}
                <label htmlFor="faverCategory">喜欢的动物：</label>
                <select
                    name="faverCategory"
                    value={formData.faverCategory}
                    onChange={handleChange}
                    className="register-input"
                >
                    <option value="">请选择一种动物</option>
                    <option value="BIRDS">鸟</option>
                    <option value="CATS">猫</option>
                    <option value="DOGS">狗</option>
                    <option value="FISH">鱼</option>
                    <option value="REPTILES">爬行动物</option>
                </select>

                <button type="submit" className="register-button" disabled={usernameExists}>
                    注册
                </button>
            </form>
        </div>
    );
};

export default Register;