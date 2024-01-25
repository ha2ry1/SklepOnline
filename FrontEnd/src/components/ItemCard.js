import React, { useContext } from "react";
// import { CartContext } from "../context/CartContext";
import CartContext from "../context/cart-context.js";

const ItemCard = ({
  id,
  name,
  descript,
  price,
  amount,
  user,
  endDate,
  image,
}) => {
  const cartCtx = useContext(CartContext);
  // const { addItemToCart } = useContext(CartContext)
  return (
    <article className="product">
      <h2>{name}</h2>
      <img src={image} alt={id} />
      <div>
        <h5>Cena: {price}zł</h5>
        <h5>Sprzedający: {user}</h5>
        <h5>
          Opis produktu: <br></br>
          {descript}
        </h5>
      </div>
      <button onClick={() => cartCtx.addItemToCartHandler(id)}>
        Dodaj do koszyka
      </button>
    </article>
  );
};

export default ItemCard;
