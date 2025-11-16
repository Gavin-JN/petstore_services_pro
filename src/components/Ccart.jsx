import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { TipsContext } from "../util/TipsContext";

const Ccart=()=>{
    const [itemList,setItemList]=useState([]);
    const [total,setTotal]=useState('');
    const { tips, updateTips } = useContext(TipsContext);

    useEffect(() => {
        const token =localStorage.getItem('token');
        axios
            .get(` /api/carts`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .then((res) => {
            if (res.data.status == '0') {

                setItemList(res.data.data.cart.itemList || []);
                setTotal(res.data.data.total);
                console.log('token',localStorage.getItem('token'))
            } else {
                setItemList([])
                console.error('error in getCart');
            }
            })
            .catch((err) => console.error('Request failed:', err));
    }, []);


    const handleChangeQuantity=(itemId,newQuantity)=>{
        const token = localStorage.getItem('token');
        const oldItem = itemList.find(item => item.item.itemId === itemId);
        const oldQuantity = oldItem ? oldItem.quantity : 0;
        const sub = newQuantity - oldQuantity;
        if (!token) return;
        axios.put(` /api/carts?itemId=${itemId}&&quantity=${newQuantity}`, {
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            if (res.data.status == '0') {
                console.log('更新成功');
                // 同步更新本地 itemList
                setItemList(prevList =>
                    prevList.map(item =>
                        item.item.itemId === itemId
                            ? { ...item, quantity: newQuantity ,
                                total: item.item.listPrice * newQuantity 
                            }
                            : item
                    )
                );
                updateTips(tips + sub); 
                setTotal(res.data.data|| 0);  // 后台如果返回新的 total
            } else {
                console.error('更新失败', res.data);
            }
        })
        .catch(err => console.error('更新请求失败:', err));
    }



    const handleClearCart = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        console.error("Token 不存在，无法清空购物车！");
        return;
    }
    axios.post(` /api/carts/blank`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        if (res.data.status == '0') {
            console.log('购物车已清空');
            setItemList([]); // 同步清空前端购物车
            updateTips(0); 
            setTotal(0);
        } else {
            console.error('清空购物车失败:', res.data);
        }
    })
    .catch((err) => {
        console.error('请求清空购物车时失败:', err);
    });
    };



    const handleRemoveItem=(itemId,quantity)=>{
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token 不存在，无法删除商品！");
            return;
        }
        axios.delete(` /api/carts?itemId=${itemId}`, {
            // data: { itemId: itemId },  // 发送 itemId
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if (res.data.status == '0') {
                console.log(`商品 ${itemId} 已从购物车删除`);
                const account=quantity||0;
                updateTips(tips - account); 
                setTotal(res.data.data)
                setItemList(prev => prev.filter(item => item.item.itemId !== itemId));  // 清除购物车里的这个商品
                
            } else {
                console.error('删除商品失败:', res.data);
            }
        })
        .catch((err) => {
            console.error('请求删除商品时失败:', err);
        });
    }





    return(
<>
    <div id="BackLink"><a href="/main">
        Return to Main Menu</a></div>
<div>
    <div id="Cart">
        <h2>Shopping Cart</h2>
        <form onSubmit={handleClearCart}>
            <table>
                <thead>
                    <tr>
                        <th><b>Item ID</b></th>
                        <th><b>Product ID</b></th>
                        <th><b>Description</b></th>
                        <th><b>In Stock?</b></th>
                        <th><b>Quantity</b></th>
                        <th><b>List Price</b></th>
                        <th><b>Total Cost</b></th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList.length ===0?(
                    <tr >
                        <td colSpan="8"><b>Your cart is empty.</b></td>
                    </tr>
                    ):(
                        itemList.map((cartItem)=>(
                            <tr key={cartItem.itemId}>
                                <td>
                                    <a   href={"/item?itemId="+cartItem.itemId} >{cartItem.itemId}</a>
                                </td>
                                <td>{cartItem.item.product.productId}</td>
                                <td >{cartItem.item.attribute1}  {cartItem.item.product.name}</td>
                                <td >{cartItem.inStock}</td>
                                <td><input type="number" name={cartItem.item.itemId} value={cartItem.quantity} id={cartItem.quantity} className="xtotal" onChange={(e) => handleChangeQuantity(cartItem.item.itemId, e.target.value)}/></td>
                                <td className="listPrice">${Number(cartItem.item.listPrice).toFixed(2)}</td>
                                <td className="itemtotal" > ${Number(cartItem.total).toFixed(2)}</td>
                                <td>
                                    {cartItem.delived === 1 ? (
                                        <span
                                        className="Button"
                                        style={{
                                            pointerEvents: "none",
                                            opacity: 0.5,
                                            cursor: "not-allowed",
                                        }}
                                        >
                                        已发货
                                        </span>
                                    ) : (
                                        <button
                                        type="button"
                                        className="Button"
                                        onClick={() => handleRemoveItem(cartItem.item.itemId,cartItem.quantity)}
                                        >
                                        Remove
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    <tr>
                        <td colSpan="7" className="alltotal" >
                            <p id="alltotal" style={{display: "inLine"}}>
                                Sub Total: ${total}
                            </p>
                            <input type="submit" value="Clear Cart"/>
                        </td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </form>
        {itemList.length > 0 && (
            <a href="/order" className="Button">Proceed to Checkout</a>
        )}
    </div>
</div>
</>
    )
}

export default Ccart; 