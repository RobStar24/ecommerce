import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosEcommerce } from "../utils/configAxios";
import ProductsList from "../components/home/ProductsList";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../store/slices/cart.slice";

const sliderStyles = {
  1: "-ml-[0%]",
  2: "-ml-[100%]",
  3: "-ml-[200%]",
}

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSetSimilarProducts] = useState();
  const [imageToShow, setImageToShow] = useState(1)
  const { id } = useParams();

  const dispatch = useDispatch()

  const handleClickPlus = () => setQuantity(quantity + 1);

  const handleClickLess = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleClickPreviousImage = () => {
    if (imageToShow > 1) {
      setImageToShow(imageToShow - 1);
    }
  }

  const handleClickNextImage = () => {
    if(imageToShow < 3){
      setImageToShow(imageToShow + 1)
    }
  }

  const handleClickAddProduct = () => {
    const productToAdd = {
      quantity,
      productId: product.id
    }
    dispatch(addProductToCart(productToAdd))
  }

  useEffect(() => {
    axiosEcommerce
      .get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (product) {
      axiosEcommerce
        .get(`/products?categoryId=${product.categoryId}`)
        .then(({ data }) => {
          const fiteredProducts = data.filter((item) => item.id !== product.id);
          setSetSimilarProducts(fiteredProducts);
        })
        .catch((err) => console.log(err));
    }
  }, [product]);

  return (
    <section className="p-2 max-w-[1000px] mx-auto">
      <section className="flex text-xs gap-2 items-center">
        <Link to="/">Home</Link>
        <div className="h-[6px] aspect-square rounded-full bg-red-500"></div>
        <span className="font-bold truncate w-[200px]">{product?.title}</span>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 items-center">
        {/* slider */}
        <article className="overflow-hidden relative">
          <section className={`flex w-[300%] ${sliderStyles[imageToShow]} transition-all duration-200`}>
            <div className="h-[300px] w-[calc(100%_/_3)]">
              <img
                className="w-full h-full object-contain"
                src={product?.images[0].url}
                alt=""
              />
            </div>
            <div className="h-[300px] w-[calc(100%_/_3)]">
              <img
                className="w-full h-full object-contain"
                src={product?.images[1].url}
                alt=""
              />
            </div>
            <div className="h-[300px] w-[calc(100%_/_3)]">
              <img
                className="w-full h-full object-contain"
                src={product?.images[2].url}
                alt=""
              />
            </div>
          </section>

          <button onClick={handleClickPreviousImage} className="absolute top-1/2 text-2xl bg-red-500 rounded-full h-[35px] aspect-square text-white -translate-y-1/2 left-2"><i className='bx bx-chevron-left'></i></button>
          <button onClick={handleClickNextImage} className="absolute top-1/2 text-2xl bg-red-500 rounded-full h-[35px] aspect-square text-white -translate-y-1/2 right-2"><i className='bx bx-chevron-right'></i></button>
        </article>

        {/* product details */}
        <article className="grid gap-6">
          <div>
            <h3 className="text-gray-300 font-semibold">{product?.brand}</h3>
            <span className="font-semibold text-lg ml-2 block">
              {product?.title}
            </span>
          </div>

          <section className="grid grid-cols-2">
            <article>
              <h4 className="text-gray-300 font-semibold">Price</h4>
              <span className="font-semibold text-lg ml-2">
                $ {product?.price}
              </span>
            </article>

            <article>
              <h4 className="text-sm text-gray-300 font-semibold">Quantity</h4>
              <div className="flex border-[1px] max-w-max">
                <button
                  className="p-1 border-[1px] px-3"
                  onClick={handleClickLess}
                >
                  -
                </button>
                <div className="p-1 border-[1px] px-4">{quantity}</div>
                <button
                  className="p-1 border-[1px] px-3"
                  onClick={handleClickPlus}
                >
                  +
                </button>
              </div>
            </article>
          </section>

          <button onClick={handleClickAddProduct} className="block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors">
            Add to cart <i className="bx bx-cart"></i>
          </button>

          <p className="text-sm">{product?.description}</p>
        </article>
      </section>

      <section>
        <h3 className="font-semibold">Related Products</h3>

        <ProductsList products={similarProducts} />
      </section>
    </section>
  );
};
export default ProductDetail;
