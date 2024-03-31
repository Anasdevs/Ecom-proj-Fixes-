import Event from "@/components/Home/OfferSection/OfferSection";
import { Feature } from "@/components/FeatureSection/Feature";
import { FeaturedProducts } from "@/components/Home/FeaturedProducts/FeaturedProducts";

import { Newsletter } from "@/components/Home/ContactSection/Contact";
import { HeroSection } from "@/components/Home";
import BannerOne from "@/components/Home/Banner/BannerOne";
import GetApis from "@/api/server";
import { Categories } from "@/components/Home/CategorySection/Category";
import MensCategory from "@/components/Home/MensCategorySections/MensCategory";
import WomenCategory from "@/components/Home/WomensCategorySection/WomenCategory";

const Home = async () => {
  const categories = await GetApis.getCategories();

  console.log(categories, "categories");

  return (
    <>
      <div className="mx-auto max-w-screen-3xl">
        <HeroSection />
      </div>
      <div className="px-8 mx-auto max-w-screen-3xl">
        <Categories data={categories} />
        <BannerOne />
        <FeaturedProducts />
        <Newsletter />
        <MensCategory data={categories} />
        <WomenCategory data={categories} />
        {/* <Event /> */}
        <Feature />
      </div>
    </>
  );
};

export default Home;
