import { useContext } from "react";
// import { CartContext } from "../context/CartContext";
import CartContext from "../context/cart-context.js";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  // const { items, uptadeItemQuantity } = useContext(CartContext)

  const totalPrice = cartCtx.cart.reduce((acc, item) => acc + item.price, 0);
  console.log(cartCtx.cart);
  return (
    <div id="cart">
      {cartCtx.cart.length === 0 && <p>Koszyk pusty!</p>}
      {cartCtx.cart.length > 0 && (
        <ul id="cart-items">
          {cartCtx.cart.map((item) => {
            const formattedPrice = `$${item.price}`;

            return (
              <li key={item.id}>
                <div>
                  <span className="cart-name">{item.name}</span>
                  <span className="cart-price"> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() => cartCtx.removeItemCartHandler(item.id)}
                  >
                    Usuń
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Łączna cena: <strong>{totalPrice}</strong>
      </p>
    </div>
  );
}
