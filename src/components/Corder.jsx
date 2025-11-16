import axios from "axios";
import { useEffect, useState } from "react"
import './corder.css'

const Corder=()=>{

    const [user,setUser]=useState('');
    const [cartItems,setCartItems]=useState([])
    const [total,settotal]=useState('')

    useEffect(() => {
        const token =localStorage.getItem('token');
        axios
            .get(` /api/order`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .then((res) => {
            if (res.data.status == '0') {
                setUser(res.data.data.user)
                setCartItems(res.data.data.cart.cart.itemList||[])
                settotal(res.data.data.cart.total)
            } else {
                console.error('error in getOrder');
            }
            })
            .catch((err) => console.error('Request failed:', err));
    }, []);
    return(

<div className="order-container">
    <table className="order-table">
        <tbody>
        <tr>
            <td className="label">Name:</td>
            <td className="value" >{user.firstName} {user.lastName}</td>
            <td className="label">Phone:</td>
            <td className="value" >{user.phone}</td>
        </tr>
        <tr>
            <td className="label">Address:</td>
            <td colSpan="3" className="value" >{user.address}</td>
        </tr>
        <tr className="header-row">
            <td>Pet Name</td>
            <td>Product ID</td>
            <td>Pet Price</td>
            <td>Quantity</td>
        </tr>


        {cartItems.map((item,index)=>(
            <tr key={index}>
                <td>{item.item.product.name}</td>
                <td >{item.itemId}</td>
                <td >$ {item.item.listPrice}</td>
                <td >{item.quantity}</td>
            </tr>
        ))}

        <tr>
            <td colSpan="4" className="total" >Total: $ {total}</td>
        </tr>
        <tr>
            <td colSpan="4" className="pay-button-cell">
                <input type="submit" value="Pay" className="pay-button"/>
            </td>
        </tr>
        </tbody>
    </table>
</div>

    )
}

export default Corder;