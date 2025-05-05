import productImage from "../../assets/images/product.jpeg";
import Hero from "./Hero/Hero";
import TrustSection from "./TrustSection/TrustSection";
import SectionHead from "../../components/ui/SectionHead";
import FeaturedProducts from "../../components/shared/FeaturedProducts/FeaturedProducts";

const Home = () => {
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
        products={[
          {
            id: 1,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 2,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 3,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 4,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 5,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 6,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
        ]}
      ></FeaturedProducts>
    </div>
  );
};

export default Home;
