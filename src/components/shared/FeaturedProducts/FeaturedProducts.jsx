import SectionHead from "../../ui/SectionHead";
import ProductCard from "../../ui/ProductCard";
import { CircularButton } from "../../ui/Button";

const FeaturedProducts = ({ products }) => {
  return (
    <div>
      {/* section header */}
      <SectionHead
        title={
          <>
            FEATURED <br /> PRODUCTS
          </>
        }
        circle_btn_text="View All"
        stats={[
          {
            count: 1250,
            text: "Ready Templates",
          },
        ]}
      ></SectionHead>

      {/* products */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>

        {/* product pagination */}
        <div className="py-20 flex flex-wrap justify-center items-center gap-5">
          {/* prev */}
          <CircularButton
            size="4rem"
            bg_color="white"
            hover_bg_color="neutral-default"
            text_color="black"
            text_hover_color="black"
            className="border-2 border-neutral-default"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.308904 5.29402C-0.103093 5.6845 -0.103093 6.31863 0.308904 6.7091L5.58245 11.7071C5.99445 12.0976 6.66353 12.0976 7.07552 11.7071C7.48752 11.3167 7.48752 10.6825 7.07552 10.2921L2.54687 6L7.07223 1.70793C7.48422 1.31745 7.48422 0.683327 7.07223 0.292854C6.66023 -0.0976181 5.99115 -0.0976181 5.57916 0.292854L0.305607 5.2909L0.308904 5.29402Z" />
            </svg>
          </CircularButton>

          {/* paginate number btns */}
          {[1, 2, 3, 4, 5, 6, 7].map((number) => (
            <CircularButton
              key={number}
              size="4rem"
              bg_color="white"
              hover_bg_color="neutral-default"
              text_color="black"
              text_hover_color="black"
              className="border-2 border-neutral-default"
            >
              <span className="text-xl font-bold">{number}</span>
            </CircularButton>
          ))}

          {/* next */}
          <CircularButton
            size="4rem"
            bg_color="white"
            hover_bg_color="neutral-default"
            text_color="black"
            text_hover_color="black"
            className="border-2 border-neutral-default"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.07562 5.29402C7.48761 5.6845 7.48761 6.31863 7.07562 6.7091L1.80207 11.7071C1.39007 12.0976 0.720993 12.0976 0.308997 11.7071C-0.102999 11.3167 -0.102999 10.6825 0.308997 10.2921L4.83766 6L0.312293 1.70793C-0.0997031 1.31745 -0.0997031 0.683327 0.312293 0.292854C0.724289 -0.0976181 1.39337 -0.0976181 1.80537 0.292854L7.07891 5.2909L7.07562 5.29402Z" />
            </svg>
          </CircularButton>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
