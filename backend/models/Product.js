const mongoose  = require('mongoose');
const Schema  = mongoose.Schema;

const ProductSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    quantity:{
        type: Number,
        required: true
    },

    price:{
        type: Number,
        required: true
    },
})
module.exports = mongoose.model('products', ProductSchema);