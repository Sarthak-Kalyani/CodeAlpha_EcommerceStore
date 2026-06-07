import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App(){

  const [products,setProducts]=useState([]);
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [description,setDescription]=useState("");

  useEffect(()=>{
    fetchProducts();
  },[]);

  const fetchProducts=()=>{
    axios.get("http://localhost:5000/products")
    .then((response)=>{
      setProducts(response.data);
    })
    .catch((error)=>{
      console.log(error);
    });
  };

  const addProduct=async()=>{

    try{

      await axios.post(
        "http://localhost:5000/add-product",
        {
          name,
          price,
          image:"",
          description
        }
      );

      alert("Product Added");

      setName("");
      setPrice("");
      setDescription("");

      fetchProducts();

    }
    catch(error){
      console.log(error);
    }

  };

  return(
    <div className="container">

      <h1 className="title">
        CodeAlpha Ecommerce Store
      </h1>

      <div>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <br /><br />

        <button onClick={addProduct}>
          Add Product
        </button>

      </div>

      <br />

      <div className="products">

        {products.map((product)=>(
          <div className="card" key={product._id}>

            <h2>{product.name}</h2>

            <p className="price">
              ₹{product.price}
            </p>

            <p>
              {product.description}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;