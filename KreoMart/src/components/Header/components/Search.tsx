"use client";
import SearchBar from "@/components/shared/SearchBar/SearchBar";
import SearchResultsList from "@/components/shared/SearchBar/SearchResultList";
import { useState } from "react";

interface Props {
  className?: string;
}

const Search: React.FC<Props> = ({ className }) => {
  const [results, setResults] = useState([]);
  return (
    <div className={`relative bg-white sm:bg-background ${className}`}>
      <div className="px-4">
        <SearchBar
          data={null}
          error={null}
          isLoading={false}
          setResults={function (newResults: any): void {}}
        />
      </div>
      <div className="absolute top-[100%] left-0 right-0 z-2 onfocus">
        {results && results.length > 0 && (
          <SearchResultsList results={results} />
        )}
      </div>
    </div>
  );
};

export default Search;
