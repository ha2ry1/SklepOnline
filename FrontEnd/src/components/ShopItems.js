export default function ShopItems({ children }) {
  return (
    <section id="shop">
      <h1>Dostępne produkty</h1>

      <ul id="products">{children}</ul>
    </section>
  );
}
