"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Related_products from "./Related_products";
import { ProductDetail, ProductDetailVariant } from "../../../typings";
import Tab from "./tab";
import Description from "./Description";
import Additionalinfo from "./Additionalinfo";
import Review from "./Review";
import { useRouter, usePathname } from "next/navigation";
import { UseCartStore } from "@/store/store";
import SingleProductContent from "./SingleProductContent";

type Props = {
  detail: ProductDetail | undefined;

};

const SingleProduct_details: React.FC<Props> = ({ detail, }) => {

  const [assets, setAssets] = useState<string[]>([]);
  // const [productDetailData, setProductDetailData] = useState({ ...detail });
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedprice, setSelectedPrice] = useState(0);
  const [selectSize, setSelectSize] = useState<string[]>([]);
  const [shouldRerender, setShouldRerender] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();

  const productDetailData = { ...detail };
  const { cart, addToCart, getAllCart } = UseCartStore((state) => ({
    cart: state.cart,
    addToCart: state.addToCart,
    getAllCart: state.getAllCart,
  }));

  const ArrayVariant = productDetailData.product_variant;
  const handleColorButtonClick = (data: ProductDetailVariant) => {
    setSelectedImage(data.preview_image);
    setAssets(data.assets);
    setSelectedPrice(data.price);
    if (ArrayVariant) {
      const matchingSizes: string[] = ArrayVariant.filter(
        (item) => item.color === data.color
      ).map((item) => item.size);
      setSelectSize(matchingSizes.length > 0 ? matchingSizes : []);
    }
  };

  const handleAddToCart = async (id: number, size: any) => {
    try {
      const accessToken = localStorage.getItem("access_token");


      if (!accessToken) {
        router.push(`/login/?callback=${pathname}`);
        return;
      }

      if (ArrayVariant && ArrayVariant.length > 0) {
        const productVariant = ArrayVariant.find((data) => data.id === id);

        if (productVariant) {
          const productToAddToCart = {
            product_variant: productVariant.id || 0,
            quantity: 1,
          };
          const data = await addToCart(productToAddToCart);

          toast({
            title: `${productDetailData.name}`,
            description: ` ${productDetailData?.short_description}`,
          });
          setShouldRerender(!shouldRerender);
        }
      } else {
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const [activeTab, setActiveTab] = useState("Description");

  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };
  useEffect(() => { }, [shouldRerender, addToCart, cart]);


  return (
    <div className="justify-center">
      <SingleProductContent detail={detail} handlecart={handleAddToCart} />

      <div className="tabs-container px-6  mx-auto my-8 xl:max-w-[1100px] mt-10">
        <div className="tabs flex flex-wrap gap-12 sm:lg:gap-x-[150px] snap-x scroll-auto cursor-pointer underline ">
          <div className="flex-item snap-center ">
            <Tab
              label="Description"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
          </div>
          <div className="flex-item snap-center ">
            <Tab
              label="Additional Info"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
          </div>
          <div className="flex-item snap-center ">
            <Tab
              label="Review"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
          </div>
        </div>
        <div className="tab-contents ">
          {activeTab === "Description" && (
            <Description data={productDetailData.description || undefined} />
          )}
          {activeTab === "Additional Info" && (
            <Additionalinfo
              data={productDetailData.additional_information || undefined}
            />
          )}
          {activeTab === "Review" && <Review data={productDetailData.id} />}
        </div>
      </div>

      <Related_products category={detail?.category} product_id={detail?.id} />
    </div>
  );
};

export default SingleProduct_details;
