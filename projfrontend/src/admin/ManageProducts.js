import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const ManageProducts = () =>{

    const [products, setProducts] = useState([]);
    const {user, token} = isAuthenticated();

    const preload = () =>{
        getProducts().then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setProducts(data);
            }
        });
    }

    useEffect(()=>{
        preload();
    }, [])

    const deleteProductFromDB = productId =>{
        deleteProduct(productId, user._id, token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                preload();
            }
        })
    }

    return(
        <Base title="Welcome Admin" description="Manage products here">
            <h2 className="mb-4">All Products</h2>
            <Link className="btn btn-info" to="/admin/dashboard">
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {products.length} Products</h2>
                    {products && products.map((product, index)=>{
                        return(
                            <div className="row text-center mb-2" key={index}>
                                <div className="col-4">
                                    <h3 className="text-white text-left">{product.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link className="btn btn-success" to={`/admin/product/update/${product._id}`}>
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => {
                                        deleteProductFromDB(product._id)
                                    }} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base> 
    )
}

export default ManageProducts;