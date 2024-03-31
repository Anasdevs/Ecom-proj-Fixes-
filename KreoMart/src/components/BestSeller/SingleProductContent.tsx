'use client';

import React, { useEffect, useState } from 'react';
import Icon from '../../../public/assets/Favourite=False.png';
import LikedIcon from '../../../public/assets/Favourite-liked.png';
import Image from 'next/image';
import { ProductDetail } from '../../../typings';
import Stars from './stars';
import { getApis } from '@/api/client';
import axios from 'axios';
import Link from 'next/link';
import ImageEffect from '../shared/ImageMagnifier/Magnify';
import { UseCartStore } from '@/store/store';
import { useRouter } from 'next/navigation';

type Props = {
  detail: ProductDetail | undefined;
  //@ts-ignore
  handlecart: (colour: number | any, size: string | any) => void;
};

const filterData = (array: any[]) =>
  array.filter((data: any) => data != undefined || data != null);

const SingleProductContent: React.FC<Props> = ({ detail, handlecart }) => {
  const router = useRouter();

  const [assets, setAssets] = useState<string[]>([]);
  const [productDetailData, setProductDetailData] = useState<
    ProductDetail | undefined
  >(detail);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [selectSize, setSelectSize] = useState<string[]>([]);
  const [id, setId] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [size, setSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingcount, setRatingCount] = useState<number>(0);
  const [reviewcount, setReviewCount] = useState<number>();
  const [addedCart, setAddedCart] = useState<boolean>(false);

  const [Liked, setLiked] = useState(false);
  const { cart } = UseCartStore((state) => ({
    cart: state.cart,
  }));

  const ArrayVariant = productDetailData?.product_variant;
  useEffect(() => {
    if (productDetailData?.product_variant) {
      const initialVariant = productDetailData.product_variant[0];
      setAssets(initialVariant?.assets);
      setSelectedImage(initialVariant?.preview_image);
      setSelectedPrice(initialVariant?.price);
      setId(initialVariant?.id);
      setQuantity(initialVariant?.quantity);

      setSize(initialVariant?.size);
      setSelectedColor(initialVariant?.color?.code);

      if (selectSize.length > 0) {
        setSelectSize(selectSize);
      } else {
        updateSizes(productDetailData?.product_variant[0]?.color?.code);
      }

      setDiscountPrice(initialVariant.discount_price);

      setDiscountPrice(initialVariant.discount_price);
    }
  }, [productDetailData?.product_variant]);

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const response = await getApis.getAllReview(productDetailData?.id);
        if (response) {
          setReviewCount(response?.count);
          setRatingCount(response?.results[0]?.product.ratings.no_of_rating);
          setAverageRating(
            response?.results[0]?.product.ratings.average_rating
          );
        }
      } catch (error) {
        console.error('Error fetching rating data', error);
      }
    };

    fetchRatingData();
  }, [productDetailData?.id]);

  useEffect(() => {
    const storedSessionJSON = window?.localStorage?.getItem('access_token');
    if (storedSessionJSON) {
      const itemExist = cart.results.cart_data.find(
        (data) => data.product_variant.id == id
      );
      if (itemExist) {
        setAddedCart(true);
      } else {
        setAddedCart(false);
      }
    }
  }, [id]);

  const handleColorButtonClick = async (colorCode: string) => {
    if (ArrayVariant) {
      const matchingVariant = ArrayVariant.find(
        (item) => item?.color?.code === colorCode
      );

      if (matchingVariant) {
        setId(matchingVariant?.id);
        setQuantity(matchingVariant?.quantity);

        setSelectedImage(matchingVariant.preview_image);
        setProductDetailData({
          ...productDetailData,
          preview_image: matchingVariant.preview_image,
          // Preserve all variants for different colors
          product_variant: ArrayVariant,
        });
        setAssets(matchingVariant.assets);
        setSelectedColor(colorCode);
        updateSizes(colorCode);
        setSelectedPrice(matchingVariant.price);
        setDiscountPrice(matchingVariant.discount_price);
      }
    }
  };

  const updateSizes = (color: string) => {
    const matchingSizes =
      ArrayVariant?.filter((item) => item?.color?.code === color)?.map(
        (item) => item.size
      ) || [];

    setSelectSize(filterData(matchingSizes));
  };

  const handleSizeButtonClick = (size: string) => {
    setSize(size);
    if (ArrayVariant && selectedColor) {
      const matchingVariant = ArrayVariant.find(
        (item) => item?.color?.code === selectedColor && item?.size === size
      );

      if (matchingVariant) {
        // Update states based on the matchingVariant directly
        setSelectedPrice(matchingVariant.price);
        setDiscountPrice(matchingVariant.discount_price);
        setId(matchingVariant?.id);
        setQuantity(matchingVariant?.quantity);
      }
    }
  };

  // const handleAddToWishlist = async () => {
  //   try {
  //     // Toggle the liked state.
  //     setLiked(!Liked);

  //     // If the item is already in the wishlist, remove it.
  //     if (Liked) {
  //       const token = localStorage.getItem("access_token");

  //       console.log("Token:", token);

  //       const response = await axios({
  //         method: "delete",
  //         url: `https://api.kreomart.com/api/users/favourite/products/remove/${productDetailData?.id}/`,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response) {
  //         console.log("Remove response: ", response);
  //       } else {
  //         console.log("Falsy response from removeFromFav API.");
  //       }
  //     } else {
  //       // Otherwise, add it.
  //       const token = localStorage.getItem("access_token");

  //       console.log("Token:", token);

  //       const response = await axios({
  //         method: "post",
  //         url: `https://api.kreomart.com/api/users/add/new/favourite/products/${productDetailData?.id}/`,

  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response) {
  //         console.log("Fav response: ", response);
  //       } else {
  //         console.log("Falsy response from addToFav API.");
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Error in handleAddToWishlist: ", error);
  //   }
  // };

  const [activeTab, setActiveTab] = useState('Description');

  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };
  const isSingleProductContent = true;

  const colourList = () => {
    return ArrayVariant
      ? filterData(
        Array.from(new Set(ArrayVariant.map((item) => item?.color?.code)))
      )
      : [];
  };

  return (
    <div>
      <div className="mx-auto my-8 xl:max-w-[1100px] flex flex-col md:flex-row justify-center ">
        <div className=" flex flex-col md:flex-row lg:w-1/2 justify-center">
          <div className="hidden md:block flex-row md:flex-col p-2 mr-4">
            {assets.map((item, id) => (
              <Link
                className="w-full flex justify-center cursor-pointer"
                key={id}
                href={''}
              >
                <Image
                  src={`https://kreomart.s3.ap-south-1.amazonaws.com/static/${item}`}
                  alt="shoes"
                  onClick={() =>
                    setSelectedImage(
                      `https://kreomart.s3.ap-south-1.amazonaws.com/static/${item}`
                    )
                  }
                  width={80}
                  height={80}
                  className="mb-4 justify-center"
                />
              </Link>
            ))}
          </div>
          {isSingleProductContent && (
            <div className="w-full mb-3 px-6 md:px-0 flex lg:justify-start justify-center">
              <div className="aspect-w-4 aspect-h-6 overflow-hidden cursor-pointer max-h-[555px] ">
                <Image
                  className="w-full  h-full"
                  src={
                    selectedImage ||
                    productDetailData?.product_variant[0].preview_image ||
                    ''
                  }
                  alt={`${selectedImage || productDetailData?.preview_image}`}
                  width={400}
                  height={610}
                />
                {/* <ImageEffect
                  previewImage={
                    selectedImage ||
                    productDetailData?.product_variant[0].preview_image ||
                    ""
                  }
                  height={610}
                  width={400}
                  alt={`${selectedImage || productDetailData?.preview_image}`}
                  className="w-full object-cover md:max-h-[700px] h-auto"
                /> */}
              </div>
            </div>
          )}
          <div className="md:hidden flex gap-4 p-2 mx-6">
            {assets.map((item, id) => (
              <div className=" flex justify-start" key={id}>
                <Image
                  src={`https://kreomart.s3.ap-south-1.amazonaws.com/static/${item}`}
                  alt="shoes"
                  onClick={() =>
                    setSelectedImage(
                      `https://kreomart.s3.ap-south-1.amazonaws.com/static/${item}`
                    )
                  }
                  width={60}
                  height={60}
                  className="w-26 md:w-20 justify-center"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 lg:w-1/2">
          <div className="">
            <h1 className="text-2xl md:text-3xl text-[#030822] font-medium">
              {productDetailData?.name}
            </h1>
            <p className="text-gray-default text-base font-normal mb-4">
              {productDetailData?.category}
            </p>
            <p
              className="text-lg leading-[130%] text-gray-default overflow-hidden max-h-[40px]"
              dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: productDetailData.short_description,
              }}
            ></p>
            <div className="flex gap-x-[8px]">
              <Stars ratingCount={averageRating} />
              {''}
              <span className="text-base text-gray-600 underline underline-offset-4 underline-gray-500">
                {reviewcount || 0}
              </span>
            </div>
            <div className="border-b-2 space-x-4">
              <span className="text-[20px] md:text-[32px] font-medium pr-2 text-gray-default">
                ₹
                {selectSize
                  ? discountPrice
                  : productDetailData?.product_variant?.[0].discount_price}
              </span>
              <span className="line-through text-[14px] md:text-[16px] font-medium text-gray-500">
                ₹
                {selectSize
                  ? selectedPrice
                  : `₹ ${productDetailData?.product_variant?.[0].price}`}
              </span>
            </div>
          </div>
          <div className="">
            <div className="md:justify-between md:gap-x-8 mt-2 items-center pb-5 border-b-2 border-gray-100 mb-6">
              <div className="mb-[24px]">
                {colourList().length > 0 && (
                  <>
                    <div className="mr-3 mb-[12px] text-[14px] font-medium">
                      Colour
                    </div>
                    <div className="flex gap-1">
                      {/* Filter unique colors */}
                      {colourList().map((uniqueColor, id) => (
                        <div
                          key={id}
                          onClick={() => handleColorButtonClick(uniqueColor)}
                        >
                          <button
                            style={{ backgroundColor: uniqueColor }}
                            className={` h-[32px] w-[32px] focus:outline-none ${selectedColor === uniqueColor
                              ? 'border border-gray-700 p-1'
                              : 'border border-gray-500 p-1'
                              }`}
                          >
                            {' '}
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="items-center">
                {selectSize.length > 0 && (
                  <>
                    <div className="mr-3 mb-[12px] text-base font-medium">
                      Size
                    </div>
                    <div className="flex gap-1 md:gap-2">
                      {selectSize?.map((item, id) => (
                        <button
                          key={id}
                          onClick={() => handleSizeButtonClick(item)}
                          disabled={item === 'Select Size'}
                          type="button"
                          value={item}
                          name="size"
                          id="size"
                          className={`
                          h-auto
                           w-auto
                           p-2 focus:outline-none 
                           border
                          text-center text-base
                           ${item === size
                              ? 'border border-gray-700'
                              : 'border border-gray-600'
                            }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className=" flex gap-6 md:gap-6  text-sm">
            {/* <button
              className="flex items-center justify-center border-2 border-black py-4 px-2  w-full"
              onClick={handleAddToWishlist}
            >
              <div className="mx-2">
                <Image
                  src={Liked ? LikedIcon : Icon}
                  alt="favourite"
                  width={20}
                  height={20}
                />
              </div>
              <div>{Liked ? "Remove from Wishlist" : "Add to Wishlist"}</div>
            </button> */}
            {quantity > 0 ? (
              !addedCart ? (
                <button
                  className="flex items-center justify-center text-white bg-[#020044] py-4 px-6  w-full"
                  onClick={() => handlecart(id, productDetailData)}
                >
                  <div className="mx-2">
                    <Image
                      src="/assets/BagCart.svg"
                      alt="favourite"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>Add To Cart</div>
                </button>
              ) : (
                <button
                  className="flex items-center justify-center text-white bg-[#020044] py-4 px-6  w-full"
                  onClick={() => {
                    router.push('/cart');
                  }}
                >
                  <div className="mx-2">
                    <Image
                      src="/assets/BagCart.svg"
                      alt="favourite"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>Go To Cart</div>
                </button>
              )
            ) : (
              <button className="flex items-center justify-center text-white bg-[#020044] py-4 px-6  w-full">
                <div className="mx-2"></div>
                <div>Out of Stock</div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductContent;
