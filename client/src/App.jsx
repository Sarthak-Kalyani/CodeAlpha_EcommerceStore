import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState([]);

  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [image,setImage]=useState("");
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

    if(!name || !price || !description){
      alert("Please fill all fields");
      return;
    }

    try{

      await axios.post(
        "http://localhost:5000/add-product",
        {
          name,
          price,
          image,
          description
        }
      );

      alert("Product Added Successfully");

      setName("");
      setPrice("");
      setImage("");
      setDescription("");

      fetchProducts();

    }catch(error){
      console.log(error);
    }
  };

  const addToCart=(product)=>{
    setCart([...cart,product]);
  };

  const removeFromCart=(indexToRemove)=>{
    setCart(
      cart.filter((item,index)=>index!==indexToRemove)
    );
  };

  const clearCart=()=>{
    setCart([]);
  };

  const totalPrice=cart.reduce(
    (total,item)=>total+Number(item.price),
    0
  );

  return(
    <div>

      <nav className="navbar">
        <h2>🛒 CodeAlpha Store</h2>

        <div className="cart-badge">
          Cart: {cart.length}
        </div>
      </nav>

      <div className="main-layout">

        <div className="left-section">

          <div className="form-card">

            <h2>Add Product</h2>

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e)=>setImage(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            <button
              className="add-btn"
              onClick={addProduct}
            >
              Add Product
            </button>

          </div>

          <h2 className="section-title">
            Products
          </h2>

          <div className="products">

            {products.map((product)=>(

              <div className="card" key={product._id}>

                <img
                 src={
                  product.image
                   ? product.image
                    : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                 }
                 alt={product.name}
               />

                <h3>{product.name}</h3>

                <p className="price">
                  ₹{product.price}
                </p>

                <p>
                  {product.description}
                </p>

                <button
                  className="cart-btn"
                  onClick={()=>addToCart(product)}
                >
                  Add To Cart
                </button>

              </div>

            ))}

          </div>

        </div>

        <div className="cart-section">

          <h2>Shopping Cart</h2>

          {cart.length===0 ? (
            <p>Cart is Empty</p>
          ) : (
            <>
              {cart.map((item,index)=>(
                <div
                  className="cart-item"
                  key={index}
                >

                  <span>
                    {item.name}
                  </span>

                  <button
                    className="remove-btn"
                    onClick={()=>removeFromCart(index)}
                  >
                    Remove
                  </button>

                </div>
              ))}

              <h3>
                Total: ₹{totalPrice}
              </h3>

              <button
                className="clear-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>

              <button
               className="order-btn"
               onClick={()=>{
                 alert("Order Placed Successfully!");
                 setCart([]);
               }}
             >
               Place Order
             </button>

            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default App;