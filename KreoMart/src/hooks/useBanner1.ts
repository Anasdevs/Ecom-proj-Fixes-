import { getApis } from "@/api/client"
import { useQuery } from "@tanstack/react-query"



const useBanner1 = () => {
    return useQuery({ queryKey: ['banners'], queryFn: () => getApis.getBanner1()} )
}
export default useBanner1