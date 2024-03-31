'use client'
import { Key, useEffect, useRef, useState } from "react";
import { SearchResult } from "./SearchResult";
interface ResultData{
    id: number,
    name : string
  }
interface Props{
    results: ResultData[];
}

const SearchResultsList: React.FC<Props> = ({ results}) => {
    const resultsListRef = useRef<HTMLDivElement | null>(null);;
    const [isResultsVisible, setResultsVisible] = useState(true);

    useEffect(() => {
      // Event listener to close results when clicking outside
      const handleOutsideClick = (e: MouseEvent) => {
        if (resultsListRef.current && !resultsListRef.current.contains(e.target as Node)) {
          setResultsVisible(false);
        }
      };
  
      // Add the event listener
      document.addEventListener("mousedown", handleOutsideClick);
  
      return () => {
        // Remove the event listener when component unmounts
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);
  
    const toggleResults = () => {
      setResultsVisible(!isResultsVisible);
    };
  return (
    <div >
      {isResultsVisible && (
        <div ref={resultsListRef} className="w-full bg-white shadow-md border p-1 mt-1 max-h-[300px] overflow-y-auto">
          {results.map((result: { name: string }, id: Key | null | undefined) => {
            return <SearchResult result={result.name} key={id} />;
          })}
        </div>
      )}
    </div>
  );
};
export default SearchResultsList;
