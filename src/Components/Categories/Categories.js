import React, {useEffect, useRef, useState }  from 'react'
import AddCategory from './AddCategory/AddCategory'
import Category from './Category/Category'
import { useNavigate } from 'react-router-dom';
const Categories = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
      if(localStorage.getItem('token')){
        props.getCategory();
      // eslint-disable-next-line
      }
      else{
          navigate("/login");
      }
  }, [])
  const ref = useRef(null)
  const [categories, setCategories] = useState({ id: "",ename: "" })

  const updateCategory = (currentCategory) => {
      ref.current.click();
      setCategories({ id: currentCategory._id, ename: currentCategory.name })
  }


  return (
      <>
          <AddCategory 
          category={props.category}
          addCategory  = {props.addCategory}
        />
          <div className="row my-3">
              <div className="container mx-1">
              {props.category.length === 0 ? "No categories available":""}
              </div>
              {props.category.map((cat) => {
                  return <Category 
                  currentCategory = {()=>props.currentCategory(cat.name)}
                  key={cat._id} 
                  updateCategory={updateCategory} cat={cat}
                  delete = {()=>props.deleteCategory(cat._id)}
                  />
                  
              })}
          </div>

      </>
  )
}
export default Categories;