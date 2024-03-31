{
  /*                         Navigation                           */
}

export interface Filters {
  navigation_header?: string;
  category?: string[];
  sub_category?: string[];
  color?: string[];
  size?: string[];
  name?: string;
  max_price?: number;
  min_price?: number;
  page?: string;
}

export interface Navigation {
  categories: any;
  count: number;
  next: number;
  previous: number;
  results: NavResult[];
}
export interface NavResult {
  id: number;
  name: string;
  categories: {
    id: number;
    name: string;
  }[];
  image: string;
}

export interface Category {
  count: number;
  next: number;
  previous: number;
  results: CategResult[];
}

export interface CategResult {
  id: number;
  name: string;
  image: string;
  navigation_header: navigation_header[];
  sub_categories: SubCategory[];
}
export interface navigation_header {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
}

{
  /*Common Interfaces*/
}

// LoginData

export interface LoginData {
  email: string;
  password: string;
}

//ResetData
interface ResetData {
  uuid: string;
  token: string;
}

// Address interface
export interface AddressFormData {
  id: number;
  email_id: string;
  full_name: string;
  phone_number: string;
  address_line1: string;
  distic: string;
  state: string;
  city: string;
  landmark: string;
  pincode: string;
}

export interface AddAddress {
  email_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  distic: string;
  state: string;
  pincode: number;
  landmark: string;
  address_line1: string;
}

export interface PostAddress {
  msg: string;
  data: {
    id: number;
    email_id: string;
    full_name: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    user: string;
    city: string;
    distic: string;
    state: string;
    pincode: number;
    landmark: string;
    created: string;
    updated: string;
    address_line1: string;
    address_line2: string;
  };
}

export interface GetAddress {
  id: number;
  user: string;
  email_id: string;
  full_name: string;
  phone_number: string;
  city: string;
  distic: string;
  state: string;
  pincode: number;
  landmark: string;
  address_line1: string;
  address_line2: string;
}

export interface Paymentmode {
  Online: string;
  COD: string;
}

{
  /*                      Home Page  Sections Api response interfaces   */
}

//Hero Section
export interface HeroData {
  id: number;
  image: string;
}

{
  /*Featured Products*/
}

// NewArrivals
export interface NewArrivals {
  count: number;
  next: string;
  previous: string;
  results: NewArrivalResult[];
}

export interface NewArrivalResult {
  id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    preview_image: string;
    category: string;
    product_variant: NewArrivalsVarient[];
  };
}

export interface NewArrivalsVarient {
  color: {
    name: string;
    code: string;
  };
  size: string;
  price: number;
  discount_price: number;
  preview_image: string;
}

// bestseller
export interface BestSeller {
  count: number;
  next: string;
  previous: string;
  results: BestSellerResult[];
}

export interface BestSellerResult {
  id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    preview_image: string;
    category: string;
    product_variant: BestSellerVarient[];
  };
}

export interface BestSellerVarient {
  color: {
    name: string;
    code: string;
  };
  size: string;
  price: number;
  discount_price: number;
  preview_image: string;
}

//Run smart Banner
export interface Banner {
  count: number;
  next: number;
  previous: number;
  results: BannerResult[];
}

export interface BannerResult {
  id: number;
  product: BannerProduct[];
  title: string;
  description: string;
  banner_img: string;
  is_active: boolean;
}

export interface BannerProduct {
  product: {
    name: string;
    slug: string;
  };
  quantity: number;
  ratings: Ratings;
  id: number;
  color: string;
  size: string;
  price: number;
  discount_price: number;
  preview_image: string;
}

export interface ProductBanner {
  count: number;
  next: string;
  previous: string;
  results: {
    title: string;
    order_no: number;
    category: number;
    sub_title: string;
    redirect_url: string;
    image: string;
  }[];
}

export interface BestSellerProductItem {
  id: number;
  color: string;
  size: string;
  price: number;
  discount_price: number;
  assets: string[];
  quantity: number;
  preview_image: string;
}

export interface ProductDetail {
  id: number;
  slug: string;
  name: string;
  description: string;
  short_description: string;
  additional_information: string;
  preview_image: string;
  assets: string[];
  category: string;
  sub_category: string;
  product_variant: ProductDetailVariant[];
}

export interface ProductDetailVariant {
  defaultQuantity: any;
  id: number;
  color: {
    name: string;
    code: string;
  };
  size: string;
  price: number;
  discount_price: number;
  quantity: number;
  assets: string[];
  preview_image: string;
}
interface ProductListResponse {
  products: {
    items: PRODUCT[];
  };
}

