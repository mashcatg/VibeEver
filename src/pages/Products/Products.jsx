import productImage from "../../assets/images/product.jpeg";
import FeaturedProducts from "../../components/shared/FeaturedProducts/FeaturedProducts";
import SectionHead from "../../components/ui/SectionHead";

const Products = () => {
  return (
    <div className="pb-10">
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
          {
            id: 7,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 8,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 9,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 10,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 11,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 12,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 13,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 14,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
          {
            id: 15,
            image: productImage,
            title: "Landing page React & Tailwind CSS code Snippets",
            tags: ["Coding", "React", "Tailwind Css", "Landing Page"],
            price: 22.5,
            regular_price: 37.5,
          },
        ]}
      ></FeaturedProducts>

      {/* lets talk */}
      <SectionHead
        title={
          <>
            LET'S <br /> TALK
          </>
        }
        submit_handler={(e) => {
          e.preventDefault();
          console.log("Form data", e.target.subscribe_email.value);
        }}
        circle_btn_text="Mail"
        stats={[
          {
            count: 1000,
            text: "Questions Answered",
          },
          {
            count: 1250,
            text: "Ready Templates",
          },
        ]}
      ></SectionHead>
    </div>
  );
};

export default Products;
