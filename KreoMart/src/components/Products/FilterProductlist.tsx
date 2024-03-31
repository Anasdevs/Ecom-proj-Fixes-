"use client";
import React, { useState } from "react";

import { PriceOptions, NavResult, CategResult } from "../../../typings";
import useNavigation from "@/hooks/useNavigation";
import useCategories from "@/hooks/useCategories";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { RemoveFormatting } from "lucide-react";

interface Filterdata {
  navigation_header?: string;
  cateory?: string[];
  subCategory?: string[];
  name?: string;
  colors?: string[];
  sizes?: string;
  priceRange?: PriceOptions;
  product_data: {
    categories_data: {
      colors_and_sizes: {
        all_colors: { id: number; name: string; code: string }[];
        all_sizes: { id: number; name: string }[];
      }[];
      navigation_header: { id: number; name: string }[];
      sub_categories: { id: number; name: string }[];
    }[];
    product_data: Product[];
  };
}

interface Product {
  id: number;
  slug: string;
  name: string;
  ratings: {
    arverage_rating: number | null;
    rating_count: number;
  };
  short_description: string;
  description: string;
  preview_image: string;
  category: string;
  product_variant: ProductVariant[];
}

interface ProductVariant {
  id: number;
  color: {
    name: string;
    code: string;
  };
  size: string;
  price: number;
  discount_price: number;
  assets: string[];
  quantity: number;
  preview_image: string;
}
interface FilterProductListProps {
  filters?: Filterdata;
}

const PriceOptions = [
  { min: 0, max: 500 },
  { min: 500, max: 1000 },
  { min: 1000, max: 1500 },
];

