import { getApis } from "@/api/client"
import { useQuery } from "@tanstack/react-query"



const useBanners = () => {
    return useQuery({ queryKey: ['banners'], queryFn: () => getApis.getHeroBanners()} )
}
export default useBanners