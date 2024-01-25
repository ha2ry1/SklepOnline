import { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCardState = {
  items: [],
  cart: [],
};

const cardReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.cart];
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];
    if (!existingCartItem) {
      const product = state.items.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.name,
        price: product.price,
      });
    }
    return {
      ...state,
      cart: updatedItems,
    };
  }
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.cart];
    const newItems = updatedItems.filter(
      (element) => element.id !== action.payload
    );
    return {
      ...state,
      cart: newItems,
    };
  }
  if (action.type === "SET_ITEMS") {
    const newItems = action.payload.map((item) => {
      const newItem = {
        id: item.id,
        name: item.name,
        descript: item.descript,
        category: item.category,
        price: parseFloat(item.price),
      };
      console.log(newItem);
      return newItem;
    });
    return { ...state, items: newItems };
  }
};

const CardProvider = (props) => {
  const [cardState, dispatchCardAction] = useReducer(
    cardReducer,
    defaultCardState
  );

  const incrementHandler = () => {
    dispatchCardAction({ type: "INCREMENT" });
  };
  const setItemsHandler = (data) => {
    dispatchCardAction({ type: "SET_ITEMS", payload: data });
  };
  const removeItemCartHandler = (data) => {
    dispatchCardAction({ type: "UPDATE_ITEM", payload: data });
  };
  function addItemToCartHandler(id) {
    dispatchCardAction({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  const cardContext = {
    // counter: cardState.counter,
    // incrementCounter: incrementHandler,
    removeItemCartHandler: removeItemCartHandler,
    setItemsHandler: setItemsHandler,
    addItemToCartHandler: addItemToCartHandler,
    items: cardState.items,
    cart: cardState.cart,
  };

  return (
    <CardContext.Provider value={cardContext}>
      {props.children}
    </CardContext.Provider>
  );
};
export default CardProvider;
