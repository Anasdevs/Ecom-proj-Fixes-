import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { getApis, postApis, deleteApis, updateApis } from "@/api/client";
import {
  AddAddress,
  CartDetail,
  AddressFormData,
  GetAddress,
  PostCartData,
  ResetData,
  MyOrder,
  MyOrderDetails,
  BestSeller,
  NewArrivals,
  AddToFav,
  CartResult,
  GetMyFav,
  PostAddress,
  CartData,
} from "../../typings";

type Props = {
  wishlist: any;
  order: MyOrder;
  orderdetail: MyOrderDetails | null;
  addToFav: any;
  removeFav: any;
  // hasCartShadow: boolean;

  setresetData: (data: ResetData | null) => void;
  getFav: () => Promise<GetMyFav | undefined>;
  postAddress: (Address: AddAddress) => Promise<PostAddress | undefined>;

  getAllAddress: () => Promise<GetAddress[] | undefined>;
  selectedSavedAddress: AddressFormData | null;

  applyCart: any;
  cart: CartDetail;
  orderaddress: AddressFormData | null;
  resetdata: ResetData | null;
  setOrderAddress: (address: AddressFormData | null) => void;
  getAllCart: () => Promise<CartDetail | undefined>;
  getSingleCart: (cartItemId: number) => Promise<CartResult | undefined>;
  addToCart: (items: PostCartData) => Promise<CartResult | undefined>;
  remOneCart: (cartItemId: number) => void;
  deleteAllCart: () => void;
  getAllOrder: () => Promise<MyOrder[] | undefined>;
  getOrderDetail: (orderId: number) => Promise<MyOrderDetails | undefined>;
  getbestseller: () => Promise<BestSeller | undefined>;
  getnewarrival: () => Promise<NewArrivals | undefined>;
  getRelatedProd: any;
  getRandomProd: any;
  increaseCartQuant: (cartItemId: number, quantity: number) => Promise<any>;
  decreaseCartQuant: (cartItemId: number, quantity: number) => Promise<any>;
};

