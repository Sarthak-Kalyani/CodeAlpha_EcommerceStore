const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    description:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("Product",productSchema);