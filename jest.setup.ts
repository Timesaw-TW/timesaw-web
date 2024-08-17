import { ReactNode } from "react";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: ReactNode }) => children,
  SwiperSlide: ({ children }: { children: ReactNode }) => children,
}));

jest.mock("swiper/css", () => jest.fn());
jest.mock("swiper/css/navigation", () => jest.fn());
jest.mock("swiper/modules", () => jest.fn());
