import Product from "./Product";

const ProductsList = ({ products }) => {
  return (
    <article>
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-10">
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  </article>
  );
};
export default ProductsList;
