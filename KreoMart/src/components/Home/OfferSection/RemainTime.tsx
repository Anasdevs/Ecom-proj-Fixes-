import { useState, useEffect } from "react";

const RemainTime = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [futureDate, setFutureDate] = useState<Date>(new Date("2024-03-20"));
  const [timeObj, setTimeObj] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const getRemainingTime = (futureDate: Date, currentDate: Date) => {
    const total = futureDate.getTime() - currentDate.getTime();
    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    let days = Math.floor(total / oneDay);
    let hours = Math.floor((total % oneDay) / oneHour);
    let minutes = Math.floor((total % oneHour) / oneMinute);
    let seconds = Math.floor((total % oneMinute) / 1000);
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setTimeObj(getRemainingTime(futureDate, currentDate));
  }, [currentDate, futureDate]);

  return (
    <div>
      <div className="mb-5">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <span className="time  sm:text-[40px] text-[24px] uppercase font-bold">
              {timeObj.days}
            </span>
            <span className="text-[10px] md:text-[16px] text-[#8991A4]">
              DAYS
            </span>
          </div>
          <span className="divider text-2xl font-bold "> : </span>
          <div className="flex flex-col">
            <span className="time sm:text-[40px] text-[24px] uppercase font-bold">
              {timeObj.hours}
            </span>
            <span className="text-[10px] md:text-[16px] text-[#8991A4]">
              HOURS
            </span>
          </div>
          <span className="divider text-2xl  font-bold "> : </span>
          <div className="flex flex-col">
            <span className="time sm:text-[40px] text-[24px] uppercase font-bold">
              {timeObj.minutes}{" "}
            </span>
            <span className="text-[10px] md:text-[16px] text-[#8991A4]">
              MINUTES
            </span>
          </div>
          <span className="divider text-2xl font-bold ">:</span>
          <div className="flex flex-col">
            <span className="time sm:text-[40px] text-[24px] uppercase font-bold">
              {timeObj.seconds}
            </span>
            <span className="text-[10px] md:text-[16px] text-[#8991A4]">
              SECONDS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemainTime;
