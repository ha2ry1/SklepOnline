import React from "react";

const CardContext = React.createContext({
  items: [],
  addItemToCartHandler: () => {},
  updateItemQuantity: () => {},
  setItemsHandler: () => {},
});

export default CardContext;
