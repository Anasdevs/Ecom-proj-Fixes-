import route from "./routes";

export { default, withAuth } from "next-auth/middleware";

export const config = {
  matcher: [
    "/account",
    "/account/setting",
    "/orders",
    "/orders/history",
    "/orders/details",
    "/wishlist",
    "/cart",
  ],
};
