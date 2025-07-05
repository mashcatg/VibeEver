import { BsTrash2 } from "react-icons/bs";
import { useWishlist } from "../../Providers/wishlistProvider";
import ProductCard from "../../components/ui/ProductCard";

const Wishlist = () => {
  const { wishlist, loading, toggleWishlist } = useWishlist();

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Your Wishlist</h1>
        <span className="text-sm text-gray-500">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {wishlist.map((product) => (
  <ProductCard
    key={product._id}
    product={{
      id: product._id,
      image: product.thumbnailUrls?.[0],
      title: product.title,
      tags: product.tags || [],
      price: product.finalPrice ?? product.price,
      regular_price: product.price,
      download_link: product.download_link,
      category: product.category,
      isPublished: product.isPublished,
    }}
  />
))}
      </div>
    </div>
  );
};

export default Wishlist;