// mongodb://localhost:27017
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/products?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";


connectToMongo = () =>{
    mongoose.connect(mongoURI, () =>{
        console.log("connected to mongo successfully")
    })
}

module.exports = connectToMongo;