import React from "react";

const NewItem = (props) => {
  return (
    <form className="newItem">
      <h1>Formularz dodawania przedmiotu</h1>
      <br />
      <h2>Nazwa:</h2>
      <textarea
        className="nameItem"
        placeholder="Nazwa produktu"
        type="text"
      ></textarea>
      <h2>Cena:</h2>
      <input
        className="priceItem"
        placeholder="0"
        type="number"
        step="0.01"
      ></input>
      <h2>Ilość:</h2>
      <input className="amountItem" placeholder="0" type="number"></input>
      <h2>Opis produktu:</h2>
      <textarea className="descItem" placeholder="Opis"></textarea>
      <h2>Data końca:</h2>
      <input className="dateItem" type="date"></input>
      <h2>Obraz</h2>
      <input className="imgItem" type="file"></input>
      <div>
        <button>Dodaj produkt</button>
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
