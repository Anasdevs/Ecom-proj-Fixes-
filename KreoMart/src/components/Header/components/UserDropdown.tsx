"use client";
import Button from "@/components/shared/Button/Button";
import Icon from "@/components/shared/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import route from "@/routes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserData {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

const UserDropdown = () => {
  const { data: session, status } = useSession();
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreen(window.innerWidth);
      const handleResize = () => setScreen(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (status === "loading") return <div>loading...</div>;

  const userData: UserData | undefined = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {userData ? (
          <Icon name="user" size={24} src={userData.image} />
        ) : (
          <Icon name={"user"} size={24} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className={`bg-white relative m-6 ${
          status === "authenticated" ? "w-96 h-auto p-2" : "w-96 h-20 p-1" // Adjust size for authenticated and non-authenticated users
        }`}
      >
        {status === "authenticated" ? (
          <>
            <DropdownMenuLabel className="text-xl font-normal">
              {userData ? <h2>{userData.name}</h2> : ``}
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-t border-gray-300 my-4" />
            {/* {status === "authenticated" ? (
          <> */}
            {/* <Link href={route.Account} className="cursor-pointer">
              <DropdownMenuItem className="text-xl font-normal">
                Account Setting{" "}
              </DropdownMenuItem>
            </Link> */}
            <Link
              href={screen > 768 ? route.Profile : route.Account}
              className="cursor-pointer"
            >
              <DropdownMenuItem className="text-xl font-normal">
                Account Setting{" "}
              </DropdownMenuItem>
            </Link>

            {/* <Link href={route.Wishlist} className="cursor-pointer">
              <DropdownMenuItem className="text-xl font-normal">
                My WishList
              </DropdownMenuItem>
            </Link> */}

            <Link href={route.OrderHistory} className="cursor-pointer">
              <DropdownMenuItem className="text-xl font-normal">
                My Order
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="border-t border-gray-300 my-4" />
            <DropdownMenuItem className="cursor-pointer">
              <button
                onClick={() => {
                  localStorage.removeItem("access_token");
                  signOut({
                    redirect: false,
                    callbackUrl: "http://localhost:3000",
                  });
                }}
                className="text-xl font-normal text-white bg-red-default"
              >
                Logout
              </button>
            </DropdownMenuItem>
          </>
        ) : (
          <Link href={`${route.Login}`}>
            <DropdownMenuItem
              className=" h-10 my-4 text-xl  font-normal items-center justify-center flex transition duration-150 ease-in"
              // style={{ height: "30px" }}
            >
              {" "}
              <Button className="px-5 w-full items-center justify-center flex">
                {" "}
                Login{" "}
              </Button>
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
