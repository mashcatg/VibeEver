import productImage from "../../assets/images/product.jpeg";
import { useNavigate } from "react-router-dom";
import FeaturedProducts from "../../components/shared/FeaturedProducts/FeaturedProducts";
import DashboardProfile from "./DashboardProfile";
import DashboardStats from "./DashboardStats";
import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const axios  =useAxios()

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const { data } = await axios.get("/orders/purchases");
// console.log(data , "dfsdfsdf");
        const formattedProducts = data.purchases.map((purchase) => ({
          id: purchase.product._id,
          image: purchase.product?.thumbnailUrls[0] || productImage,
          title: purchase.product.title,
          tags: purchase.product?.tags,
          price: purchase.product?.finalPrice,  
          regular_price: purchase.product.price, 
          download_link: purchase.product.download_url || "#",
          version: purchase.product?.version ,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching purchases:", error?.response?.data || error.message);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div>
      <DashboardProfile></DashboardProfile>

      <DashboardStats></DashboardStats>

      <FeaturedProducts
        section_head_title={
          <>
            YOUR <br /> PRODUCTS
          </>
        }
        section_head_stats={[
          {
            count: products.length,
            text: "Products Downloaded",
          },
        ]}
        section_head_circle_btn_text="View All"
        section_head_circuler_btn_handler={() => navigate("/products")}
        products={products}
      ></FeaturedProducts>
    </div>
  );
};

export default Dashboard;
