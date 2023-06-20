import React from "react";
import { API } from "../../backend";

const ImageHelper = ({product}) =>{
    const imageUrl = product ? `${API}/product/photo/${product._id}` : "https://cdn.pixabay.com/photo/2015/07/14/16/33/white-845071_1280.jpg" ;
    return(
        <div className="rounded p-2 text-right">
            <img src={imageUrl} alt="photo" style={{maxHeight:"100%", maxWidth:"100%"}} className="mb-3 rounder" />
            <p className="btn btn-warning rounded btn-sm px-4">$ {product.price}</p>
        </div>
    )
}

export default ImageHelper;