import productImage from "../../assets/images/product.jpeg";
import { useNavigate } from "react-router-dom";
import FeaturedProducts from "../../components/shared/FeaturedProducts/FeaturedProducts";
import DashboardProfile from "./DashboardProfile";
import DashboardStats from "./DashboardStats";

const Dashboard = () => {
  const navigate = useNavigate();
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
            count: 20,
            text: "Products Downloaded",
          },
        ]}
        section_head_circle_btn_text="View All"
        section_head_circuler_btn_handler={() => navigate("/products")}
        products={[
          {
            id: 1,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
            download_link: "https://example.com/",
          },
          {
            id: 2,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
            download_link: "https://example.com/",
          },
          {
            id: 3,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
            download_link: "https://example.com/",
          },
          {
            id: 4,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
            download_link: "https://example.com/",
          },
          {
            id: 5,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
            download_link: "https://example.com/",
          },
          {
            id: 6,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
            download_link: "https://example.com/",
          },
        ]}
      ></FeaturedProducts>
    </div>
  );
};

export default Dashboard;
