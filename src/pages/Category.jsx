import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Top from '../components/Top';
import Bottom from '../components/bottom';
import '../components/petstore.css'

const Category=()=>{

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('categoryId');
    const [list,setList]=useState([])
    const [categoryName,setCategoryName]=useState('')

    useEffect(() => {
        if (categoryId) {
        axios
            .get(` http://localhost:8030/api/categories?categoryId=${categoryId}`)
            .then((res) => {
            if (res.data.status == '0') {
                setList(res.data.data.productList);
                setCategoryName(res.data.data.categoryName);
                console.log('ttttttttttttttttooooookkkkkkennnnnn',localStorage.getItem('token'))
            } else {
                console.error('error in getProduct');
            }
            })
            .catch((err) => console.error('Request failed:', err));
        }
      }, [categoryId]); // ⚠️ 依赖项，categoryId 变化才会触发请求
    

    return(
        <>
        <Top></Top>
    <div id="BackLink">
        <a href="/main">Return to Main Menu</a>
    </div>

    <div id="Catalog">
        <h1>{categoryName}</h1>
        <ul id="CatalogList">
        {list.map((item, index) => (
                        <li key={index}>
                            <div className="product-description"  dangerouslySetInnerHTML={{ __html: item.description }}></div>
                            <div className="product-name"><b>{item.name}</b></div>
                            <a href={"/product?productId="+item.productId} className="product-id">{item.productId}</a>
                        </li> 
                    ))}
        </ul>
    </div>
        <Bottom></Bottom>
        </>
    )
}

export default Category