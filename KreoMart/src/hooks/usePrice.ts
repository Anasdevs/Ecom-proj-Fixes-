import { getApis } from "@/api/client"
import { useQuery } from "@tanstack/react-query"



const usePrice  = () => {
    return useQuery({ queryKey: ['min_price','max_price'], queryFn: () => getApis.getCategories()} )
}

export default usePrice