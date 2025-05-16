import productImage from "../../assets/images/product.jpeg";
import ProductCard from "../../components/ui/ProductCard";

const TrendingProducts = () => {
  const product = {
    id: 13,
    image: productImage,
    title: "Landing page React & Tailwind CSS code Snippets",
    tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
    price: 22.5,
    regular_price: 37.5,
  };

  return (
    <div className="mt-10">
      <h3 className="font-extrabold">
        TRENDING <span className="text-primary">PRODUCTS</span>
      </h3>

      <div className="mt-5">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 max-w-[51.25rem]">
          <ProductCard product={product}></ProductCard>
          <ProductCard product={product}></ProductCard>
          <ProductCard product={product}></ProductCard>
          <ProductCard product={product}></ProductCard>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
