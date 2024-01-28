import React, { useEffect, useState } from "react";

const NewItem = (props) => {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState([]);
  const [category, setCategory] = useState([]);
  const [choseCategory, setChoseCategory] = useState("");
  const addItemHandler = (event) => {
    event.preventDefault();
    const newItem = {
      name: itemName,
      description: itemDesc,
      price: itemPrice,
      image: itemImage,
      category: category,
    };
    props.newProduct(newItem);
  };

  const getCategory = async () => {
    await fetch("http://127.0.0.1:8000/api/category")
      .then((res) => {
        const category = res.json();
        return category;
      })
      .then((category) => {
        console.log(category);
        setCategory(category);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);

  const postItem = async () => {
    const body = {
      name: itemName,
      descript: itemDesc,
      price: itemPrice,
      category: choseCategory,
      /* image: itemImage, */
    };
    await fetch("http://127.0.0.1:8000/api/item/", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
      })
      .catch(() => console.log());

    console.log(body);
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
      <h2>Opis produktu:</h2>
      <textarea
        onChange={(event) => setItemDesc(event.target.value)}
        className="descItem"
        placeholder="Opis"
      ></textarea>
      <h2>Kategoria</h2>
      <select
        onChange={(event) => {
          setChoseCategory(event.target.value);
        }}
      >
        {category.map((category) => (
          <option key={category.id}>{category.name}</option>
        ))}
      </select>
      <h2>Obraz</h2>
      <input
        onChange={(event) => setItemImage(event.target.value)}
        className="imgItem"
        type="file"
      ></input>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            postItem();
            props.newItemHandler();
          }}
        >
          Dodaj produkt
        </button>
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
