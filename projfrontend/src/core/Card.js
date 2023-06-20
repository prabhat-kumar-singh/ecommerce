import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";

import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";

const Card = ({product, addtoCart=true, removeFromCart=false, setReload = f => f, reload=undefined}) =>{

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cartTitle = product ? product.name : "A photo from pixabay";
    const cartDescription = product ? product.description : "Default Description";

    const addToCart = () => {
        addItemToCart(product, ()=> setRedirect(true));
    }

    const getARedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = addtoCart =>{
        return(
            addtoCart && (
                <button onClick={addToCart} className="btn btn-block btn-outline-success mt-2 mb-2">Add to Cart</button>
            )
        )
    }

    const showRemoveFromCart = removeFromCart =>{
        return(
            removeFromCart && (
                <button onClick={() => {
                    removeItemFromCart(product._id);
                    setReload(!reload);
                }} 
                className="btn btn-block btn-outline-danger mt-2 mb-2">Remove From Cart</button>
            )
        )
    }
    return(
        <div className="card text-white bg-dark border border-info m-2">
            <div className="card-header lead text-center">{cartTitle}</div>
            <div className="card-body">
                {getARedirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead font-weight-normal text-wrap text-center">
                    {cartDescription}
                </p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addtoCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;