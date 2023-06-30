import { formatDDMMYYYY } from "../../utils/date";

const Purchase = ({ purchase }) => {

    const totalPrice = (purchase.product.price * purchase.quantity).toFixed(2)

  return (
    <article className="grid grid-cols-2 gap-2 text-sm items-center">
      {/* Left Section */}
      <section className="flex items-center gap-2">
        <div className="h-[50px] aspect-square">
          <img className="h-full w-full object-contain" src={purchase.product.images[2].url} alt="" />
        </div>
        <span>{purchase.product.title}</span>
      </section>

      {/* Right Section */}
      <section className="grid text-center items-center justify-center gap-3 font-semibold sm:grid-cols-3">
        <span className="text-gray-400 text-xs">{formatDDMMYYYY(purchase.createdAt)}</span>
        <span className="p-1 px-4 border-[1px] border-gray-400 max-w-[45px] mx-auto">{purchase.quantity}</span>
        <span>${purchase.product.price}</span>
      </section>
    </article>
  );
};
export default Purchase;
