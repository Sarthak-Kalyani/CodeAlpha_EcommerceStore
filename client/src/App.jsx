import { useEffect,useState } from "react";
import axios from "axios";
import "./App.css";

function App(){

  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/products")
    .then((response)=>{
      setProducts(response.data);
    })
    .catch((error)=>{
      console.log(error);
    });
  },[]);

  const addToCart=(product)=>{
    setCart([...cart,product]);
  };

  const removeFromCart=(indexToRemove)=>{
    setCart(
      cart.filter(
        (item,index)=>index!==indexToRemove
      )
    );
  };

  const totalPrice=cart.reduce(
    (total,item)=>total+Number(item.price),
    0
  );

  return(
    <div>

      <nav className="navbar">

        <h1>
          🛒 CodeAlpha Store
        </h1>

        <div className="cart-count">
          Cart: {cart.length}
        </div>

      </nav>

      <div className="hero">

        <h1>
          🔥 Summer Sale 2026
        </h1>

        <p>
          Premium Tech Products
        </p>

      </div>

      <div className="all-products">

        <h2>
          Products
        </h2>

        <div className="products">

          {products.map((product)=>(

            <div
              className="card"
              key={product._id}
            >

              <img
                src={
                  product.image
                  ? product.image
                  : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                }
                alt={product.name}
              />

              <div className="rating">
                ⭐ 4.8
              </div>

              <h3>
                {product.name}
              </h3>

              <p className="price">
                ₹{product.price}
              </p>

              <p>
                {product.description}
              </p>

              <button
                className="cart-btn"
                onClick={()=>
                  addToCart(product)
                }
              >
                Add To Cart
              </button>

            </div>

          ))}

        </div>

      </div>

      <div className="cart-section">

        <h2>
          🛒 Shopping Cart
        </h2>

        {cart.length===0 ? (

          <p> 🛒 Your cart is empty. Add some awesome products! </p>

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
                  onClick={()=>
                    removeFromCart(index)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

            <h3>
              Total: ₹{totalPrice}
            </h3>

            <button
              className="order-btn"
              onClick={()=>{
                alert("🎉 Order Placed Successfully!");
                setCart([]);
              }}
            >
              Place Order
            </button>

          </>

        )}

      </div>

      <footer className="footer"> 
        <h3>🛒 CodeAlpha Store</h3> 
        <p>Premium Ecommerce Experience</p> 
        <p>Built by Sarthak Kalyani</p> 
        </footer>

    </div>

  );
}

export default App;