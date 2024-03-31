import { getApis } from "@/api/client";
import { useQuery } from "@tanstack/react-query"
 
import { Filters } from "../../typings";


const useProducts = (filters:Filters) => {
    // console.log(filters, 'filters in use products')
    return useQuery({ queryKey: ['products', filters], queryFn: () => getApis.getProducts(filters), staleTime:5*60*1000} )

}


export default useProducts