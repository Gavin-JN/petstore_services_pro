import { Routes,Route } from "react-router-dom"
import Home from "../pages/Home"
import Introduce from "../pages/Introduct"
import Category from "../pages/Category"
import Product from "../pages/Product"
import Login from "../pages/Login"
import Item from "../pages/item"
import Callback from "../pages/Callback"
import Cart from "../pages/Cart"
import Account from "../pages/Account"
import Help from "../pages/help"
import Order from "../pages/Order"
import Register from "../pages/Register"

const AppRoutes = ()=>{
    return(
        <Routes>
            <Route path="/main" element={<Home/>}/>
            <Route path="/" element={<Introduce />}/>
            <Route path="/category" element={<Category />}/>
            <Route path="/product" element={< Product/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/item" element={<Item/>}/>
            <Route path="/oauth/callback" element={<Callback/>} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/help" element={<Help/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    )
}

export default AppRoutes;