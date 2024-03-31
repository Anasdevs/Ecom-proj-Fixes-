import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import {
  AddAddress,
  AllCoupons,
  Banner,
  BestSeller,
  CartDetail,
  CartResult,
  Category,
  contactUs,
  CouponClaimedData,
  CouponResults,
  Filters,
  GetAddress,
  GetMyFav,
  LoginData,
  MyOrder,
  MyOrderDetails,
  Navigation,
  NewArrivals,
  OfferResponse,
  PostAddress,
  PostCartData,
  PostCheckoutResponse,
  PostCreatOrderResponse,
  PostInvoiceData,
  PostOrderData,
  PRODUCT,
  ProductBanner,
  ProductDetail,
  RelatedProduct,
  Reviews,
  UpdateCartData,
} from "../../../typings";

const api_root = process.env.NEXT_PUBLIC_API_ROOT;

console.log("api_root", api_root);

class API {
  protected api = axios.create({
    baseURL: api_root,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

class GetApis extends API {
  constructor() {
    super();
  }

  // get navigations
  async getNavigations(): Promise<Navigation | undefined> {
    try {
      const response: AxiosResponse<Navigation> = await this.api.get(
        "/navigation/"
      );
      return response.data;
    } catch (error) {
      // if (error instanceof AxiosError) this.handleApiError(error);
      // You can return a default value, throw a custom error, or handle the error differently
      // throw new Error('Failed to fetch navigations');
    }
  }

  // get categories with subcategories
  async getCategories(): Promise<Category | undefined> {
    try {
      const response: AxiosResponse<Category> = await this.api.get(
        "/categories/"
      );
      return response.data;
    } catch (error) {
      // if (error instanceof AxiosError) this.handleApiError(error);
      // You can return a default value, throw a custom error, or handle the error differently
      // throw new Error('Failed to fetch categories');
    }
  }

  async getBanner1(): Promise<Banner | undefined> {
    try {
      const response: AxiosResponse<Banner> = await this.api.get(
        "/trending/products/banners/"
      );

      return response.data;
    } catch (error) {
      // if (error instanceof AxiosError) this.handleApiError(error);
      // You can return a default value, throw a custom error, or handle the error differently
      // throw new Error('Failed to fetch categories');
    }
  }

  // get products
  getProducts(filters: Filters): Promise<PRODUCT | undefined> {
    console.log(filters, "filters");
    const cur = new URLSearchParams();

    const category = filters.category?.map((item) =>
      cur.append("category", item)
    );
    const sub_category = filters.sub_category?.map((item) =>
      cur.append("sub_category", item)
    );
    filters.color?.map((item) => cur.append("color", item));

    filters.size?.map((item) => cur.append("size", item));

    filters.category?.forEach((item) => cur.append("category", item));
    filters.sub_category?.forEach((item) => cur.append("sub_category", item));

    if (filters.min_price !== undefined) {
      cur.append("min_price", filters.min_price.toString());
    }

    if (filters.max_price !== undefined) {
      cur.append("max_price", filters.max_price.toString());
    }

    if (filters.name) {
      cur.append("name", filters.name);
    }

    if (filters?.page) {
      cur.append("page", filters.page);
    }

    console.log(cur.toString(), "query parameters");
    console.log(filters.category, "category");
    console.log(category, "category");
    console.log(sub_category, "sub_category");

    return this.api
      .get(`/products/?${cur.toString()}`)
      .then((response) => response.data);
  }

  async getProductBanner(): Promise<ProductBanner | undefined> {
    try {
      const response: AxiosResponse<ProductBanner> = await this.api.get(
        "/banners/"
      );

      console.log(response.data, "Product Bannerdata");
      return response.data;
    } catch (error) {
      // if (error instanceof AxiosError) this.handleApiError(error);
      // You can return a default value, throw a custom error, or handle the error differently
      // throw new Error('Failed to fetch categories');
    }
  }

  // get product detail by slug
  async getProductDetail(slug: string): Promise<ProductDetail | undefined> {
    try {
      const response: AxiosResponse = await this.api.get(
        "/product/detail/" + slug + "/"
      );
      return response.data;
    } catch (error) {
      // if (error instanceof AxiosError) this.handleApiError(error);
      // You can return a default value, throw a custom error, or handle the error differently
      // throw new Error('Failed to fetch product detail');
    }
  }

  // get cart
  async getCartDetail(): Promise<CartDetail | undefined> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.get(
        "/users/carts/all/items/",
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // get individual cart detail by id
  async getSingleCartDetail(id: number): Promise<CartResult | undefined> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.get(
        "/users/carts/item/details/" + id + "/",
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      // if (error instanceof AxiosError) this.handleApiError(error);
    }
  }

  // get my profile

  async getDashboardData(): Promise<any | undefined> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response: AxiosResponse = await this.api.get(
        "/accounts/dashboard/",
        { headers }
      );
      return response.data;
    } catch (error) {
      // if (error instanceof AxiosError) this.handleApiError(error);
    }
  }

  // get my orders
  async getMyOrder(): Promise<MyOrder[] | undefined> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.get(
        "/order/user/orders/all/",
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getOrderdetails(orderId: number): Promise<MyOrderDetails | undefined> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.get(
        `/order/user/orders/detail/${orderId}/`,
        { headers }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error setting up the request:", error.message);
      }
    }
  }

