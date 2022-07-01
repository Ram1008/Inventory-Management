import React from 'react'
import {Link} from 'react-router-dom';
const Category = (props) => {
  return (
    <div className="card" style={{ width: "18 rem" }}>
      <div className="card-body">
        <Link  to = {{
          pathname:"/products", 
          state: {stateParam:props.cat.name}
        }}>
          <h5 onClick = {props.currentCategory} className="card-title">{props.cat.name}</h5>
          </Link>
        {/* <h6 className="card-subtitle mb-2 text-muted">No of products</h6> */}
        <button className="btn btn-primary mx-2">edit</button>
        <button className="btn btn-primary mx-2" onClick = {props.delete}>delete</button>
      </div>
    </div>
  )
}
export default Category;