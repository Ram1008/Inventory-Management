const mongoose  = require('mongoose');
const Schema  = mongoose.Schema;

const CodeSchema = new Schema({
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    code:{
        type: String,
        required: true
    },
    expireIn: {
        type:Number,
        required: true
    }
    
})
const Reset = mongoose.model('reset', CodeSchema);
module.exports = Reset;