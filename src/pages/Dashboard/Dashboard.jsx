import productImage from "../../assets/images/product.jpeg";
import { useNavigate } from "react-router-dom";
import FeaturedProducts from "../../components/shared/FeaturedProducts/FeaturedProducts";
import DashboardProfile from "./DashboardProfile";
import DashboardStats from "./DashboardStats";
import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useCart } from "../../Providers/cartProvider";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const axios  =useAxios()
  const [limit] = useState(6)
  const [page , setPage] =useState(1)
  const [totalPages , setTotalPages ] =useState(1)
    const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const { fetchCart} = useCart();
    

    const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        fetchCart()
        const { data } = await axios.get(`/orders/purchases?limit=${limit}&page=${page}` , {
            headers: {
              Authorization: `${token}`,
            }}) 
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
        setTotalPages(data.totalPages)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchases:", error?.response?.data || error.message);
      }
    };

    fetchPurchases();
  }, [axios, page , limit,token ]);

  
  // Add pagination handler
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //  if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center"> sdfsdfsdg
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }


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
        onPageChange={handlePageChange}
        section_head_circle_btn_text="View All"
        section_head_circuler_btn_handler={() => navigate("/products")}
        products={products}
         currentPage={page}
        totalPages={totalPages}
      ></FeaturedProducts>
    </div>
  );
};

export default Dashboard;
