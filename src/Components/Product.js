import React from 'react';
const Product = (props) => {
  console.log(props);
  return (
    <div className="card" style={{ width: "18 rem" }}>
      <div className="card-body">
        
        <h5 className="card-title">{props.pro.name}</h5> 
        <h5 className="card-title">{props.pro.category}</h5> 
        <h5 className="card-title">{props.pro.quantity}</h5> 
        <h5 className="card-title">{props.pro.price}</h5> 
        <h6 className="card-subtitle mb-2 text-muted">No of products</h6>
        <button className="btn btn-primary mx-2"onClick = {props.updateProduct}>edit</button>
        <button className="btn btn-primary mx-2" onClick = {props.delete}>delete</button>
      </div>
    </div>
  )
}
export default Product;