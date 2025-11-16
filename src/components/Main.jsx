import axios from "axios";
import { useState } from "react";


const Main=()=>{
    const [showList, setShowList] = useState(false); 
    const [nameList,setNameList]=useState([])
    const showFlow=(category)=>{
        axios({
            method:'GET',
            url:' /api/categories/flow?categoryId='+category,
        }).then((res)=>{
            if(res.data.status=='0')
            {
                setNameList(res.data.data);
                setShowList(true)
            }
            else{
                setShowList(false)
                console.log('error in flowwindo')
            }
        })
    };
    
    const handleMouseLeave = () => {
        setShowList(false); 
        };


    return(
        <>
        <div id="Welcome">
            <div id="WelcomeContent" >
                <p th:if="${session.username!=null}" th:text="'Welcome to pet store '+${session.username}"> </p>
            </div>
        </div>

    <div id="Main">
        <div id="Sidebar">
            <div id="SidebarContent">
            <a href="/category?categoryId=FISH" ><img src="/images/fish_icon.gif" /></a><br />
            Saltwater, Freshwater <br />
            <a href="/category?categoryId=DOGS" ><img src="/images/dogs_icon.gif" /></a><br />
            Various Breeds <br />
            <a href="/category?categoryId=CATS" ><img src="/images/cats_icon.gif" /></a><br />
            Various Breeds, Exotic Varieties <br />
            <a href="/category?categoryId=REPTILES" ><img src="/images/reptiles_icon.gif" /></a><br />
            Lizards, Turtles, Snakes <br />
            <a href="/category?categoryId=BIRDS" ><img src="/images/birds_icon.gif" /></a><br />
            Exotic Varieties
            </div>
        </div>

        <div id="MainImage">
            <div id="MainImageContent">
                <map name="estoremap">
                <area alt="Birds" coords="72,2,280,250"
                    href="/category?categoryId=BIRDS"     shape="RECT" onMouseOver={()=>showFlow('BIRDS')} onMouseLeave={handleMouseLeave}/>
                <area alt="Fish" coords="2,180,72,250"
                    href="/category?categoryId=FISH"     shape="RECT" onMouseOver={()=>showFlow('FISH')} onMouseLeave={handleMouseLeave}/>
                <area alt="Dogs" coords="60,250,130,320"
                    href="/category?categoryId=DOGS"     shape="RECT" onMouseOver={()=>showFlow('DOGS')} onMouseLeave={handleMouseLeave}/>
                <area alt="Reptiles" coords="140,270,210,340"
                    href="/category?categoryId=REPTILES"     shape="RECT" onMouseOver={()=>showFlow('REPTILES')} onMouseLeave={handleMouseLeave}/>
                <area alt="Cats" coords="225,240,295,310"
                    href="/category?categoryId=CATS"     shape="RECT" onMouseOver={()=>showFlow('CATS')} onMouseLeave={handleMouseLeave}/>
                <area alt="Birds" coords="280,180,350,250"
                    href="/category?categoryId=BIRDS"     shape="RECT" onMouseOver={()=>showFlow('BIRDS')} onMouseLeave={handleMouseLeave}/>
                </map>
                <img height="355" src="  /images/splash.gif" align="middle"
                    useMap="#estoremap" width="350" />
            </div>

        </div>
        <div id="Separator">&nbsp;</div>
        {showList&&(
        <div id="flotwindow">
            <p></p>
            <ul>
            {nameList.map((item, index) => (
                        <li key={index}><a>{item}</a></li> 
                    ))}
            </ul>
        </div>
        )}
</div>
        </>
    )
}

export default Main;