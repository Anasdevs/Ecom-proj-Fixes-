import { getApis } from "@/api/client"
import { useQuery } from "@tanstack/react-query"



const useCategories = () => {
    return useQuery({ queryKey: ['categories'], queryFn: () => getApis.getCategories()} )
}

export default useCategories