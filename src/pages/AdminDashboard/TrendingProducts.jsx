import { useEffect, useState } from "react";
import ProductCard from "../../components/ui/ProductCard";
import useAxios from "../../Hooks/useAxios";

const TrendingProducts = () => {
  const [products , setProducts] = useState([])
  const [loading, setLoading] = useState(true);

  const axios= useAxios()

   useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/products?limit=5`);

          console.log("response.data.products" , response.data.products);
          setProducts(response.data.products);
        } catch (error) {
          console.log('Failed to load products');
        } finally {
          setLoading(false);
        }
      };
      
      fetchProducts();
    }, [axios]);



     if (loading) {
    return (
      <div className="py-4 px-4 sm:px-8 rounded-xl bg-neutral-subtle">
        <h5 className="text-text-body text-headline leading-headline">Recent Users</h5>
        <div className="mt-5 space-y-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1 h-20 bg-white/50 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="mt-10">
      <h3 className="font-extrabold">
        TRENDING <span className="text-primary">PRODUCTS</span>
      </h3>

      <div className="mt-5">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 max-w-[51.25rem]">
         {
          products.map((product) => (
            <ProductCard
              key={product._id}
               product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