interface ProductsType {
  id: number;
  name: string;
  description: string;
  price: string;
  brand: string;
  image: string;
  category: string;
  quantity: number;
}

interface PriceOptions {
  max: number;
  min: number;
}
interface Filterdata {
  category: CategoryOptions;
  priceRange: PriceOptions;
  sizes: string;
  colors: string;
}

interface TimeExpires {
  id: number;
  days: number;
  minutes: number;
  seconds: number;
}

interface EventData {
  id: number;
  image: string;
  description: string;
  time: TimeExpires;
}

// ----------------------------

{
  /*Cart Interfaces*/
}
export interface CartDetail {
  count: number;
  next: string;
  previous: string;
  results: CartResult;
}

export interface CartResult {
  sub_total: number;
  discount: number;
  convenvience_fee: number;
  total_amount: number;
  cart_data: CartData[];
}

export interface CartData {
  id: number;
  sub_total: number;
  discounts: number;
  convenvience_fee: number;
  total_amount: number;
  cart_data: CartData[];
}

export interface CartData {
  id: number;
  product_variant: {
    id: number;
    product: {
      name: string;
      slug: string;
    };
    ratings: {
      average_rating: number;
      no_of_rating: number;
    };

    color: string;
    quantity: number;
    size: string;
    price: number;
    discount_price: number;
    preview_image: string;
  };
  quantity: number;
}
export interface PostCartData {
  product_variant: number;
  quantity: number;
}

export interface CouponClaimedData {
  discount: number;
  sub_total: number;
  convenience_fee: number;
  total_amount: number;
}

export interface UpdateCartData {
  cart_item_id: number;
  quantity: number;
}

{
  /*Favourite Products */
}

// Fav
export interface AddToFav {
  id: number;
  user: number;
  prod_variant: {
    product: {
      name: string;
      slug: string;
    };
    quantity: number;
    ratings: {
      average_rating: number;
      no_of_rating: number;
    };
    id: number;
    color: string;
    size: string;
    price: number;
    discount_price: number;
    preview_image: string;
  };
}

export interface GetMyFav {
  count: number;
  next: string;
  previous: string;
  results: GetFavResult[];
}

export interface GetFavResult {
  id: number;
  user: number;
  product: {
    id: 1;
    slug: string;
    name: string;
    ratings: {
      arverage_rating: number;
      rating_count: number;
    };
    preview_image: string;
    category: string;
    product_variant: {
      color: {
        name: string;
        code: string;
      };
      size: string;
      price: number;
      discount_price: number;
      preview_image: string;
    }[];
  };
}

export interface slideItem {
  img: string;
  description: string;
  dis_price: string;
  price: string;
}

{
  /*MyOrder*/
}

// Create Order Response interface
export interface PostCreatOrderResponse {
  order_details: {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id: number;
    status: string;
    attempts: number;
    notes: {
      user: string;
      delivery_address_id: number;
    };
    created_at: number;
  };
}

// order interface
export interface MyOrder {
  id: number;
  prod_price: number;
  total_price: number;
  status: string;
  quantiy: number;
  order_id: string;
  created: string;
  product: {
    product: {
      name: string;
    };
    id: number;
    color: string;
    size: string;
    discount_price: number;
    preview_image: string;
  };
}
export interface MyOrderDetails {
  order_details: {
    id: number;
    user: any;
    prod_price: number;
    total_price: number;
    order_id: string;
    created: string;
    quantity: number;
    product: {
      product: {
        name: string;
      };
      id: number;
      color: string;
      size: string;
      discount_price: number;
      preview_image: string;
    };
    status: {
      id: number;
      status: string;
    };
    payment_details: PaymentDetail;
    delivery_address: {
      id: number;
      user: string;
      city: string;
      distic: string;
      state: string;
      pincode: number;
      landmark: string;
      created: string;
      updated: string;
      address_line1: string;
      address_line2: null;
    };
  };
  order_status_details: OrderStautsDetail;
}
export interface OrderStautsDetail {
  id: number;
  status: string;
  order_item: number;
  created_at: number;
}

export interface PaymentDetail {
  payment_mode: string;
  payment_status: string;
  sub_total: number;
  discount_amount: number;
  convenience_fee: number;
  total_amount: number;
  payment_id: string;
}

{
  /*Product Interfaces*/
}
export interface PRODUCT {
  count: number;
  next: string;
  previous: string;
  results: {
    categories_data: any;
    product_data: product_data[];
  };
}

