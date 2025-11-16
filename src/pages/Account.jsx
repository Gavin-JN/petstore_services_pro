import axios from "axios";
import { useEffect, useState } from "react";
import '../components/account.css'

const Account=()=>{

    const [user,setUser]=useState({
        username: '',
        firstName: '',
        lastName: '',
        sex: '',
        age: '',
        faverCategory: '',
        email: '',
        phone: '',
        country: '',
        address: ''
    });
    
    useEffect(() => {
        const token =localStorage.getItem('token');
        axios
            .get(`http://localhost:8060/api/accounts/users`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .then((res) => {
            if (res.data.status == '0') {
                setUser(res.data.data)
            } else {
                console.error('error in getAccount');
            }
            })
            .catch((err) => console.error('Request failed:', err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleUpdateUser=(e)=>{
            e.preventDefault();
            const token =localStorage.getItem('token');
            axios
                .put(` http://localhost:8060/api/accounts`,
                    user,
                    {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }

                })
                .then((res) => {
                if (res.data.status == '0') {
                    console.log("update success")
                    alert("用户信息更新成功！");
                    
                } else {
                    console.error('error in getAccount');
                    alert("更新失败，请稍后再试。");

                }
                })
                .catch((err) => console.error('Request failed:', err));
    }


    return(
        <>
        <div id="BackLink">
    <a href="/main">Return</a>
</div>
<div className="pDiv">
    <p className="pCss">User Information</p>
</div>
<div className="userDiv">
    <form onSubmit={handleUpdateUser}>
        <table className="tableCss">
            <tbody>
            <tr>
                <td>
                    Username:
                </td>
                <td id="uname">
                    <input type="text" className="textCss" name="username" id="username" value={user.username}  onChange={handleInputChange}/>
                    <div id="exited">
                        <p className="errmassage" id="em"></p>
                    </div>
                </td>
                <td>
                    <input type="hidden" name="oname" value={user.username} id="oname" />
                </td>
            </tr>
            <tr>
                <td>
                    FirstName:
                </td>
                <td>
                    <input type="text" className="textCss" name="firstName"  value={user.firstName}  onChange={handleInputChange}/>
                </td>
            </tr>
            <tr>
                <td>
                    LastName:
                </td>
                <td>
                    <input type="text" className="textCss" name="lastName"  value={user.lastName}  onChange={handleInputChange}/>
                </td>
            </tr>
            <tr>
                <td>
                    Sex:
                </td>
                <td>
                    <input type="text" className="textCss" name="sex"  value={user.sex}  onChange={handleInputChange}/>
                </td>
            </tr>
            <tr>
                <td>
                    Age:
                </td>
                <td>
                    <input type="text" className="textCss" name="age"  value={user.age}  onChange={handleInputChange}/>
                </td>
            </tr>
            <tr>
                <td>
                    Favorite Category:
                </td>
                <td>
                    <input type="text" className="textCss" name="faverCategory" value={user.faverCategory}  onChange={handleInputChange}/>
                </td>
            </tr>
            <tr>
                <td>
                    Email:
                </td>
                <td>
                    <input type="text" className="textCss" name="email"  value={user.email} onChange={handleInputChange}/>
                </td>
            </tr>
            <tr>
                <td>
                    Phone:
                </td>
                <td>
                    <input type="text" className="textCss" name="phone"  value={user.phone}  onChange={handleInputChange}/>
                </td>
            </tr>
            <tr>
                <td>
                    Country:
                </td>
                <td>
                    <input type="text" className="textCss" name="country"  value={user.country}  onChange={handleInputChange}/>
                </td>
            </tr>
            <tr>
                <td>
                    Address:
                </td>
                <td>
                    <input type="text" className="textCss" name="address"  value={user.address}  onChange={handleInputChange}/>
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <input type="submit" value="Save" className="butCss" />
                </td>
            </tr>
            </tbody>
        </table>
    </form>
</div>
        </>
    )
}

export default Account