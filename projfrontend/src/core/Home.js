import React, { useEffect, useState } from "react";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";
import { getAllProductDetails } from "./helper/homeapicall";


const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllProductDetails().then(data => {
            if(data.error){
                setError(data.error);
            }else{
                setProducts(data);
            }
        })
    }, []);
    
    return(
        <Base title="Home Page">
            {error && <div className="bg-danger text-white">{error}</div>}
            <div className="row">
                    {products && products.map((product, index) =>{
                        return (
                            <div className="col-3">
                                <Card key={index} product = {product} />
                            </div>
                        )
                    })}
            </div>
        </Base>
    )
}

export default Home;