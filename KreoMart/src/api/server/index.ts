import { CategResult, Category, Navigation } from "../../../typings";
const api_root = process.env.NEXT_PUBLIC_API_ROOT 



const GetApis={

    getNavigations:async (): Promise<Navigation | undefined > => {
    
        try {
            const response = await fetch(`${api_root}/navigation/`,{
                cache: 'no-cache',

            });
            if (!response.ok) {
                throw new Error('Failed to fetch navigations');
            }
            const data = await response.json();
            console.log('Navigation API Response:', data); 

            return data 
        } catch (error) {
            // throw new Error('Failed to fetch navigations');
            // if (error instanceof AxiosError) this.handleApiError(error); 
            // You can return a default value, throw a custom error, or handle the error differently
            // throw new Error('Failed to fetch navigations');
        }
    },
    getCategories:async ():Promise<Category | undefined> => {
             
            try {
                const response = await fetch(`${api_root}/categories/`,{
                    cache: 'no-cache',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                console.log('Categories API Response:', data); // Add this log statement
            
                return data;

            } catch (error) {
                // if (error instanceof AxiosError) this.handleApiError(error);
                // You can return a default value, throw a custom error, or handle the error differently
                // throw new Error('Failed to fetch categories');
            }
    }

}


export default GetApis;