import { BsTrash2 } from "react-icons/bs";
import { useWishlist } from "../../Providers/wishlistProvider";
import FeaturedProducts from "../../components/shared/FeaturedProducts/FeaturedProducts";
import ProductCard from "../../components/ui/ProductCard";
import { useCart } from "../../Providers/cartProvider";

const Wishlist = () => {
  const { wishlist, loading, toggleWishlist } = useWishlist();

  

  const formattedProducts = wishlist.map((product) => ({
    id: product._id,
    image: product.thumbnailUrls?.[0],
    title: product.title,
    tags: product.tags || [],
    price: product.finalPrice ?? product.price,
    regular_price: product.price,
    download_link: product.download_link,
    category: product.category,
    isPublished: product.isPublished,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600 animate-pulse">Loading your wishlist...</div>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500">Your wishlist is empty.</div>
      </div>
    );
  }

  console.log(wishlist);

  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8">
      <FeaturedProducts
        section_head_title={
          <>
            YOUR <br /> WISHLIST
          </>
        }
        section_head_stats={[
          {
            count: wishlist.length,
            text: "Your Items",
          },
        ]}
        products={formattedProducts}
      ></FeaturedProducts>
    </div>
  );
};

export default Wishlist;
