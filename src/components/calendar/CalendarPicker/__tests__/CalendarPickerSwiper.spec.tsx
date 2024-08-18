import { render } from "@testing-library/react";
import dayjs from "dayjs";
import CalendarPickerSwiper from "../CalendarPickerSwiper";

jest.mock("swiper/react", () => ({
  Swiper: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SwiperSlide: ({ children }: any) => <div>{children}</div>,
}));

jest.mock(
  "../CalendarPickerPanel",
  () =>
    ({ type, value, searchDate, onChange }: any) => (
      <div>
        <span>{`Panel for ${searchDate.format("YYYY-MM-DD")}`}</span>
      </div>
    )
);

describe("#CalendarPickerSwiper", () => {
  const mockOnChange = jest.fn();
  const slides = [
    dayjs("2024-08-01"),
    dayjs("2024-09-01"),
    dayjs("2024-10-01"),
  ];
  const value = dayjs("2024-08-15");

  it("should render correct number of slides", () => {
    const { getByText } = render(
      <CalendarPickerSwiper
        type="month"
        value={value}
        slides={slides}
        onChange={mockOnChange}
      />
    );

    expect(getByText("Panel for 2024-08-01")).toBeInTheDocument();
    expect(getByText("Panel for 2024-09-01")).toBeInTheDocument();
    expect(getByText("Panel for 2024-10-01")).toBeInTheDocument();
  });
});
