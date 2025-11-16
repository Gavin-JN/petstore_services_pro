import Bottom from "../components/bottom";
import Top from "../components/Top";
import { useContext, useEffect,useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { TipsContext } from "../util/TipsContext";

const Item=()=>{

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const itemId = queryParams.get('itemId');
    const [item,setItem]=useState('')
    const navigete=useNavigate();
    const { tips, updateTips } = useContext(TipsContext);
    const [ifLogin, setIfLogin] = useState(false);


    useEffect(() => {
        if (itemId) {
        axios
            .get(` http://localhost:8060/api/categories/product/item?itemId=${itemId}`)
            .then((res) => {
            if (res.data.status == '0') {
                setItem(res.data.data);
                setIfLogin(localStorage.getItem('ifLogin'))
                console.log('llllloooggiiinn',ifLogin)
                console.log(res)
            } else {
                console.error('error in itrm');
            }
            })
            .catch((err) => console.error('Request failed:', err));
        }
    }, [itemId]);

    const handleAddItem=(itemId)=>{

        const token = localStorage.getItem('token');
        if (!token) {
            // console.error('Token 不存在，无法添加商品！');
            navigete('/login')
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
    <a  href={"/product?productId="+item.productId}>
    Return to {item.productId}
    </a>
</div>
<div id="Catalog">
    <table>
        <tbody>
            <tr>
                <td> <div  dangerouslySetInnerHTML={{ __html: item.descriptionImage }}>
                    </div> </td>
            </tr>
            <tr>
                <td><b > {item.itemId}</b></td>
            </tr>
            <tr>
                <td>
                    <b>
                        <font size="4" >
                            {item.descriptionText} {item.productName}
                        </font>
                    </b>
                </td>
            </tr>
            <tr>
                <td > {item.productName}</td>
            </tr>


            <tr>
                <td>
                    {item.quantity <= 0 ? (
                    <p>Back ordered</p>
                    ) : (
                    <p>{item.quantity} in stock</p>
                    )}
                </td>
                </tr>

            <tr>
                <td>${Number(item.listPrice).toFixed(2)}</td>
            </tr>

            <tr>
            {/* 有库存且上架 */}
            {item.quantity > 0 && item.status === 'P' && (
                <td>

                {ifLogin?(<a className="Button" id={item.itemId} onClick={()=>handleAddItem(item.itemId)}>Add to Cart</a>):
                (<a className="Button" id={item.itemId} href="/login">Add to Cart</a>)}
                
                </td>
            )}

            {/* 无库存但上架 */}
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

            {/* 未上架（无论库存） */}
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

        </tbody>
    </table>
</div>
    <Bottom></Bottom>
        </>
    );
}

export default Item