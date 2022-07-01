const express  = require ('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Product = require('../models/Product');
const fetchUser = require('../middleware/fetchUser');

// Route 1: Fetch all products of a Category
router.get('/fetchbyCategory/:cat', fetchUser, async (req,res) => {
    const products = await Product.find({user: req.user.id, category : req.params.cat })
    res.json(products);
})

//Route 2: Add new product
router.post('/addproduct', fetchUser, [

    body('name').isLength({ min: 1 }),
    body('category').isLength({min:1}),

], async (req, res) => {
    try {
        const {name, category, quantity, price} = req.body;
        // Checking for errors using express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            return res.status(400).json({ errors: errors.array() });
        }
        const product = new Product({
            name, category, quantity, price,user: req.user.id
        })
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server Error" });
    }
})

//Route 3: update product name
router.put('/updateproduct/:id', fetchUser, async (req, res) => {
    const {name, category, quantity, price} = req.body;
    //Create a new product object
    try {
        const newProduct = {};
        if(name) {newProduct.name = name}
        if(category) {newProduct.category = category}
        if(quantity) {newProduct.quantity = quantity}
        if(price) {newProduct.price = price}
         
        let product = await Product.findById(req.params.id);
        if (!product) { res.status(404).send("Not Found") };

        if (product.user.toString() !== req.user.id) {
            return res.status(401).send("UnAuthorized access");
        }
        product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
        res.json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server Error" });
    }
})

//Route 4: delete product
router.delete('/deleteproduct/:id', fetchUser, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) { res.status(404).send("Not Found") };

        if (product.user.toString() !== req.user.id) {
            return res.status(401).send("UnAuthorized access");
        }
        product = await Product.findByIdAndDelete(req.params.id);
        res.send("Successfully Deleted");
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server Error" });
    }
})
module.exports = router;