import { getApis, postApis } from "@/api/client"
import { useQuery } from "@tanstack/react-query"



const UseCartPost = (data:any) => {
    return useQuery({ queryKey: ['addcart'], queryFn: () => postApis.postCartDetail(data)} )
}
export default UseCartPost;