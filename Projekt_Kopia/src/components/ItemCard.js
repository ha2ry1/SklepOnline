import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
const ItemCard = ({
  id,
  name,
  description,
  price,
  amount,
  user,
  endDate,
  image,
}) => {
  const { addItemToCart } = useContext(CartContext);
  return (
    <article className="product">
      <h2>{name}</h2>
      <img src={image} alt={id} />
      <div>
        <h5>Cena: {price}zł</h5>
        <h5>Ilość: {amount}</h5>
        <h5>Data: {endDate}</h5>
        <h5>Sprzedający: {user}</h5>
        <h5>
          Opis produktu: <br></br>
          {description}
        </h5>
      </div>
      <button onClick={() => addItemToCart(id)}>Dodaj do koszyka</button>
    </article>
  );
};

export default ItemCard;
