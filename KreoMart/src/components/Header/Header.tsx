import React from "react";
import { MobileNavigation, DesktopNavigations } from "./Navigations";
import Search from "./components/Search";
import Link from "next/link";
import Icon from "../shared/Icon";
import route from "@/routes";
import UserDropdown from "./components/UserDropdown";
import CartDropdown from "./components/CartDropdown";
import GetApis from "@/api/server";

const Header = async () => {
  const navigationMenus = await GetApis.getNavigations();

  const categories = await GetApis.getCategories();

  console.log(categories, "categories");
  console.log(navigationMenus, "navigationMenus");

  if (!navigationMenus || !categories) {
    return <></>;
  }

  return (
    <header className="bg-background sticky top-0 left-0 right-0  z-10 pb-2 sm:pb-0">
      <div className=" px-8 flex flex-wrap md:flex-nowrap items-center justify-between  sm:gap-4 max-w-screen-3xl mx-auto">
        <div className="flex gap-2 ">
          {/* mobile navigations */}
          <MobileNavigation
            navMenus={navigationMenus}
            categories={categories}
          />
          {/* logo  */}
          <Logo className=" py-4 " />
        </div>
        {/* navigation  */}
        <div className="hidden lg:block flex-1 ml-12 ">
          <DesktopNavigations
            navMenus={navigationMenus}
            categories={categories}
          />
        </div>
        {/* search  */}
        <Search className="order-2 sm:flex-1 lg:flex-initial basis-full sm:order-none sm:basis-auto py-2 sm:py-4 border border-x-1 sm:border-y-0 border-y-1 border-gray-400  " />
        <div className="flex gap-4">
          {/* whishlist */}
          {/* <Wishlist /> */}
          {/* User dropdown */}

          <UserDropdown />
          {/* cart  */}
          <CartDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={"flex items-center" + " " + className}>
      <div>
        <svg
          width="113"
          height="25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 12.2664V.1709h7.3821L0 12.2664Z" fill="#11DCAD" />
          <path
            d="M0 23.5419 14.2858.1709h6.972L15.2427 10.353 23.24 23.5419h-6.9036l-4.7847-7.4487-4.5113 7.4487H0Z"
            fill="#020044"
          />
          <g fill="#020044">
            <path d="M32.4408 12.557v3.3185h-1.1214c-2.0139 0-3.2269.8925-3.2269 3.1582V24h-3.5244V12.5799h3.3184l.1831 1.6935c.4806-1.1214 1.4876-1.8766 3.021-1.8766.4119 0 .8696.0458 1.3502.1602ZM39.1974 24.2975c-3.4558 0-5.9275-2.5174-5.9275-6.0419 0-3.5702 2.4031-6.0648 5.8588-6.0648 3.5932 0 5.836 2.3573 5.836 6.0877v.8925l-8.3076.0458c.2059 1.5105 1.0527 2.22 2.609 2.22 1.3274 0 2.2657-.4806 2.5174-1.3045h3.227c-.412 2.5403-2.6777 4.1652-5.8131 4.1652Zm-.0458-9.2459c-1.396 0-2.1741.6179-2.4488 1.991h4.7603c0-1.2129-.8925-1.991-2.3115-1.991ZM46.4339 18.2556c0-3.616 2.6547-6.0419 6.3165-6.0419 3.6389 0 6.2936 2.4259 6.2936 6.0419s-2.6547 6.019-6.2936 6.019c-3.6618 0-6.3165-2.403-6.3165-6.019Zm3.5473-.0229c0 1.7394 1.1214 2.8837 2.7692 2.8837 1.6249 0 2.7463-1.1443 2.7463-2.8837 0-1.7164-1.1214-2.8607-2.7463-2.8607-1.6478 0-2.7692 1.1443-2.7692 2.8607ZM64.6118 24h-3.5245V12.557h3.2956l.2289 1.1901c.5721-.801 1.6935-1.5563 3.3413-1.5563 1.7165 0 2.815.801 3.4787 2.014.5951-1.213 1.9453-2.014 3.5931-2.014 2.9523 0 4.417 1.7165 4.417 4.3255V24h-3.5244v-6.4996c0-1.4418-.7553-2.1284-1.8767-2.1284-1.007 0-2.0139.5492-2.0139 2.4945V24h-3.5245v-6.4996c0-1.419-.7323-2.1055-1.8538-2.1055-1.0069 0-2.0368.5492-2.0368 2.4716V24ZM85.4177 24.2975c-2.4259 0-3.9364-1.4189-3.9364-3.6617 0-2.1056 1.4876-3.4101 4.2339-3.616l3.204-.2518v-.1831c0-1.1214-.6865-1.7164-1.9453-1.7164-1.4876 0-2.2886.5721-2.2886 1.602h-2.9294c0-2.5861 2.1284-4.2797 5.4011-4.2797 3.3185 0 5.1951 1.8538 5.1951 5.1265V24h-3.1125l-.2288-1.5105c-.3662 1.0528-1.8767 1.808-3.5931 1.808Zm1.2358-2.609c1.3503 0 2.2886-.6637 2.2886-1.9682v-.6179l-1.7851.1602c-1.5334.1373-2.0826.4806-2.0826 1.2129 0 .8239.5035 1.213 1.5791 1.213ZM102.753 12.557v3.3185h-1.122c-2.0136 0-3.2266.8925-3.2266 3.1582V24H94.88V12.5799h3.3184l.1831 1.6935c.4806-1.1214 1.4876-1.8766 3.0205-1.8766.412 0 .87.0458 1.351.1602ZM109.605 24h-3.524v-8.5136h-2.175V12.557h2.175V9.0097h3.524v3.5473h2.174v2.9294h-2.174V24Z" />
          </g>
        </svg>
      </div>
    </Link>
  );
};

const Wishlist = () => {
  return (
    <div>
      <Link href={route.Wishlist} className="cursor-pointer">
        <Icon name={"Favourite"} size={24} />
      </Link>
    </div>
  );
};