const FilterProductlist: React.FC<FilterProductListProps> = ({ filters }) => {
  const router = useRouter();
  const navigationQuery = useNavigation();
  const categoriesQuery = useCategories();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (navigationQuery.isLoading || categoriesQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (navigationQuery.isError || categoriesQuery.isError) {
    return <div>Error...</div>;
  }

  const navigation_header_path = decodeURIComponent(
    filters?.navigation_header as string
  );

  const nav = navigationQuery?.data?.results.filter((nav: NavResult) => {
    if (nav.name == navigation_header_path || "") {
      console.log("* nav Categories: ", nav.categories);
      return nav.categories;
    } else {
      console.log("Error in nav", Error);
    }
  });

  console.log(nav, "nav");

  // const cameThroughNavigation = Boolean(filters?.navigation_header);

  // // Get the main navigation options if the user didn't come through navigation
  // const mainNavigationOptions = navigationQuery?.data?.results || [];

  // // Get the selected navigation options
  // const selectedNavOptions = cameThroughNavigation
  //   ? nav && nav[0]?.categories
  //   : mainNavigationOptions;

  let categories: any[] = [];
  if (navigation_header_path != "undefined") {
    // @ts-ignore
    categories = categoriesQuery?.data?.results?.filter((item: CategResult) => {
      return (
        nav && nav[0]?.categories.some((navItem: any) => navItem.id === item.id)
      );
    });
  } else {
    // @ts-ignore
    categories = filters?.categories_data;
  }
  console.log("categories ", categories);

  let subCategoris: any = [];

  if (searchParams.getAll("category").length > 0) {
    subCategoris = categories
      ?.filter((item: CategResult) =>
        searchParams.getAll("category").includes(item.name)
      )
      .reduce(
        (arr: { name: string; id: number }[], item: CategResult) =>
          // @ts-ignore
          (arr = [...arr, ...(item?.sub_categories || item?.subcategory_set)]),
        []
      );
  } else {
    subCategoris = categories?.reduce(
      (arr: { name: string; id: number }[], item: CategResult) =>
        // @ts-ignore
        (arr = [...arr, ...(item?.sub_categories || item?.subcategory_set)]),
      []
    );
  }

  console.log("subCategoris ", subCategoris);

  // Price Range
  const handlePriceFilter = (minPrice: number, maxPrice: number) => {
    console.log("Handling price filter", minPrice, maxPrice);

    const newSearchParams = new URLSearchParams();

    // Add existing parameters to the new URLSearchParams
    searchParams.forEach((value, key) => {
      newSearchParams.append(key, value);
    });

    // Remove existing price parameters
    newSearchParams.delete("min_price");
    newSearchParams.delete("max_price");

    // Add new price parameters
    newSearchParams.set("min_price", minPrice.toString());
    newSearchParams.set("max_price", maxPrice.toString());

    console.log("New Search Params:", newSearchParams.toString());

    // Replace the current URL with the updated parameters
    router.replace(`${pathname}?${newSearchParams}`);
  };

  const handleClearFilter = () => {
    router.push("/products");
  };

  console.log(subCategoris, "subCategories");
  console.log(categories, "categories");
  console.log(navigationQuery.data, "navigationQuery.data");
  console.log(categoriesQuery.data?.results, "categoriesQuery.data");
  console.log(filters?.navigation_header, "filters?.navigation_header");
  console.log("Filters:", filters);
  // const handleClose = () => {
  // toggleFilter();
  // };

  return (
    <div className=" p-4 rounded-none text-lg mx-8 ">
      <div className="justify-center">
        <div className=" mb-2 flex justify-between">
          <h3 className="text-lg font-semibold ">Filter</h3>
        </div>

        <fieldset className="mb-4">
          <label className="block font-semibold">Categories</label>
          {categories?.map((item: CategResult, i) => (
            <div key={i}>
              <input
                className=" w-7 h-7 ring-0  accent-secondary-900 rounded  mr-4"
                type="checkbox"
                checked={searchParams.getAll("category").includes(item.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    const cur = new URLSearchParams(
                      Array.from(searchParams.entries())
                    );
                    if (cur.getAll("category").includes(item.name)) {
                      return;
                    }
                    cur.append("category", item.name);
                    router.push(`${pathname}?${cur}`);
                  } else {
                    const cur = new URLSearchParams(
                      Array.from(searchParams.entries())
                    );
                    const cg = cur.getAll("category");
                    cur.delete("category");
                    cg.filter((name) => name !== item.name).map((name) => {
                      cur.append("category", name);
                    });
                    router.push(`${pathname}?${cur}`);
                  }
                }}
              />
              <label className="text-lg">{item.name}</label>
            </div>
          ))}
        </fieldset>
        <fieldset className="mb-4">
          <label className="block font-semibold">Sub Categories</label>
          {subCategoris?.map(
            (item: { name: string; id: number }, index: number) => (
              <div key={index} className="items-baseline">
                <input
                  type="checkbox"
                  className="w-7 h-7 accent-secondary-900 rounded-none mr-4  "
                  checked={searchParams
                    .getAll("sub_category")
                    .includes(item.name)}
                  onChange={(e) => {
                    console.log(e.target.checked, "e.target.checked");
                    if (e.target.checked) {
                      const cur = new URLSearchParams(
                        Array.from(searchParams.entries())
                      );
                      if (cur.getAll("sub_category").includes(item.name)) {
                        return;
                      }
                      cur.append("sub_category", item.name);
                      router.push(`${pathname}?${cur}`);
                    } else {
                      console.log("else");
                      const cur = new URLSearchParams(
                        Array.from(searchParams.entries())
                      );
                      const sc = cur.getAll("sub_category");
                      cur.delete("sub_category");
                      sc.filter((name) => name !== item.name).map((name) => {
                        cur.append("sub_category", name);
                      });

                      router.push(`${pathname}?${cur}`);
                    }
                  }}
                />
                <label className="text-lg ">{item.name}</label>
              </div>
            )
          )}
        </fieldset>
        {/* Color */}
        {filters?.product_data.categories_data[0].colors_and_sizes[0]
          .all_colors && (
          <fieldset className="mb-4">
            <label className="block font-semibold">Colour</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              {filters?.product_data?.categories_data[0].colors_and_sizes[0].all_colors?.map(
                (color, index: React.Key | null | undefined) => {
                  const isColorSelected = searchParams
                    .getAll("color")
                    .includes(color.name);
                  const isSubCategoryColor = subCategoris?.some(
                    //@ts-ignore
                    (subCategory) => subCategory.name === color.name
                  );

                  return (
                    <div
                      key={index}
                      style={{
                        border:
                          isColorSelected || isSubCategoryColor
                            ? "1px solid"
                            : "none",
                        padding:
                          isColorSelected || isSubCategoryColor
                            ? "1px"
                            : "none",
                        width: "fit-content",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        key={index}
                        className={`mx-1 w-[32px] h-[32px] focus:outline-none`}
                        onClick={() => {
                          if (!isColorSelected) {
                            const cur = new URLSearchParams(
                              Array.from(searchParams.entries())
                            );
                            if (cur.getAll("color").includes(color.name)) {
                              return;
                            }
                            cur.append("color", color.name);
                            router.push(`${pathname}?${cur}`);
                          } else {
                            console.log("else");
                            const cur = new URLSearchParams(
                              Array.from(searchParams.entries())
                            );
                            const sc = cur.getAll("color");
                            cur.delete("color");
                            sc.filter((name) => name !== color.name).map(
                              (name) => {
                                cur.append("color", name);
                              }
                            );

                            router.push(`${pathname}?${cur}`);
                          }
                        }}
                        style={{
                          backgroundColor: color.code, // Replace "defaultColorCode" with your actual default color code
                        }}
                      ></button>
                    </div>
                  );
                }
              )}
            </div>
          </fieldset>
        )}

        {/* Size */}
        {filters?.product_data?.categories_data[0].colors_and_sizes[0]
          .all_sizes && (
          <div className="mb-4">
            <label className="block font-semibold mb-2">Size</label>
            <div className="flex gap-1 md:gap-2 flex-wrap">
              {filters?.product_data?.categories_data[0].colors_and_sizes[0].all_sizes?.map(
                (data, index: React.Key | null | undefined) => {
                  const isColorSelected = searchParams
                    .getAll("size")
                    .includes(data.name);
                  const isSubCategoryColor = subCategoris?.some(
                    //@ts-ignore
                    (subCategory) => subCategory.name === data.name
                  );

                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-center   border-[1px] ${
                        isColorSelected || isSubCategoryColor
                          ? "border-gray-700"
                          : "border-gray-600"
                      } text-center cursor-pointer p-[7px]`}
                      onClick={() => {
                        if (!isColorSelected) {
                          const cur = new URLSearchParams(
                            Array.from(searchParams.entries())
                          );
                          if (cur.getAll("size").includes(data.name)) {
                            return;
                          }
                          cur.append("size", data.name);
                          router.push(`${pathname}?${cur}`);
                        } else {
                          const cur = new URLSearchParams(
                            Array.from(searchParams.entries())
                          );
                          const sc = cur.getAll("size");
                          cur.delete("size");
                          sc.filter((name) => name !== data.name).map(
                            (name) => {
                              cur.append("size", name);
                            }
                          );
                          router.push(`${pathname}?${cur}`);
                        }
                      }}
                    >
                      {data.name.toUpperCase()}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <label className="block font-semibold">Price</label>
          {PriceOptions.map((range, index) => {
            let min = searchParams.get("min_price") || 0;
            let max = searchParams.get("max_price") || 0;

            console.log("Min :", min, range.min);
            console.log("Max :", max, range.max);

            return (
              <div key={index}>
                <input
                  className="w-7 h-7 accent-secondary-900 rounded-none mr-4 "
                  type="checkbox"
                  checked={+min === range.min && +max === range.max}
                  onChange={() => handlePriceFilter(range.min, range.max)}
                />
                <label>{`${range.min}-${range.max}`}</label>
              </div>
            );
          })}
        </div>
        <div className=" mb-4 mt-4 justify-start">
          <button
            onClick={() => handleClearFilter()}
            className="bg-blue-500 border border-black text-black  py-2 px-4 rounded-md items-start"
          >
            Clear Filter{" "}
            <span>({filters?.product_data?.product_data?.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterProductlist;