export const UseCartStore = create<Props>()(
  devtools(
    persist(
      (set) => ({
        cart: {
          results: {
            sub_total: 0,
            discount: 0,
            convenvience_fee: 0,
            total_amount: 0,
            cart_data: [],
          },
          next: "",
          previous: "",
          count: 0,
        },
        orderaddress: {
          id: 0,
          email_id: "",
          full_name: "",
          phone_number: "",
          address_line1: "",
          distic: "",
          state: "",
          city: "",
          landmark: "",
          pincode: "",
        },
        resetdata: {
          uuid: "",
          token: "",
        },
        order: {
          id: 0,
          prod_price: 0,
          total_price: 0,
          status: "",
          quantiy: 0,
          order_id: "",
          created: "",
          product: {
            product: {
              name: "",
            },
            id: 0,
            color: "",
            size: "",
            discount_price: 0,
            preview_image: "",
          },
        },
        // orderdetail: {
        //   id: 0,
        //   prod_price: 0,
        //   total_price: 0,
        //   order_id: "",
        //   created: "",
        //   quantity: 0,
        //   product: {
        //     product: {
        //       name: "",
        //     },
        //     id: 0,
        //     color: "",
        //     size: "",
        //     discount_price: 0,
        //     preview_image: "",
        //   },
        //   user: 0,
        //   payment_mode: "",
        //   status: {
        //     id: 0,
        //     status: "",
        //   },
        //   delivery_address: {
        //     id: 0,
        //     user: "",
        //     city: "",
        //     distic: "",
        //     state: "",
        //     pincode: "",
        //     landmark: "",
        //     created: "",
        //     updated: "",
        //     address_line1: "",
        //     address_line2: null,
        //   },
        //   order_status_details: {
        //     id: 0,
        //     status: "",
        //     order_item: 0,
        //     created_at: 0,
        //   },
        // },
        selectedSavedAddress: null,

        wishlist: [],

        orderdetail: null,
        hasCartShadow: false,
        getAllCart: async () => {
          const response = await getApis.getCartDetail();
          set({ cart: response });
          return response;
        },
        getSingleCart: async (cartItemId: number) => {
          const response = await getApis.getSingleCartDetail(cartItemId);
          return response;
        },
        addToCart: async (items: PostCartData) => {
          const response = await postApis.postCartDetail(items);
          return response;
        },
        remOneCart: async (cartItemId: number) => {
          const response = await deleteApis.deleteCartDetail(cartItemId);
          return response;
        },
        deleteAllCart: async () => {
          return;
        },
        increaseCartQuant: async (cartItemId: number, quantity: number) => {
          try {
            const response = await updateApis.IncreaseCartQuant({
              cart_item_id: cartItemId,
              quantity: quantity,
            });
            return response;
          } catch (error) {
            console.error("Error in increaseCartQuant:", error);
            return undefined;
          }
        },
        decreaseCartQuant: async (cartItemId: number, quantity: number) => {
          try {
            const response = await updateApis.DecreaseCartQuant({
              cart_item_id: cartItemId,
              quantity: quantity,
            });
            // Update your cart state or perform any additional logic
            return response;
          } catch (error) {
            console.error("Error in decreaseCartQuant:", error);
            return undefined;
          }
        },

        // getProducts: async (filters: string) => {
        //   const response = await getApis.getProducts(filters);
        //   return response;
        // },
        getNavigations: async () => {
          const response = await getApis.getNavigations();
          return response;
        },
        getCategories: async () => {
          const response = await getApis.getCategories();
          return response;
        },
        getProductDetail: async (slug: string) => {
          const response = await getApis.getProductDetail(slug);
          return response;
        },
        getRelatedProd: async (product_id: any, category: any) => {
          const response = await getApis.getRelatedProd(product_id, category);
          return response;
        },
        getRandomProd: async () => {
          const response = await getApis.getRandomProd();
          return response;
        },
        applyCart: () => {
          return false;
        },
        getAllAddress: async () => {
          const response = await getApis.getAddress();
          return response;
        },
        getAllOrder: async () => {
          const response = await getApis.getMyOrder();
          return response;
        },
        getOrderDetail: async (orderId: number) => {
          const response = await getApis.getOrderdetails(orderId);
          return response;
        },

        getbestseller: async () => {
          const response = await getApis.getbestseller();
          return response;
        },
        getnewarrival: async () => {
          const response = await getApis.getnewarrivals();
          return response;
        },
        postAddress: async (Address: AddAddress) => {
          const response = await postApis.postAddress(Address);
          return response;
        },
        getFav: async () => {
          const response = await getApis.getMyFav();
          return response;
        },

        // getOrderInvoice: async (user: number, payment_mode: string) => {
        //   const response = await postApisApis.postDownloadInvoice(
        //     orderId,
        //     payment_mode
        //   );
        //   return response;
        // },
        addToFav: async (id: number | undefined) => {
          console.log("Adding to Wishlist. Product ID:", id);
          const response = await postApis.postFav(id);
          console.log("Add to Wishlist Response:", response);
          set((state) => ({ wishlist: [...state.wishlist, response] }));

          return response;
        },
        removeFav: async (id: number | undefined) => {
          console.log("Removing to Wishlist. Product ID:", id);
          const response = await postApis.deleteFav(id);
          console.log("Removed to Wishlist. Product ID:", response);

          return response;
        },

        setOrderAddress: (address: AddressFormData | null) => {
          set({ orderaddress: address });
        },
        setresetData: (data: ResetData | null) => {
          set({ resetdata: data });
        },
        setSelectedSavedAddress: (selectedAddress: AddressFormData | null) => {
          set({ selectedSavedAddress: selectedAddress });
        },
        // setCartShadow: (hasItems: boolean) => {
        //   set({ hasCartShadow: hasItems });
        // },
      }),
      {
        name: "Kreomart User",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
