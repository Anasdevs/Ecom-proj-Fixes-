"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import Image from "next/image";
import { CategResult, Category, NavResult, Navigation } from "../../../typings";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import route from "@/routes";
import Icon from "../shared/Icon";
import React from "react";

interface ListItemProps {
  image: string;
  navMenu?: NavResult;
  category: CategResult;
  subCategory: {
    id: number;
    name: string;
  }[];
}

interface CategoriesProps {
  navMenu: NavResult;
  menus: Category;
  nav: {
    id: number;
    name: string;
  }[];
  img: string;
}

export const DesktopNavigations = ({
  navMenus,
  categories,
  className,
}: {
  navMenus: Navigation;
  categories: Category;
  className?: string;
}) => {
  return (
    <NavigationMenu className={`${className}`}>
      <NavigationMenuList className=" items-baseline  ">
        {navMenus.results?.map((menu: NavResult, menuIndex: number) => (
          <NavigationMenuItem key={menuIndex} className="">
            <NavigationMenuTrigger className="bg-background  text-base text-gray-default lg:text-xl  flex flex-row items-start justify-start lg:px-8 md:px-0 px-0 ">
              {menu?.name}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="bg-white  w-full">
              <div className="w-full">
                <Categories
                  navMenu={menu}
                  menus={categories}
                  nav={menu.categories}
                  img={menu.image}
                />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const Categories: React.FC<CategoriesProps> = ({
  navMenu,
  menus,
  nav,
  img,
}) => {
  console.log(menus, "menus"); // all categories
  console.log(nav, "nav"); // categories in navigation

  const filteredCategories = menus.results?.filter((category: CategResult) =>
    nav.some((item: { id: number; name: string }) => item.id === category.id)
  );
  // const filteredCategories = menus.results?.filter((category: CategResult) => {
  //   console.log("Nav ID:", typeof nav[0].id, nav[0].id);
  //   console.log("Category ID:", typeof category.id, category.id);
  //   const existsInNav = nav.some(
  //     (item: { id: number; name: string }) =>
  //       String(item.id) === String(category.id)
  //   );
  //   console.log(category.name, "exists in nav:", existsInNav);
  //   return existsInNav;
  // });
  // console.log("All categories in menus:", menus.results);
  // console.log("made up of category in menus:", menus.results);
  // console.log(
  //   "made up of category in menus:",
  //   menus.results?.find((category) => category.id === 7)
  // );
  // console.log(
  //   "made up of category in nav:",
  //   nav.find((item) => item.id === 7)
  // );

  console.log(filteredCategories, "filteredCategories");
  return (
    <div className="bg-white h-fit max-h-screen w-screen overflow-auto max-w-screen-2xl flex gap-6 justify-between items-start p-20  relative m-6">
      <div className="flex gap-28  flex-1 justify-start flex-wrap  text-base text-primary  ">
        {filteredCategories?.map((item: CategResult, index: number) => {
          return (
            <div key={index} className="flex max-w-fit   flex-col gap-2 ">
              {/* <div className="mb-4">
                <Image
                  src={`${item?.image || "/assets/placeholder.png"}`}
                  alt={"wood"}
                  width={262}
                  height={60}
                  className="object-bottom object-cover aspect-video"
                  placeholder="blur"
                  blurDataURL="/assets/placeholder.png"
                />
              </div> */}

              <ListItem
                navMenu={navMenu}
                image={item?.image}
                category={item}
                subCategory={item?.sub_categories}
              />
            </div>
          );
        })}
      </div>

      <Image
        src={`${img || "/assets/placeholder.png"}`}
        alt={"banner"}
        height={280}
        width={259}
        className="object-contain aspect-auto"
        placeholder="blur"
        blurDataURL="/assets/placeholder.png"
      />
    </div>
  );
};

const ListItem: React.FC<ListItemProps> = ({
  navMenu,
  image,
  category,
  subCategory,
}) => {
  console.log(category, "category");

  const showShopAllButton = subCategory && subCategory.length > 6;

  return (
    <div>
      <Link
        href={{
          pathname: `${route.Products}/${navMenu?.name}`,
          query: { category: category.name },
        }}
      >
        <NavigationMenuLink>
          <span className="text-2xl font-medium text-gray-default">
            {category.name}
          </span>
        </NavigationMenuLink>
      </Link>
      {subCategory?.map((item, index) => {
        return (
          <div key={index}>
            <Link
              href={{
                pathname: `${route.Products}/${navMenu?.name}/`,
                query: {
                  category: category.name,
                  sub_category: item.name,
                },
              }}
              prefetch={false}
            >
              <NavigationMenuLink>{item?.name}</NavigationMenuLink>
            </Link>
          </div>
        );
      })}
      {showShopAllButton && (
        <Link
          href={{
            pathname: `${route.Products}/${navMenu?.name}`,
            query: { category: category.name },
          }}
        >
          <NavigationMenuLink>
            <span className="text-lg underline  text-gray-600 font-medium ">
              Shop All
            </span>
          </NavigationMenuLink>
        </Link>
      )}
    </div>
  );
};

// mobile navigation

export const MobileNavigation = ({
  navMenus,
  categories,
}: {
  navMenus: Navigation;
  categories: Category;
}) => {
  const navSheetClose = React.useRef<HTMLButtonElement>(null);

  // create a click event listener for the sheet close button
  const closeNavSheet = () => {
    // click the close button
    navSheetClose.current?.click();
  };

  if (!Array.isArray(navMenus.results)) {
    console.error("navMenus is not an array:", navMenus);
    return null; // or handle the error appropriately
  }

  const MobileCategories: React.FC<CategoriesProps> = ({
    navMenu,
    menus,
    nav,
  }) => {
    const filteredCategories = menus.results?.filter((category: CategResult) =>
      nav.some((item: { id: number; name: string }) => item.id === category.id)
    );
    return (
      <div className=" pr-4 w-full    bg-white">
        <Accordion type="single" collapsible className="w-full ">
          {filteredCategories.map((item: CategResult) => {
            return (
              <AccordionItem
                value={item.name}
                key={item.name}
                className="text-2xl text-gray-default"
              >
                <AccordionTrigger className="text-2xl text-gray-default font-normal ml-8">
                  {item.name}
                </AccordionTrigger>
                <AccordionContent className="text-xl text-gray-default ">
                  <MobileListItem
                    subCategory={item.sub_categories}
                    navMenu={navMenu}
                    image={item.image}
                    category={item}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    );
  };

  const MobileListItem: React.FC<ListItemProps> = ({
    subCategory,
    navMenu,
    category,
  }) => {
    const handleClickdialog = () => {
      return DialogPrimitive.Close;
    };
    return (
      <div>
        <div>
          {subCategory.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className="bg-gray-100 text-xl text-gray-default ml-8 p-2 my-1 shadow-white hover:shadow-lg transition duration-300 cursor-pointer"
                  onClick={handleClickdialog}
                >
                  <SheetClose onClick={closeNavSheet}>
                    <Link
                      href={`${route.Products}/${navMenu?.name}?category=${category.name}&sub_category=${item.name}`}
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="lg:hidden mr-3 w-full items-center">
      <Sheet>
        <SheetTrigger>
          <div className="relative w-12 h-12 mt-3">
            <Icon name={"menu"} size={30} />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-full">
          <div className=" items-center flex justify-between  mb-8">
            <Link href="/" className="relative w-36 min-w-20 h-14  mr-12 flex">
              <Image src={"/assets/logo.svg"} fill={true} alt="kreomart-logo" />
            </Link>
            <SheetClose ref={navSheetClose}>
              <Icon name="Close" size={24} />
            </SheetClose>
          </div>
          <div className="text-2xl text-gray-default">Shop by</div>
          <div className=" mt-5 bg-gray-100 flex flex-col gap-2  ">
            {navMenus.results?.map((menu: NavResult, menuIndex: number) => (
              <div
                className="bg-white border px-4 py-2 text-center cursor-pointer  justify-between"
                key={menuIndex}
              >
                <Sheet>
                  <SheetTrigger className="flex justify-between w-full text-xl items-center   text-primary">
                    <div className="flex-item text-2xl text-gray-default">
                      {" "}
                      {menu.name}
                    </div>
                    <div className="flex-item">
                      <Icon name="ArrowRight" size={24} />
                    </div>
                  </SheetTrigger>
                  <SheetContent side="left" className=" w-full md:w-[500px]">
                    <div className="flex gap-4 h-5xl items-center ">
                      <SheetClose>
                        <Icon name="arrow-left" size={24} />
                      </SheetClose>
                      <div className="text-2xl text-gray-default">
                        {menu.name}
                      </div>
                    </div>
                    <MobileCategories
                      navMenu={menu}
                      menus={categories}
                      nav={menu.categories}
                      img={""}
                    />
                  </SheetContent>
                </Sheet>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
