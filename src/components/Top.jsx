import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import './petstore.css'
import Menu from "./Menu";
import Search from "./Search";

const Top=()=>{
  

    const getProduct=(category)=>{

    }

    return(
<div id="Header">
    <div id="Logo">
        <div id="LogoContent">
        <a herf="mainForm"><img src=" /images/logo-topbar.gif"/></a>
        </div>
    </div>

    <Menu></Menu>

    <Search></Search>
    
    <div id="QuickLinks">
        <a href="/category?categoryId=FISH" ><img src=" /images/sm_fish.gif" /></a>
        <img src=" /images/separator.gif" />
        <a href="/category?categoryId=DOGS" ><img src=" /images/sm_dogs.gif" /></a>
        <img src=" /images/separator.gif" />
        <a href="/category?categoryId=REPTILES" ><img src=" /images/sm_reptiles.gif" /></a>
        <img src=" /images/separator.gif" />
        <a href="/category?categoryId=CATS" ><img src=" /images/sm_cats.gif" /></a>
        <img src=" /images/separator.gif" />
        <a href="/category?categoryId=BIRDS" ><img src=" /images/sm_birds.gif" /></a>
    </div>
</div>
    );
};

export default Top;