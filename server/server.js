const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const Product=require("./models/Product");

require("dotenv").config();

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});

app.get("/",(req,res)=>{
    res.send("Ecommerce Backend Running");
});

app.get("/products",async(req,res)=>{
    try{
        const products=await Product.find();
        res.json(products);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

app.post("/add-product",async(req,res)=>{

    try{

        const {name,price,image,description}=req.body;

        const product=new Product({
            name,
            price,
            image,
            description
        });

        await product.save();

        res.json({
            success:true,
            message:"Product Added Successfully"
        });

    }
    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

});

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});