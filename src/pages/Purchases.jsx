import { useEffect, useState } from "react";
import { axiosEcommerce, getConfig } from "../utils/configAxios";
import Purchase from "../components/purchases/Purchase";
import { Link } from "react-router-dom";

const Purchases = () => {
  const [purchasesHistory, setPurchasesHistory] = useState([]);

  useEffect(() => {
    axiosEcommerce
      .get("/purchases", getConfig())
      .then(({ data }) => {
        const orderedPurchases = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPurchasesHistory(orderedPurchases);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="max-x-[700px] mx-auto px-4">
      <div className="flex my-7">
        <Link className="text-gray-600 text-md font-sans" to="/">
          Home
        </Link>
        <div className="h-[6px] aspect-square rounded-full bg-red-500 mx-3 translate-y-3"></div>
        <span className="font-semibold text-gray-800 truncate w-[200px]">
          purchases
        </span>
      </div>
      <h3 className="font-bold text-2xl my-3 pb-8 text-gray-500">My purchases</h3>

      <section className="grid gap-8 px-4">
        {purchasesHistory.map((purchase) => (
          <Purchase key={purchase.id} purchase={purchase} />
        ))}
      </section>
    </section>
  );
};
export default Purchases;
