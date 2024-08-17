"use client";

import { useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Swiper from "swiper";
import HomeHeader from "./HomeHeader";
import StaticMenu from "../util/Menu/StaticMenu";
import CalendarPickerSwiper from "../calendar/CalendarPicker/CalendarPickerSwiper";
import { CalendarType } from "@/libs/calendar";
import FAB from "@/stories/FAB";
import { merge } from "@/libs/tailwind";
import { SwiperRef } from "swiper/react";

const rotateCalendarOrder = (order: CalendarType[]) => {
  if (!order.length) return order;
  const newOrder = [...order];
  const firstItem = newOrder[0];
  newOrder.shift();
  newOrder.push(firstItem);
  return newOrder;
};

const getInitialSlide = (type: "day" | "month", date: Dayjs) => {
  const duration = type === "day" ? 7 : 1;
  return [
    date.add(duration * -2, type),
    date.add(duration * -1, type),
    date,
    date.add(duration * 1, type),
  ];
};

const Home = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [calendarTypeOrder, setCalendarTypeOrder] = useState<CalendarType[]>([
    "day",
    "week",
    "month",
  ]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [searchDate, setSearchDate] = useState<Dayjs>(dayjs());
  const [pickerSlides, setPickerSlides] = useState<Dayjs[]>(
    getInitialSlide("day", searchDate)
  );

  const resetToWeekSlide = () => {
    setPickerSlides(getInitialSlide("day", searchDate));
    setTimeout(() => {
      swiperRef.current?.swiper.slideTo(2, 0);
    }, 0);
  };

  const resetToMonthSlide = () => {
    setPickerSlides(getInitialSlide("month", searchDate));
    setTimeout(() => {
      swiperRef.current?.swiper.slideTo(2, 0);
    }, 0);
  };

  const handleSwiperChange = (type: CalendarType, swiper: Swiper) => {
    const duration = type === "day" || type === "week" ? 7 : 1;
    const filterType = type === "day" || type === "week" ? "day" : "month";

    if (swiper.activeIndex === swiper.slides.length - 1) {
      const newSlide = [...pickerSlides];
      newSlide.push(
        newSlide[pickerSlides.length - 1].add(duration, filterType)
      );
      setSearchDate(newSlide[newSlide.length - 2]);
      setPickerSlides(newSlide);
    } else if (swiper.activeIndex === 1) {
      const newSlide = [
        pickerSlides[0].add(duration * -1, filterType),
        ...pickerSlides,
      ];
      setPickerSlides(newSlide);
      setSearchDate(newSlide[2]);
      setTimeout(() => {
        swiper.slideTo(2, 0);
      }, 100);
    } else {
      setSearchDate(pickerSlides[swiper.activeIndex]);
    }
  };

  return (
    <div className="flex h-full w-full">
      <StaticMenu />
      <div className="w-full overflow-x-hidden">
        <HomeHeader
          date={searchDate}
          order={calendarTypeOrder}
          onChange={() => {
            const newOrderType = rotateCalendarOrder(calendarTypeOrder);

            if (newOrderType[0] === "day") {
              resetToWeekSlide();
            } else if (newOrderType[0] === "month") {
              resetToMonthSlide();
            }

            setCalendarTypeOrder(newOrderType);
          }}
        />
        <CalendarPickerSwiper
          type={calendarTypeOrder[0]}
          value={selectedDate}
          onChange={(date: Dayjs) => {
            setSelectedDate(date);
          }}
          swiperRef={swiperRef}
          slides={pickerSlides}
          initialSlide={2}
          onSlideChange={(swiper) =>
            handleSwiperChange(calendarTypeOrder[0], swiper)
          }
        />
      </div>
      <FAB
        className={merge(
          "fixed bottom-10",
          "right-4 sm:right-12 lg:right-[4.5rem]"
        )}
      />
    </div>
  );
};

export default Home;
