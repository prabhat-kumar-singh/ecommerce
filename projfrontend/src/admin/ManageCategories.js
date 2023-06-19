import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories } from "./helper/adminapicall";



const ManageCategories = () =>{
    const [categories, setCategories] = useState([]);

    const preload = () =>{
        getCategories().then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                setCategories(data);
            }
        })
    }
    useEffect(()=>{
        preload();    
    }, [])

    const deleteCategoryFromDB = categoryId =>{

    }

    return(
        <Base title="Welcome Admin" description="Manage categories here">
            <h2 className="mb-4">All Products</h2>
            <Link className="btn btn-info" to="/admin/dashboard">
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {categories.length} Category</h2>
                    {categories && categories.map((category, index)=>{
                        return(
                            <div className="row text-center mb-2" key={index}>
                                <div className="col-6">
                                    <h3 className="text-white text-left">{category.name}</h3>
                                </div>
                                <div className="col-6">
                                    <Link className="btn btn-success" to={`/admin/category/update/${category._id}`}>
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base> 
    )
}

export default ManageCategories;