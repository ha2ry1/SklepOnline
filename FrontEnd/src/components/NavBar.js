import React from "react";
import { useRef, useContext } from "react";
import { CartContext } from "../context/CartContext.js";
import CartModal from "./CartModal.js";

const NavBar = (props) => {
  const modal = useRef();
  const { items } = useContext(CartContext);
  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Zamknij</button>
        <button>Kup</button>
      </>
    );
  }
  return (
    <div>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid">
          <div className="navbar-brand">Aplikacja</div>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Wyszukaj"
              aria-label="Search"
            ></input>
            <button className="btn btn-outline-secondary" type="submit">
              Wyszukaj
            </button>
          </form>
          <div>
            <button
              type="button"
              className="btn btn-primary align-right"
              onClick={handleOpenCartClick}
            >
              Koszyk
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                props.newItemHandler();
              }}
              type="button"
              className="btn btn-primary align-right"
            >
              Dodaj produkt
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                props.loginHandler();
              }}
              type="button"
              className="btn btn-primary align-right"
            >
              Konto
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
