import axios from "axios";
import { useEffect, useState} from "react";

const FaverList=()=>{
    const [myList,setMyList]=useState([]);
    useEffect(() => {
        const token =localStorage.getItem('token');
        axios
            .get(` http://localhost:8060/api/carts/list`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .then((res) => {
            if (res.data.status == '0') {
                setMyList(res.data.data||[])
                console.log('token',localStorage.getItem('token'))
            } else {
                setMyList([])
                console.error('error in getCart');
            }
            })
            .catch((err) => console.error('Request failed:', err));
    }, []);


    return(
        <>
        <div id="MyList">
        <p>Pet Favorites<br/>
            Shop for more of your favorite pet here.
        </p>
        <ul id="coul" style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {myList.length > 0 ? (
                    myList.map((product) => (
                        <li 
                            key={product.productId} 
                            style={{
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#f9f9f9',
                                marginBottom: '10px',
                                padding: '10px'
                            }}
                            id="coli"
                        >
                            <a href={`/product?productId=${product.productId}`}>
                                {product.name} ——
                            </a>
                            <b>{product.productId}</b>
                        </li>
                    ))
                ) : (
                    <li>暂无收藏商品！</li>
                )}
            </ul>
        </div> 
        <div id="Separator">&nbsp;</div>
        </>
    )
}

export default FaverList;