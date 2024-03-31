import Link from "next/link";
import { CategResult, Category } from "../../../../typings";
import Image from "next/image";
import route from "@/routes";

interface BestCategoryCardProps {
  data: CategResult;
}

const WomenCategoryCard: React.FC<BestCategoryCardProps> = ({ data }) => {
  console.log(data, " Mens BestCategory  data is being displayed!!");

  // Filter categories based on the "Mens" section
  // const mensCategories = data.name === "Mens" ? [data] : [];
  const womenCategories: CategResult[] = [];
  if (data.navigation_header.some((header) => header.name === "Women")) {
    womenCategories.push(data);
  }

  console.log(womenCategories, " Mens BestCategory  data is being displayed!!");

  return (
    <>
      {womenCategories.map((data: any) => (
        <Link
          key={data.id}
          href={{
            pathname: `${route.Products}/Mens/${encodeURIComponent(data.name)}`,
            query: { category: data.name },
          }}
          className="relative block"
        >
          <div className="bg-background p-10 relative flex flex-col flex-1 items-center justify-center gap-8 text-center text-lg text-primary font-semibold shadow-gray-700 hover:shadow-lg transition duration-300">
            <div className="h-[235px] aspect-round flex items-center justify-center box-border gap-[32px]">
              <Image
                className="object-contain w-full h-full"
                src={data.image}
                alt={data.name}
                height={260}
                width={260}
              />
            </div>
            <div className="rounded-sm flex items-center justify-center">
              <Link
                href={route.Products}
                className="relative tracking-[-0.4px] leading-[130%] text-base md:text-xl font-normal inline-block"
              >
                {data.name}
              </Link>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default WomenCategoryCard;
