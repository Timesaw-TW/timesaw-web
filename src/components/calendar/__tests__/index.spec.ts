import { getCalendarText } from "..";

describe("#calendar > index > getCalendarText", () => {
  it("should return correct text", () => {
    expect(getCalendarText("day")).toEqual("日");
    expect(getCalendarText("week")).toEqual("週");
    expect(getCalendarText("month")).toEqual("月");
  });
});
