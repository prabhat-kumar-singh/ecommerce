import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//components
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";

import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard"
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path = "/" exact component = {Home} />
                <Route path = "/signup" exact component = {Signup}/>
                <Route path = "/signin" exact component = {Signin}/>
                <PrivateRoutes path="/user/dashboard" exact component = {UserDashboard} />
                <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoutes path="/admin/create/category" exact component={AddCategory} />
                <AdminRoutes path="/admin/categories" exact component={ManageCategories} />
                <AdminRoutes path="/admin/create/product" exact component={AddProduct} />
                <AdminRoutes path="/admin/products" exact component={ManageProducts} />
                <AdminRoutes path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoutes path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                <PrivateRoutes path="/cart" exact component={Cart} />
            </Switch>
        </Router>
    )
}

export default Routes;