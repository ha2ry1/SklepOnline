import { useState } from "react";
import "./App.css";
import { DummyProducts } from "./DummyProducts";
import ItemCard from "./components/ItemCard";
import NavBar from "./components/NavBar";
import ShopItems from "./components/ShopItems";
import CartContextProvider from "./context/CartContext";
import NewItem from "./components/NewItem";

function App() {
  const [loginToggle, setLoginToggle] = useState(false);
  const [registerToggle, setRegisterToggle] = useState(false);
  const [newItemToggle, setNewItemToggle] = useState(false);
  const [products, setProducts] = useState(DummyProducts);

  const registerHandler = () => {
    setRegisterToggle(!registerToggle);
  };
  const loginHandler = () => {
    setLoginToggle(!loginToggle);
  };

  const newItemHandler = () => {
    setNewItemToggle(!newItemToggle);
  };

  const newProduct = (prod) => {
    const newProducts = [...products, prod];
    setProducts(newProducts);
  };

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <>
      <CartContextProvider>
        <NavBar loginHandler={loginHandler} newItemHandler={newItemHandler} />
        <ShopItems>
          {products.map((product) => (
            <li key={product.id}>
              <ItemCard {...product} />
            </li>
          ))}
        </ShopItems>
      </CartContextProvider>
      {loginToggle && (
        <div className="popuplogin " id="loginWin">
          <p>Logowanie</p>
          <p>Email:</p>
          <input
            type="text"
            id="email"
            placeholder="Email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          ></input>
          <p>Hasło:</p>
          <input
            type="password"
            id="pass"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
            placeholder="Hasło"
          ></input>
          <br></br>
          <button onClick={loginHandler}>Zaloguj</button>
          <button onClick={registerHandler}>Rejestracja</button>
        </div>
      )}

      {registerToggle && (
        <div className="popupRegister " id="regWin">
          <p>Rejestracja</p>
          <p>Nazwa:</p>
          <input
            type="text"
            placeholder="Nazwa"
            id="nameR"
            onChange={(event) => {
              setRegisterName(event.target.value);
            }}
          ></input>
          <p>Email:</p>
          <input
            type="text"
            placeholder="Email"
            id="emailR"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          ></input>
          <p>Hasło:</p>
          <input
            type="password"
            placeholder="Hasło"
            id="passR"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          ></input>
          <button onClick={registerHandler}>Zarejestruj</button>
          <button onClick={registerHandler}>Zamknij</button>
        </div>
      )}
      {newItemToggle && (
        <NewItem newProduct={newProduct} newItemHandler={newItemHandler} />
      )}
    </>
  );
}

export default App;
