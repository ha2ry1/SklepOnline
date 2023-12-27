import "./App.css";
import { DummyProducts } from "./DummyProducts";
import ItemCard from "./components/ItemCard";
import NavBar from "./components/NavBar";
import ShopItems from "./components/ShopItems";
import CartContextProvider from "./context/CartContext";

function App() {
  return (
    <CartContextProvider>
      <NavBar />
      <ShopItems>
        {DummyProducts.map((product) => (
          <li key={product.id}>
            <ItemCard {...product} />
          </li>
        ))}
      </ShopItems>
    </CartContextProvider>
  );
}

export default App;