export interface product_data {
  id: number;
  slug: string;
  name: string;
  ratings: {
    average_rating: number | null;
    no_of_rating: number;
  };
  short_description: string;
  description: string;
  preview_image: string;
  category: string;
  product_variant: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  color: {
    name: string;
    code: string;
  };
  size: string;
  price: number;
  discount_price: number;
  assets: string[];
  quantity: number;
  preview_image: string;
}

{
  /*Related Product On Single detail Page*/
}
export interface RelatedProduct {
  count: number;
  next: string;
  previous: string;
  results: RelatedResult[];
}

export interface RelatedResult {
  id: number;
  slug: string;
  name: string;
  description: string;
  preview_image: string;
  category: string;
  product_variant: [
    {
      id: number;
      color: string;
      ratings: string;
      size: string;
      price: number;
      discount_price: number;
      assets: string;
      quantity: number;
      preview_image: string;
    }
  ];
}

export interface RandomProduct {
  count: number;
  next: string;
  previous: string;
  results: RandomResult[];
}

export interface RandomResult {
  id: number;
  slug: string;
  name: string;
  description: string;
  preview_image: string;
  category: string;
  ratings: {
    average_rating: number;
    no_of_rating: number;
  };
  product_variant: [];
}

export interface RandomProductVariant {
  id: number;
  color: {
    name: string;
    code: string;
  };
  size: string;
  price: number;
  discount_price: number;
  quantity: number;
  preview_image: string;
  assets: string[];
}

// Coupons

export interface AllCoupons {
  count: number;
  next: string;
  previous: string;
  results: CouponResults[];
}

export interface CouponResults {
  id: number;
  code: string;
  discount_type: string;
  discount_amount: number;
  user_per_limit: number;
  total_claimed: number;
  usage_limit: number;
  start_date: string;
  end_date: string;
  created: string;
  is_active: true;
}

// offers
interface Offer {
  id: number;
  name: string;
  description: string;
  offer_image: string;
  types: "fixed";
  applicable_for: "products";
  offer_amount: number;
  user_per_limit: number;
  total_claimed: number;
  usage_limit: number;
  start_date: string;
  end_date: string;
  created: string;
  is_active: boolean;
}

interface OfferProduct {
  id: number;
  slug: string;
  name: string;
  ratings: string; // This field is a placeholder as its type is not provided in the JSON data
  preview_image: string;
  category: string;
}

interface OfferResult {
  id: number;
  offer: Offer;
  product: OfferProduct;
  offer_image: string;
}

interface OfferResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: OfferResult[];
}

// Timer
export interface Timer {
  id: number;
  prod_variants: TimerVariant[];
  title: string;
  description: string;
  started: string;
  expired: string;
  is_active: true;
  offer_usage_count: number;
  offer_type: string;
  offer_usage_limit: number;
  user_per_limit: number;
  offer_amount: number;
}

export interface TimerVariant {
  product: {
    name: string;
    slug: string;
  };
  quantity: number;
  ratings: {
    average_rating: null;
    no_of_rating: number;
  };
  id: number;
  color: string;
  size: string;
  price: number;
  discount_price: number;
  preview_image: string;
}

export interface Reviews {
  count: number;
  next: string;
  previous: string;
  results: ReviewsResult[];
}

// export interface ReviewsResult {
//   id: number;
//   user: string;
//   created_at: string;
//   updated_at: string;
//   rating: number;
//   review: string;
//   product: {
//     id: number;
//     slug: string;
//     name: string;
//     ratings: {
//       average_rating: number;
//       no_of_rating: number;
//     };
//   };
// }
export interface User {
  full_name: string;
  profile_img: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  ratings: {
    average_rating: number;
    no_of_rating: number;
  };
}

export interface ReviewResult {
  id: number;
  user: User;
  created_at: string;
  updated_at: string;
  rating: number;
  review: string;
  product: Product;
}

// Create Post Order Data
export interface PostOrderData {
  address_id: number | undefined;
  total_amount: number | undefined;
  discount?: number | undefined;
  sub_total: number | undefined;
  convenience_fee: number | undefined;
  coupon_code?: string;
  discount?: number | null;
}

export interface PostInvoiceData {
  payment_detail_id: string;
  payment_mode: string;
}

// Checkout response
export interface PostCheckoutResponse {
  sub_total: number;
  discount: number;
  convenience_fee: number;
  total_amount: number;
  delivery_address_id: number;
}

export interface contactUs {
  email: string;
  subject: string;
  message: string;
}
