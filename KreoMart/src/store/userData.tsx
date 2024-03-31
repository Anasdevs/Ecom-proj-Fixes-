import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { getApis, postApis, deleteApis, updateApis } from "@/api/client";

type Props = {
  userData: any;

  getUserData: () => Promise<any>;
};

export const UserData = create<Props>()(
  devtools(
    persist(
      (set) => ({
        userData: {},

        getUserData: async () => {
          const response = await getApis.getDashboardData();
          set({ userData: response });
          return response;
        },
      }),
      {
        name: "Kreomart User",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
