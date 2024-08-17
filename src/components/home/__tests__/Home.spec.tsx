import { render } from "@testing-library/react";
import Home from "../Home";

jest.mock("../HomeHeader", () => () => <div data-testid="home-header" />);
jest.mock("../../util/Menu/StaticMenu", () => () => (
  <div data-testid="static-menu" />
));

jest.mock("../../calendar/CalendarPicker/CalendarPickerSwiper", () => () => (
  <div data-testid="calendar-picker-swiper" />
));
jest.mock("@/stories/FAB", () => () => <div data-testid="fab" />);

describe("#Home", () => {
  it("should render Home component correctly", () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId("static-menu")).toBeInTheDocument();
    expect(getByTestId("home-header")).toBeInTheDocument();
    expect(getByTestId("calendar-picker-swiper")).toBeInTheDocument();
    expect(getByTestId("fab")).toBeInTheDocument();
  });
});
