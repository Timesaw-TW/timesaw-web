import { FC, MutableRefObject } from "react";
import SwiperInstance from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Dayjs } from "dayjs";
import { CalendarType } from "@/libs/calendar";
import CalendarPickerPanel from "./CalendarPickerPanel";

interface Props {
  type: CalendarType;
  value: Dayjs;
  onChange: (date: Dayjs) => unknown;
  slides: Dayjs[];
  initialSlide?: number;
  onSlideChange?: (swiper: SwiperInstance) => unknown;
  swiperRef?: MutableRefObject<SwiperRef | null>;
}

const CalendarPickerSwiper: FC<Props> = ({
  type,
  slides,
  value,
  onChange,
  swiperRef,
  ...props
}) => {
  return (
    <Swiper ref={swiperRef} {...props}>
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.toString()}>
          <CalendarPickerPanel
            key={slide.toString()}
            type={type}
            value={value}
            searchDate={slide}
            onChange={onChange}
            onMonthChange={(type: "previous" | "next") => {
              if (type === "previous") {
                swiperRef?.current?.swiper.slidePrev();
              } else {
                swiperRef?.current?.swiper.slideNext();
              }
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CalendarPickerSwiper;
