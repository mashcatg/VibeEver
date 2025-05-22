import productImage from "../../assets/images/product.jpeg";
import Hero from "./Hero/Hero";
import TrustSection from "./TrustSection/TrustSection";
import SectionHead from "../../components/ui/SectionHead";
import FeaturedProducts from "../../components/shared/FeaturedProducts/FeaturedProducts";
import FAQs from "../../components/shared/FAQs/FAQs";
import Contact from "./Contact/Contact";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = JSON.parse(localStorage.getItem("auth"))?.token

        console.log(token.token , "token home");
        
        const response = await axios.get('/products?limit=6', {
          headers: {
            'Authorization':`${token}`
          }
        });

        const formattedProducts = response.data.products.map(product => ({
          id: product._id,
          image: product.thumbnailUrls[0],
          title: product.title,
          tags: product.tags,
          price: product.finalPrice,
          regular_price: product.price,
          category: product.category?.name,
          isPublished: product.isPublished
        }));
        setProducts(formattedProducts);
      } catch (error) {
        // Check if unauthorized
        if (error.response?.status === 401) {
          toast.error('Please login to view products');
          // Optionally redirect to login
          // navigate('/sign-in');
        } else {
          toast.error('Failed to load featured products');
        }
      } finally {
        setLoading(false);
      }
    };
    
    // Only fetch if we have a token
    const token = JSON.parse(localStorage.getItem("auth"))?.token
    if (token) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [axios, navigate]);
  return (
    <div>
      <Hero></Hero>

      <TrustSection></TrustSection>

      <SectionHead
        title={
          <>
            Creative <br /> Files
          </>
        }
        description="A bit about the brand to fully make it clear to users. What they will get and how they will be benefited from it."
        circle_btn_text="A Video"
        stats={[
          {
            count: 1250,
            text: "Graphics Assets",
          },
          {
            count: 1250,
            text: "UI Templates",
          },
          {
            count: 12050,
            text: "Total Downloads",
          },
        ]}
        cards={[
          {
            title: "GRAPHICS ASSETS",
            description: "Sample 2-3 lines of description for the Template will go here in this short paragraph to make it concise.",
          },
          {
            title: "UI Templates",
            description: "Sample 2-3 lines of description for the Template will go here in this short paragraph to make it concise.",
          },
        ]}
      ></SectionHead>

      <FeaturedProducts
        section_head_title={
          <>
            FEATURED <br /> PRODUCTS
          </>
        }
        section_head_stats={[
          {
            count: products.length,
            text: "Ready Templates",
          },
        ]}
        section_head_circle_btn_text="View All"
        section_head_circuler_btn_handler={() => navigate("/products")}
        products={products}
        loading={loading}
      ></FeaturedProducts>

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
      ></FAQs>

      <Contact></Contact>
    </div>
  );
};

export default Home;
