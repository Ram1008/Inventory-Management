import React, { useState } from 'react'

const AddCategory = (props) => {
  const [categories, setCategories] = useState({name:"" });
  const handleClick = (e) => {
    e.preventDefault();
    props.addCategory(categories.name);
    setCategories({ name:"" })
  }

  const onChange = (e) => {
    setCategories({ ...categories, [e.target.name]: e.target.value })
  }
  return (
    <div className="container my-3">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" >Name</label>
          <input type="text" className="form-control" id="name" name='name' value={categories.name} onChange={onChange} aria-describedby="emailHelp" />

        </div>
        <button type="submit" disabled={categories.name.length < 1} onClick={handleClick} >Add Category</button>
      </form>
    </div>
  )
}
export default AddCategory;