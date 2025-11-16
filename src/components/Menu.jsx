import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TipsContext } from "../util/TipsContext";
import { Link } from "react-router-dom";

const Menu=()=>{
    const { tips } = useContext(TipsContext);
    const [islogin,setIsLogin]=useState(false);
    useEffect(() => {
        let isMounted = true;  // 防止组件卸载后 setState
        axios({
            method: 'GET',
            url: ' /api/accounts/status'
        }).then((res) => {
            if (isMounted) {
                if (res.data.status == '0') {
                    setIsLogin(res.data.data);
                    localStorage.setItem('ifLogin',res.data.data);
                    setTips(localStorage.getItem('tips'));  
                } else {
                    console.log("Error in find is login");
                }
            }
        }).catch(() => {
            if (isMounted) {
                console.log("Something wrong, please check later");
            }
        });

        return () => {
            isMounted = false;  // 组件卸载，阻止setState
        }
    }, []);

    const handleSignOut=()=>{
        const token =localStorage.getItem('token');
            axios
                .delete(` /api/accounts`,
                    {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }

                })
                .then((res) => {
                if (res.data.status == '0') {
                    localStorage.removeItem('token');
                    setIsLogin(false);
                    localStorage.setItem('ifLogin',false)
                    console.log("exit success")
                    alert("退出成功");
                    
                } else {
                    console.error('error in signOut');
                    alert("退出失败，请稍后再试。");

                }
                })
                .catch((err) => console.error('Request failed:', err));
    }
    
    let mune=null;
    if(islogin){
        const token =localStorage.getItem('token');
        console.log("uuuuuuuu"+islogin)
        console.log("token ::"+token)
        mune=<div id="Menu">
                <div id="MenuContent">
                    <a href="/cart" className="cartImage">
                        <img align="middle" name="img_cart" src=" /images/cart.gif" />
                        {tips > 0 ? (
                            <div className="tips">
                                <p id="num">{tips}</p>
                            </div>
                            ) : (
                            <div className="tips" style={{display:'none'}}><p id="num"></p></div>
                            )}
                    </a>
                    <img align="middle" src="   /images/separator.gif" />
                    <a href="#" onClick={handleSignOut}>Sign Out</a>
                    <img  align="middle" src="   /images/separator.gif"/>
                    <a href="/account">My Account</a>
                    <img  align="middle" src="   /images/separator.gif" />
                    <a href="/help">?</a>
                </div>
            </div>
    }else{
        mune=<div id="Menu">
                <div id="MenuContent">
                <a href="/login" className="cartImage">
                    <img align="middle" name="img_cart" src="   /images/cart.gif" />
                </a>
                <img align="middle" src="   /images/separator.gif" />
                <a  href="/login">Sign In</a>
                <img  align="middle" src="   /images/separator.gif"/>
                <a href="/help">?</a>
                </div>
            </div>
    }

    return(mune)
}

export default Menu