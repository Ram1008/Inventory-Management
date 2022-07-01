const mongoose  = require('mongoose');
const Schema  = mongoose.Schema;

const CategorySchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        
    },
    
    name:{
        type: String,
        required: true,
        unique: true
    },
    
})
const Category = mongoose.model('category', CategorySchema);
module.exports = Category;