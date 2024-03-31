"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Icon from "../Icon";
import { PRODUCT } from "../../../../typings";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

interface SearchBarState {
  data: PRODUCT | null;
  error: Error | null;
  isLoading: boolean;
  setResults: (newResults: any) => void;
}

function SearchResult({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: PRODUCT;
}) {
  return (
    <div
      className="flex flex-col px-4 py-2
        w-full bg-gray-500 divide-y divide-gray-300"
    >
      {isLoading && <div className="text-gray-default">Loading...</div>}
      {data &&
        data?.results?.product_data.map((item) => (
          <div key={item.id} className="text-gray-100 py-2">
            {item.name}
          </div>
        ))}
    </div>
  );
}

const SearchBar: React.FC<SearchBarState> = ({ data, error, isLoading }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300); // Adjust the delay as needed

  const {
    data: queryData,
    error: queryError,
    isLoading: queryIsLoading,
  } = useQuery<SearchBarState, Error>({
    queryKey: ["search", debouncedSearch],
    queryFn: async () => {
      console.log("Before fetching data");

      try {
        const response = await fetch(
          `https://api.kreomart.com/api/products/?name=${decodeURIComponent(
            debouncedSearch
          )}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be caught by react-query
      }
    },
  });

  const handleSearch = () => {
    //  navigate to products page with search query
    router.replace(`/products?search=${decodeURIComponent(debouncedSearch)}`);
  };

  console.log(queryData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = data?.results ?? [];

  return (
    <div className="md:w-full h-16 flex items-center mr-2">
      <button onClick={handleSearch}>
        <Icon name={"search"} size={24} className="" />
      </button>
      <input
        type="search"
        placeholder="What are you Looking for"
        className="w-full lg:w-96 h-full bg-transparent sm:bg-background ml-2 focus:outline-none text-lg md:text-xl px-4"
        value={search}
        onChange={handleInputChange}
      />
      {/* {data?.results &&
        data?.results.product_data &&
        data?.results.product_data.length > 0 && (
          <SearchResult
            isLoading={isLoading}
            data={data?.results.product_data as PRODUCT}
          />
        )} */}
      {data && <SearchResult isLoading={isLoading} data={data as PRODUCT} />}
    </div>
  );
};

export default SearchBar;
