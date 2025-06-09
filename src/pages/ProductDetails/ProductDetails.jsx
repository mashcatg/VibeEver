import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import Details from "./Details/Details";
import FeaturedProducts from "../../components/shared/FeaturedProducts/FeaturedProducts";
import FAQs from "../../components/shared/FAQs/FAQs";
 

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();
  const axios = useAxios();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);

        // Fetch related products from same category
        const relatedResponse = await axios.get(
          `/products?category=${response.data.category._id}&limit=3`
        );
        setRelatedProducts(
          relatedResponse.data.products.filter((p) => p._id !== id)
        );
      } catch (error) {
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, axios]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="text-text-body">
      <Details product={product} />

      <br />

      <FeaturedProducts
        section_head_title={
          <>
            RELATED <br /> PRODUCTS
          </>
        }
        section_head_stats={[
          {
            count: relatedProducts.length,
            text: "Related Products",
          },
        ]}
        products={relatedProducts.map((product) => ({
          id: product?._id,
          image: product?.thumbnailUrls[0],
          title: product?.title,
          tags: product?.tags,
          price: product?.finalPrice,
          regular_price: product?.price,
          category: product?.category?.name,
        }))}
      />

      <br />

      <FAQs
        faqs={[
          {
            question: "Here is a demo question to ask by us?",
            answer:
              "Here is the answer of the demo question. Here is the answer of the demo question. Here is the answer of the demo question. Here is the answer of the demo question.",
          },
          {
            question: "Here is a demo question to ask by us?",
            answer:
              "Here is the answer of the demo question. Here is the answer of the demo question. Here is the answer of the demo question. Here is the answer of the demo question.",
          },
          {
            question: "Here is a demo question to ask by us?",
            answer:
              "Here is the answer of the demo question. Here is the answer of the demo question. Here is the answer of the demo question. Here is the answer of the demo question.",
          },
          {
            question: "Here is a demo question to ask by us?",
            answer:
              "Here is the answer of the demo question. Here is the answer of the demo question. Here is the answer of the demo question. Here is the answer of the demo question.",
          },
          {
            question: "Here is a demo question to ask by us?",
            answer:
              "Here is the answer of the demo question. Here is the answer of the demo question. Here is the answer of the demo question. Here is the answer of the demo question.",
          },
        ]}
      />
    </div>
  );
};

export default ProductDetails;
