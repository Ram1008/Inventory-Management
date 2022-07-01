import React, { useEffect, useRef, useState } from 'react';
import AddProduct from './AddProduct';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
const Products = (props) => {
    
    console.log(props.currentCategory);
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.getProduct(props.currentCategory);
            // eslint-disable-next-line
        }
        else {
            navigate("/login");
        }
    }, [])
    const ref = useRef(null)
    const [products, setProducts] = useState({ id: "", ename: "", ecategory: "", equantity:0, eprice:0 })

    const updateProduct = (currentProduct) => {
        ref.current.click();
        setProducts({ id: currentProduct._id, ename: currentProduct.name, ecategory: currentProduct.category, equantity: currentProduct.quantity, eprice: currentProduct.price });
    }
    return (
        
        <div>
            <AddProduct
                product={props.product}
                addProduct={props.addProduct} 
                currentCategory={props.currentCategory}/>
            <div className="row my-3">
                <div className="container mx-1">
                    {props.product.length === 0 ? "No Products available" : ""}
                </div>
                {props.product.map((pro) => {
                    return <Product
                        key={pro._id}
                        pro = {pro}
                        updateProduct={updateProduct}
                      delete = {()=>props.deleteProduct(pro._id)}
                    />

                })}
            </div>
        </div>
    )
}
export default Products;