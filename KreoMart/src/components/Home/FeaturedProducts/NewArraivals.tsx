import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import ProductCard from "../../Products/ProductCard";
import { NewArrivals } from "../../../../typings";
interface ProductCardProps {
  product: NewArrivals | null;
}
const NewArraivals: React.FC<ProductCardProps> = ({ product }) => {
  const [products, setProducts] = useState<NewArrivals | null>(product);

  return (
    <>
      <div className="md:hidden">
        <label className=" block text-[#030822] text-xl py-2  my-4">
          NewArrivals
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
          {products?.results.map((ele, index) => {
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
        <h3 className="sm:hidden font-bold my-4">New Arrivals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-start  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.results.map((product, index) => {
            return (
              <div key={index}>
                <ProductCard key={index} product={product} />;
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NewArraivals;
