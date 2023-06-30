import { useEffect, useState } from "react";
import { axiosEcommerce } from "../utils/configAxios";
import ProductsList from "../components/home/ProductsList";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1000px)" });

  const productsByName = products.filter((product) =>
    product.title.toLowerCase().includes(productName)
  );

  const handleClickCategory = (e) => {
    setCurrentCategory(e.target.dataset.category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentProductName = e.target.productName.value;
    setProductName(currentProductName.toLowerCase());
  };

  useEffect(() => {
    axiosEcommerce
      .get("/categories")
      .then(({ data }) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosEcommerce
      .get(`/products?categoryId=${currentCategory}`)
      .then(({ data }) => setProducts(data))
      .catch(() => console.log(err));
  }, [currentCategory]);

  return (
    <section className="flex px-4">
      {isLargeScreen ? (
        <aside className="block w-[250px] mt-[60px]">
          <h3 className="font-bold text-lg border-b-2 border-gray-200 w-[90%] py-2">Category</h3>
          <ul>
            <li className="p-2" onClick={handleClickCategory} data-category="">
              All
            </li>
            {categories.map((category) => (
              <li
                onClick={handleClickCategory}
                data-category={category.id}
                key={category.id}
                className="p-2"
              >
                {category.name}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <article className="grid w-[90%] mx-auto py-[30px] max-w-[1200px] place-content-center content-start">
        <form onSubmit={handleSubmit}>
          <div className="flex my-8">
            <input
              id="productName"
              type="text"
              placeholder="What are you looking for?"
              className="border border-gray-200 flex-grow"
            />
            <button>
              <i className="bx bx-search bg-red-500 text-white text-lg w-[45px] h-[45px] flex items-center justify-center"></i>
            </button>
          </div>
        </form>

        <ProductsList products={productsByName} />
      </article>
    </section>
  );
};
export default Home;
