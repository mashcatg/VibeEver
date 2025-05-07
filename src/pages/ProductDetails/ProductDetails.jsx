import productImage from "../../assets/images/product.jpeg";
import Details from "./Details/Details";
import SectionHead from "../../components/ui/SectionHead";
import FeaturedProducts from "../../components/shared/FeaturedProducts/FeaturedProducts";
import FAQs from "../../components/shared/FAQs/FAQs";

const ProductDetails = () => {
  return (
    <div className="text-text-body">
      <Details />

      <br />

      <FeaturedProducts
        section_head_title={
          <>
            RELATED <br /> PRODUCTS
          </>
        }
        section_head_stats={[
          {
            count: 120,
            text: "Landing Pages",
          },
        ]}
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
        ]}
      ></FeaturedProducts>

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
      ></FAQs>
    </div>
  );
};

export default ProductDetails;
