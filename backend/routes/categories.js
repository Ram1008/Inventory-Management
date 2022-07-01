const express  = require ('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Category = require('../models/Category');
const fetchUser = require('../middleware/fetchUser');

// Route 1: Fetch all Categories
router.get('/fetchallcategories', fetchUser, async (req,res) => {
    const category = await Category.find({user:req.user.id})
    res.json(category);
})

//Route 2: Add new category
router.post('/addcategory', fetchUser, [

    body('name').isLength({ min: 1 }),

], async (req, res) => {
    try {
        const {name} = req.body;
        // Checking for errors using express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            return res.status(400).json({ errors: errors.array() });
        }
        const category = new Category({
            name, user: req.user.id
        })
        const savedCategory = await category.save();
        res.json(savedCategory);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server Error" });
    }
})

//Route 3: update Category name
router.put('/updatecategory/:id', fetchUser, async (req, res) => {
    const {name} = req.body;
    //Create a new Category object
    try {
        const newCategory = {};
        if(name) {newCategory.name = name} 
        let catagory = await Category.findById(req.params.id);
        if (!catagory) { res.status(404).send("Not Found") };

        if (catagory.user.toString() !== req.user.id) {
            return res.status(401).send("UnAuthorized access");
        }
        catagory = await Category.findByIdAndUpdate(req.params.id, { $set: newCategory }, { new: true })
        res.json(catagory);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server Error" });
    }
})

//Route 4: delete Category
router.delete('/deletecategory/:id', fetchUser, async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) { res.status(404).send("Not Found") };

        if (category.user.toString() !== req.user.id) {
            return res.status(401).send("UnAuthorized access");
        }
        category = await Category.findByIdAndDelete(req.params.id);
        res.send("Successfully Deleted");
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server Error" });
    }
})
module.exports = router;