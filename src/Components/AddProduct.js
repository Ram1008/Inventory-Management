import React, { useState } from 'react'

const AddProduct = (props) => {
  // const [categories, setProducts] = useState({name:"" });
  const [products, setProducts] = useState({name:"" , category: props.currentCategory, quantity: "", price: ""});
  const handleClick = (e) => {
    e.preventDefault();
    // name,category, quantity, price
    props.addProduct(products.name, products.category,products.quantity,products.price);
    setProducts({name:"" , category: "", quantity: "", price: ""})
  }

  const onChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value })
  }
  return (
    <div className="container my-3">
      <h3>Add Products</h3>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" >Name</label>
          <input type="text" className="form-control" id="name" name='name' value={products.name} onChange={onChange} aria-describedby="emailHelp" />

        </div>
        
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label" >Quantity</label>
          <input type="number" className="form-control" id="quantity" name='quantity' value={products.quantity} onChange={onChange} aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" >Price</label>
          <input type="number" className="form-control" id="price" name='price' value={products.price} onChange={onChange} aria-describedby="emailHelp" />

        </div>
        <button type="submit" disabled={products.name.length < 1 || products.category.length <1}  >Add Product</button>
      </form>
    </div>
  )
}
export default AddProduct;