  // get hero banners
  async getHeroBanners(): Promise<any | undefined> {
    try {
      const response: AxiosResponse = await this.api.get("/herobanners/");
      return response.data;
    } catch (error) {
      // if (error instanceof AxiosError) this.handleApiError(error);
    }
  }

  async getAddress(): Promise<GetAddress[] | undefined> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.get(
        "/accounts/user/address/",
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getbestseller(): Promise<BestSeller | undefined> {
    try {
      const response: AxiosResponse = await this.api.get(
        "/best/sellers/products/"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getnewarrivals(): Promise<NewArrivals | undefined> {
    try {
      const response: AxiosResponse = await this.api.get(
        "/new/arrivals/products/"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMyFav(): Promise<GetMyFav | undefined> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.get(
        "/users/favourite/products/",
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getRelatedProd(
    product_id: any,
    category: any
  ): Promise<RelatedProduct | undefined> {
    try {
      const response: AxiosResponse = await this.api.get(
        `/similar/products/${product_id}/${category}/`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getRandomProd(): Promise<RelatedProduct | undefined> {
    try {
      const response: AxiosResponse = await this.api.get(`/random/products/`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCoupons(): Promise<AllCoupons | undefined> {
    try {
      const response: AxiosResponse = await this.api.get(`/coupons/all/`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleCoupons(id: number | any): Promise<CouponResults | undefined> {
    try {
      const response: AxiosResponse = await this.api.get(
        `/coupons/details/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllReview(id: number | undefined): Promise<Reviews | undefined> {
    try {
      const response: AxiosResponse = await this.api.get(
        `/products/all/rating/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllOffers(): Promise<OfferResponse[] | undefined> {
    try {
      const response: AxiosResponse = await this.api.get(
        "/offers/products/all/offers/"
      );
      console.log("offerList : ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export class PostApis extends API {
  [x: string]: any;
  constructor() {
    super();
  }

  // post login

  async postLogin(loginData: LoginData | undefined) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const data = {
        loginData: loginData,
      };

      const response: AxiosResponse = await this.api.post(
        `/accounts/login/`,
        data,
        { headers }
      );

      if (response.status === 200) {
        console.log("Login successfully!");
      } else {
        console.error("Login failed");
      }

      return response;
    } catch (error) {
      console.error("error validations:", error);
    }
  }

  // post register

  // verify email

  // post forgot password

  //Contact us

  async postContactUs(contactData: contactUs | undefined) {
    try {
      if (!contactData) {
        console.error("No contact data provided.");
        return;
      }

      const data = {
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
      };
      console.log("Contact Data:", { ...data });
      // const token = localStorage.getItem("access_token");
      // const headers = {
      //   Authorization: `Bearer ${token}`,
      // };

      const response: AxiosResponse = await this.api.post(
        `/accounts/contact/us/`,
        data
        // { headers }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Request Sent successfully!");
      } else {
        console.error("Error while sending request. Status:", response.status);
        console.error("Response data:", response.data);
      }
      return response;
    } catch (error) {
      console.error("Error contacting server: ", error);
    }
  }

  // post add to cart
  async postCartDetail(
    cartData: PostCartData
  ): Promise<CartResult | undefined> {
    try {
      const postData = {
        product_variant: cartData.product_variant,
        quantity: cartData.quantity,
      };
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.post(
        "/users/carts/add/new/items/",
        postData,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) this.handleApiError(error);
    }
  }

  // post Address
  async postAddress(postData: AddAddress): Promise<PostAddress> {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("Access token not found in local storage");
        throw new Error("Access token not found");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let address_data = {
        first_name: postData.first_name,
        last_name: postData.last_name,
        email_id: postData.email_id,
        phone_number: postData.phone_number,
        address_line1: postData.address_line1,
        distic: postData.distic,
        state: postData.state,
        city: postData.city,
        landmark: postData.landmark,
        pincode: postData.pincode,
      };

      console.log("Sending POST request to /accounts/user/address/", {
        ...address_data,
      });
      const response = await this.api.post(
        "/accounts/user/address/",
        address_data,
        { headers }
      );

      console.log("Received response:", response.data);

      if (response.status === 200) {
        console.log("Address saved successfully!");
        return response.data;
      } else {
        console.error("Failed to save address");
      }

      return response.data;
    } catch (error) {
      console.error("Error in postAddress:", error);
      throw new Error(`Failed to post address. ${error}`);
    }
  }

  // post Coupon
  async postCoupon(couponCode: string | undefined) {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const data = {
        couponCode: couponCode,
      };

      const response: AxiosResponse = await this.api.post(
        `/offers/coupons/claim/now/`,
        data,
        { headers }
      );

      if (response.status === 200) {
        console.log("Coupon claimed successfully!");
      } else {
        console.error("Coupon claim failed");
      }

      return response;
    } catch (error) {
      console.error("Error claiming coupon:", error);
    }
  }

  // post checkout
  async postCheckout(
    orderId: number | undefined
  ): Promise<PostCheckoutResponse | undefined> {
    console.log("postCheckout called with orderId:", orderId);
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.post(
        `/buy/products/checkout/${orderId}/`,
        null,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // async postCheckout(
  //   orderId: number | undefined,
  //   couponClaimedData?: CouponClaimedData
  // ): Promise<PostCheckoutResponse | undefined> {
  //   console.log("postCheckout called with orderId:", orderId);
  //   try {
  //     const token = localStorage.getItem("access_token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     let response: AxiosResponse;

  //     // Check if coupon data is available
  //     if (couponClaimedData) {
  //       // If coupon data is available, include it in the request payload
  //       const requestData = {
  //         ...couponClaimedData,
  //         order_id: orderId, // Include order_id if needed
  //       };

  //       // Make the API request with the updated request data
  //       response = await this.api.post(
  //         `/buy/products/checkout/${orderId}/`,
  //         requestData,
  //         { headers }
  //       );
  //       console.log("Response after coupon claimed:", response.data);
  //     } else {
  //       // If no coupon data is available, make the API request without coupon information
  //       response = await this.api.post(
  //         `/buy/products/checkout/${orderId}/`,
  //         null,
  //         { headers }
  //       );
  //       console.log("Response without coupon:", response.data);
  //     }

  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // post Create order
  // async postCreateOrder(
  //   orderdata: PostOrderData
  // ): Promise<PostCreatOrderResponse | undefined> {
  //   try {
  //     const token = localStorage.getItem("access_token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     const postdata = {
  //       address_id: orderdata.address_id,
  //       total_amount: orderdata.total_amount,
  //       discount: orderdata.discount,
  //       sub_total: orderdata.sub_total,
  //       convenience_fee: orderdata.convenience_fee,
  //     };
  //     const response: AxiosResponse = await this.api.post(
  //       "/order/make/new/order/",
  //       postdata,
  //       { headers }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async postCreateOrder(
    orderdata: PostOrderData
  ): Promise<PostCreatOrderResponse | undefined> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let postdata: { [key: string]: string | number | undefined } = {
        address_id: orderdata.address_id,
        total_amount: orderdata.total_amount,
        sub_total: orderdata.sub_total,
        convenience_fee: orderdata.convenience_fee,
      };
      if (orderdata.coupon_code) {
        // @ts-ignore
        postdata = {
          ...postdata,
          coupon_code: orderdata.coupon_code,
          discount: orderdata.discount,
        };
      }
      const response: AxiosResponse = await this.api.post(
        "/order/make/new/order/",
        postdata,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // post confirm order
  async postConfirmOrder(
    orderId: string,
    paymentId: string,
    signatureId: string
  ) {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const postdata = {
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature_id: signatureId,
      };
      const response: AxiosResponse = await this.api.post(
        "/order/confirm/order/",
        postdata,
        { headers }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async postDownloadInvoice(
    payment_detail_id: string | undefined,
    payment_mode: string | undefined
  ) {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const invoiceData = {
        payment_detail_id: payment_detail_id,
        payment_mode: payment_mode,
      };
      const response: AxiosResponse = await this.api.post(
        `/order/invoice/download/`,
        invoiceData,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Post Cash on Delivery COD data
  // async postCod(
  //   addressId: number,
  //   discount: number,
  //   total_amount: number,
  //   sub_total: number,
  //   convenience_fee: number
  // ) {
  //   try {
  //     const token = localStorage.getItem("access_token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  // const postdata = {
  //   address_id: addressId,
  //   total_amount: total_amount,
  //   sub_total: sub_total,
  //   discount: discount,
  //   convenience_fee: convenience_fee,
  // };
  //     const response: AxiosResponse = await this.api.post(
  //       "/order/payment/method/cod/",
  //       postdata,
  //       { headers }
  //     );
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async postCod(
    // orderData: any,
    // addressId?: number,
    // total_amount?: number,
    // sub_total?: number,
    // discount?: number,
    // convenience_fee?: number,
    // coupon?: string,
    // summery?: any
    orderData: PostOrderData
  ) {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // const postdata = {
      //   address_id: addressId,
      //   total_amount: total_amount,
      //   sub_total: sub_total,
      //   discount: discount,
      //   convenience_fee: convenience_fee,
      // };

      let postdata: { [key: string]: string | number | undefined } = {
        address_id: orderData.address_id,
        total_amount: orderData.total_amount,
        sub_total: orderData.sub_total,
        convenience_fee: orderData.convenience_fee,
      };
      if (orderData.coupon_code) {
        // @ts-ignore
        postdata = {
          ...postdata,
          coupon_code: orderData.coupon_code,
          discount: orderData.discount,
        };
      }

      const response: AxiosResponse = await this.api.post(
        "/order/payment/method/cod/",
        orderData,
        { headers }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async postCancelorder(orderId: number) {
    console.log("postCancelorder called with orderId:", orderId);
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.post(
        `/order/user/orders/cancel/${orderId}/`,
        null,
        { headers }
      );
      console.log("Order cancelled successfully!", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // Post news letter
  async postnewsletter(email: string | undefined) {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const postdata = {
        email: email,
      };
      const response: AxiosResponse = await this.api.post(
        "/news/letter/subscriber/",
        postdata,
        { headers }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // post My Favourite
  async postFav(id: number | undefined) {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log("token: ", token);
      const response: AxiosResponse = await this.api.post(
        `/users/add/new/favourite/products/${id}/`,
        { headers }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async postSubscriber(email: string) {
    try {
      // const token = localStorage.getItem("access_token");
      // const headers = {
      //   Authorization: `Bearer ${token}`,
      // };
      const postdata = {
        email: email,
      };
      const response = await this.api.post(
        "/news/letter/subscriber/",
        postdata
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
export class UpdateApis extends API {
  constructor() {
    super();
  }
  // Update the cart
  async IncreaseCartQuant(
    cartData: UpdateCartData
  ): Promise<CartResult | undefined> {
    try {
      const updateData = {
        cart_item_id: cartData.cart_item_id,
        quantity: cartData.quantity,
      };
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.patch(
        "/users/carts/increase/items/quantity/",
        updateData,
        { headers }
      );
      return response.data;
    } catch (error) {
      // if (error instanceof AxiosError) this.handleApiError(error);
    }
  }

  async DecreaseCartQuant(
    cartData: UpdateCartData
  ): Promise<CartResult | undefined> {
    try {
      const updateData = {
        cart_item_id: cartData.cart_item_id,
        quantity: cartData.quantity,
      };
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.patch(
        "/users/carts/decrease/items/quantity/",
        updateData,
        { headers }
      );
      return response.data;
    } catch (error) {
      // if (error instanceof AxiosError) this.handleApiError(error);
    }
  }
}
export class DeleteApis extends API {
  constructor() {
    super();
  }
  // delete the cart
  async deleteCartDetail(id: number) {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.delete(
        `/users/carts/remove/items/${id}/`,
        { headers }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteFav(id: number) {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await this.api.delete(
        `/users/favourite/products/remove/${id}/`,
        { headers }
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const getApis = new GetApis();
export const postApis = new PostApis();
export const updateApis = new UpdateApis();
export const deleteApis = new DeleteApis();
