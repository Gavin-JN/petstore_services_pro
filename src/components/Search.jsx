import axios from "axios"
import { useState, useRef } from "react";

const Search=()=>{
    const [list,setList]=useState([]);
    const [showList, setShowList] = useState(false); // 控制 ul 显示隐藏
    const ulRef = useRef(null);

    const searchList=()=>{
        const keyword=document.getElementById('search_text').value;
            axios({
                method:'GET',
                url:' http://localhost:8030/api/categories/search?keyword='+keyword,
            }).then((res)=>{
                if(res.data.status=='0'){
                    setList(res.data.data)
                    setShowList(true); 
                }
                else{
                    console.log('error in search')
                    setShowList(false); 
                }
            })
    };

    const handleMouseLeave = () => {
        setShowList(false); 
        };

    return(
        <div id="Search">
        <div id="SearchContent">
            <form action="search" method="post">
                <input type="text" name="keyword" size="14" id="search_text" onChange={searchList}/>
                <input type="submit" value="Search"/>
            </form>

            {showList&&(
                <ul id="search-ul" ref={ulRef} onMouseLeave={handleMouseLeave}>
                    {list.map((item, index) => (
                        <li key={index}><a href={"/product?productId="+item.productId}>{item.name}</a></li> 
                    ))}
                </ul>
            )}

        </div>
    </div>
    )
}

export default Search