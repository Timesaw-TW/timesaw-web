"use client";

import { useState } from "react";
import { CalendarType } from "../calendar/type";
import HomeHeader from "./HomeHeader";
import StaticMenu from "../util/Menu/StaticMenu";

const rotateCalendarOrder = (order: CalendarType[]) => {
  if (!order.length) return order;
  const newOrder = [...order];
  const firstItem = newOrder[0];
  newOrder.shift();
  newOrder.push(firstItem);
  return newOrder;
};

const Home = () => {
  const [calendarTypeOrder, setCalendarTypeOrder] = useState<CalendarType[]>([
    "day",
    "week",
    "month",
  ]);

  return (
    <div className="flex h-full w-full">
      <StaticMenu />
      <div className="w-full">
        <HomeHeader
          order={calendarTypeOrder}
          onChange={() =>
            setCalendarTypeOrder(rotateCalendarOrder(calendarTypeOrder))
          }
        />
        <div>Home (logged in 123)</div>
      </div>
    </div>
  );
};

export default Home;
