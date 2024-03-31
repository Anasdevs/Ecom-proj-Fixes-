import React from "react";
interface DetailProps {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  status: boolean;
}
const Detailform: React.FC<DetailProps> = ({
  firstname,
  lastname,
  email,
  phone,
  status,
}) => {
  return (
    <div>
      <div className=" flex flex-col items-start justify-start gap-4  font-medium text-xl md:text-lg text-gray-default">
        <div className="flex flex-col items-start justify-start gap-[4px]">
          <div className=" text-gray-400">First name</div>
          <div className="  text-gray-default">{firstname}</div>
        </div>
        <div className=" flex flex-col items-start justify-start gap-[4px]">
          <div className="text-gray-400 ">Last name</div>
          <div className="  text-gray-default">{lastname}</div>
        </div>
        <div className="  flex flex-col items-start justify-start gap-[4px]">
          <div className=" text-gray-400  ">Phone</div>
          <div className="  text-gray-default">{phone}</div>
        </div>
        <div className="flex flex-col items-start justify-start gap-[4px] text-grey-scale-cool-gray">
          <div className="text-gray-400">Email</div>
          <div className="flex flex-row items-center ">
            {" "}
            <div className="text-gray-default">{email}</div>
            {status && (
              <span className="text-success text-secondary text-base ml-96 ">
                Verified
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailform;

// "use clients";
// import { UseCartStore } from "@/store/store";
// import React, { useEffect, useState } from "react";
// import { GetAddress } from "../../../typings";
// const [allAddress, setAllAddresses] = useState<GetAddress[] | any>([]);
// const { getAllAddress } = UseCartStore((state) => ({
//   getAllAddress: state.getAllAddress,
// }));

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const data = await getAllAddress();
//       console.log("Saved Address data:", data);
//       setAllAddresses(data);
//     } catch (error) {
//       console.error("Error fetching address data:", error);
//     }
//   };

//   fetchData();
// }, [getAllAddress]);

// interface DetailProps {
//   firstname: string;
//   allAddresses: GetAddress[];
// }
// const Detailform: React.FC<DetailProps> = ({ allAddresses }) => {
//   return (
//     <div>
//       {allAddresses.map((address, index) => (
//         <div
//           key={index}
//           className=" flex flex-col items-start justify-start gap-4  font-medium text-xl md:text-lg text-gray-default"
//         >
//           <div className="flex flex-col items-start justify-start gap-[4px]">
//             <div className=" text-gray-400">Full Name </div>
//             <div className="  text-gray-default">{address.full_name}</div>
//           </div>
//           {/* <div className=" flex flex-col items-start justify-start gap-[4px]">
//             <div className="text-gray-400 ">Last name</div>
//             <div className="  text-gray-default">Gupta</div>
//           </div> */}
//           <div className="  flex flex-col items-start justify-start gap-[4px]">
//             <div className=" text-gray-400  ">Phone</div>
//             <div className="  text-gray-default">{address.phone_number}</div>
//           </div>
//           <div className=" flex flex-col items-start justify-start gap-[4px] text-grey-scale-cool-gray">
//             <div className=" text-gray-400 ">Email</div>
//             <div className=" text-gray-default">{address.email_id}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Detailform;
