import { getApis } from "@/api/client"
import { useQuery } from "@tanstack/react-query"



const useNavigation = () => {
    return useQuery({ queryKey: ['navigation'], queryFn: () => getApis.getNavigations()} )
}

export default useNavigation