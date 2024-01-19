import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { items, uptadeItemQuantity } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>Koszyk pusty!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span className="cart-name">{item.name}</span>
                  <span className="cart-price"> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => uptadeItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => uptadeItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Łączna cena: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
