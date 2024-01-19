import React, { useState } from "react";

const NewItem = (props) => {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemAmount, setItemAmount] = useState(0);
  const [itemDate, setItemDate] = useState("");
  const [itemImage, setItemImage] = useState([]);
  const addItemHandler = (event) => {
    event.preventDefault();
    const newItem = {
      name: itemName,
      description: itemDesc,
      price: itemPrice,
      amount: itemAmount,
      endDate: itemDate,
      image: itemImage,
      id: Math.random() * 10000,
    };
    props.newProduct(newItem);
  };
  return (
    <form className="newItem">
      <h1>Formularz dodawania przedmiotu</h1>
      <br />
      <h2>Nazwa:</h2>
      <textarea
        onChange={(event) => setItemName(event.target.value)}
        className="nameItem"
        placeholder="Nazwa produktu"
        type="text"
      ></textarea>
      <h2>Cena:</h2>
      <input
        onChange={(event) => setItemPrice(event.target.value)}
        className="priceItem"
        placeholder="0"
        type="number"
        step="0.01"
      ></input>
      <h2>Ilość:</h2>
      <input
        onChange={(event) => setItemAmount(event.target.value)}
        className="amountItem"
        placeholder="0"
        type="number"
      ></input>
      <h2>Opis produktu:</h2>
      <textarea
        onChange={(event) => setItemDesc(event.target.value)}
        className="descItem"
        placeholder="Opis"
      ></textarea>
      <h2>Data końca:</h2>
      <input
        onChange={(event) => setItemDate(event.target.value)}
        className="dateItem"
        type="date"
      ></input>
      <h2>Obraz</h2>
      <input
        onChange={(event) => setItemImage(event.target.value)}
        className="imgItem"
        type="file"
      ></input>
      <div>
        <button onClick={addItemHandler}>Dodaj produkt</button>
        <button
          onClick={() => {
            props.newItemHandler();
          }}
        >
          Anuluj
        </button>
      </div>
    </form>
  );
};

export default NewItem;
