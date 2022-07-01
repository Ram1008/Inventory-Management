import './App.css';
import React , { Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Signup} from './Components/Signup/Signup';
import {Login} from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import  ChangePassword  from './Components/ChangePassword';
import ResetPassword from './Components/ResetPassword';
import Categories from './Components/Categories/Categories';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import Products from './Components/Products'
import Alert from './Components/Alert/Alert';

class App extends Component {

  host = "http://localhost:5000";

  state = {
    alert : null,
    category: [],
    product:[], 
    currentCategory: null
  }
  //Get all Products of a Category
  getProduct = async (cat)=>{
    const response = await fetch(`${this.host}/api/products/fetchbyCategory/${cat}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    this.setState({product : json});
  }

  // Add a product
  addProduct = async (name,category, quantity, price) => {

    const response = await fetch(`${this.host}/api/products/addproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({name,category, quantity, price})
    });
    const json = await response.json();
    const newProduct = [...this.state.product, json];
    this.setState({product:newProduct});
  }
  // Delete a Product
  deleteProduct = async (id) => {
    
    const response = await fetch(`${this.host}/api/products/deleteproduct/${id}`, {
      method: 'DELETE',
      headers: {
        
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    const txt = await response.text();
    
    const newProduct = this.state.category.filter((pro) => {
      return pro._id !== id
    })
    this.setState({product:newProduct});
  }
    // Get all category
  getCategory = async () => {

    const response = await fetch(`${this.host}/api/categories/fetchallcategories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    this.setState({category : json});
  }

  // Add a Category
  addCategory = async (name) => {

    const response = await fetch(`${this.host}/api/categories/addcategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({name})
    });
    const json = await response.json();
    const newCategory = [...this.state.category, json];
    this.setState({category:newCategory});
  }

  // Delete a Category
  deleteCategory = async (id) => {
    
    const response = await fetch(`${this.host}/api/categories/deletecategory/${id}`, {
      method: 'DELETE',
      headers: {
        
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    // props.showAlert(response.msg,"success");
    const txt = await response.text();
    
    const newCategories = this.state.category.filter((cat) => {
      return cat._id !== id
    })
    this.setState({category:newCategories});
  }
  // Edit a Category
  editCategory = async (id, name) => {
    
    const response = await fetch(`${this.host}/api/categories/updatecategory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({name})
    });
    
    let newCategories = JSON.parse(JSON.stringify(this.state.category));
    for (let index = 0; index < newCategories.length; index++) {
      const element = newCategories[index];
      if (element._id === id) {
        newCategories[index].name = name;
        break;
      }
      this.setState({category:newCategories});

    }
    
    
  }
  currentCategory = (name)=>{
    this.setState({currentCategory : name})
  }
  showAlert = (message, type)=>{
    this.setState({
      alert:{
        msg: message,
      type: type
      }
    })
    setTimeout(()=>{
      this.setState({
        alert:null
      })}, 1500);
  }
  render() {
    return (
      
      <Router>
      <div className="App">
        <Navbar />
        {/* <Alert alert = {alert} /> */}
        <Routes>
          <Route exact path="/login" element={<Login showAlert= {this.showAlert} />} />
          <Route exact path="/signup" element={<Signup  showAlert= {this.showAlert}/>} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/changepassword" element={<ChangePassword />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route  path="/products" element={<Products
          product = {this.state.product}
          addProduct = {this.addProduct}
          getProduct = {this.getProduct}
          deleteProduct = {this.deleteProduct}
          currentCategory={this.state.currentCategory}/>} />
          <Route exact path="/" element={<Categories 
          showAlert= {this.showAlert} 
          category = {this.state.category}
          currentCategory = {this.currentCategory}
          getCategory = {this.getCategory}
          addCategory = {this.addCategory}
          editCategory = {this.editCategory}
          deleteCategory = {this.deleteCategory}
          />} />
        </Routes>
        
      </div>
      </Router>
      
    );
  }
}

export default App;
