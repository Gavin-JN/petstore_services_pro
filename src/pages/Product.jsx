import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/petstore.css'
import Top from "../components/Top";
import Bottom from "../components/bottom";
import { TipsContext } from "../util/TipsContext";

const Product=()=>{

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('productId');
    const [list,setList]=useState([])
    const [productName,setProductName]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [ifLogin,setIfLogin]=useState('')
    const navigator=useNavigate();
    const { tips, updateTips } = useContext(TipsContext);

    useEffect(() => {
        if (productId) {
        axios
            .get(` http://localhost:8060/api/categories/product?productId=${productId}`)
            .then((res) => {
            if (res.data.status == '0') {
                setList(res.data.data.itemList);
                setProductName(res.data.data.productName);
                setCategoryId(res.data.data.categoryId);
                setIfLogin(localStorage.getItem('ifLogin'))
            } else {
                console.error('error in items');
            }
            })
            .catch((err) => console.error('Request failed:', err));
        }
    }, [productId]);

    const handleAddItem=(itemId)=>{

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token 不存在，无法添加商品！');
            navigator('/login')
            return;
        }
    
        axios.post(` http://localhost:8060/api/cart?itemId=${itemId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if (res.data.status == '0') {
                console.log(`商品 ${itemId} 已加入购物车`);
                updateTips(tips + 1);

            } else {
                console.error('添加商品失败:', res.data);
            }
        })
        .catch((err) => console.error('请求失败:', err));

    }

    return(
        <>
        <Top></Top>
        <div id="BackLink">
    <a href={'/category?categoryId=' + categoryId}>
    Return to {categoryId}
    </a>
</div>

<div id="Catalog">

    <h2 >{productName}</h2>

    <table>
        <thead>
            <tr>
            <th>Item ID</th>
            <th>Product ID</th>
            <th>Description</th>
            <th>List Price</th>
            <th>&nbsp;</th>
            </tr>
        </thead>

        <tbody>

            {list.map((item,index)=>(
                <tr key={index}>
                    <td>
                        <a  href={"/item?itemId="+item.itemId}> {item.itemId}</a>
                    </td>
                    <td >{item.productId}</td>
                    <td >
                        {item.attribute1} {productName}
                    </td>

                    <td>
                        ${item.listPrice}
                    </td>

                    {/* 库存充足 + 上架 */}
                    {item.quantity > 0 && item.status === 'P' && (
                    <td>

                        {ifLogin=='true'?(<a className="Button" id={item.itemId} onClick={()=>handleAddItem(item.itemId)}>
                        Add to Cart
                        </a>):(
                            <a className="Button" id={item.itemId} href="/login">
                            Add to Cart
                            </a>
                        )}
                    </td>
                    )}

                    {/* 库存不足 + 上架 */}
                    {item.quantity <= 0 && item.status === 'P' && (
                    <td>
                        <a
                        className="Button"
                        style={{ pointerEvents: 'none', opacity: 0.5, cursor: 'not-allowed' }}
                        >
                        库存不足
                        </a>
                    </td>
                    )}

                    {/* 未上架，无论库存 */}
                    {item.status === 'NP' && (
                    <td>
                        <a
                        className="Button"
                        style={{ pointerEvents: 'none', opacity: 0.5, cursor: 'not-allowed' }}
                        >
                        not on sale
                        </a>
                    </td>
                    )}
                </tr>
            ))}
        </tbody>
    </table>
</div>
<Bottom></Bottom>
        </>
    );
}

export default Product