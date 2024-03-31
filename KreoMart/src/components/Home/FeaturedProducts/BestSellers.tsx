import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";

import { ProductCard } from "@/components/Products";
import { getApis } from "@/api/client";
import { BestSeller } from "../../../../typings";
interface ProductCardProps {
  product: BestSeller | null;
}
const BestSellers: React.FC<ProductCardProps> = ({ product }) => {
  const [products, setProducts] = useState<BestSeller | null>(product);

  return (
    <>
      <div className="md:hidden">
        <label className="block text-[#030822] py-2 text-xl  my-4">
          BestSeller
        </label>
        <Carousel
          withIndicators
          // height={200}
          slideSize="50%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={1}
        >
          {products?.results?.map((ele, index) => {
            // console.log(ele);

            return (
              <Carousel.Slide key={index}>
                <ProductCard product={ele} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </div>

      <div className="hidden sm:block">
        <h3 className="sm:hidden  font-bold my-4">Best Seller</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-start  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.results?.map((product, id) => (
            <div key={id} className="mt-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BestSellers;
