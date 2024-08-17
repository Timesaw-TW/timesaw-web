import { getCalendarText, getWeekDays, MONTH_CHINESE } from "../calendar";

describe("#calendar", () => {
  describe("#calendar > MONTH_CHINESE", () => {
    it("should contain correct Chinese month names", () => {
      const expectedMonths = [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ];
      expect(MONTH_CHINESE).toEqual(expectedMonths);
    });
  });

  describe("#calendar > getCalendarText", () => {
    it("should return correct text for day", () => {
      expect(getCalendarText("day")).toBe("日");
    });

    it("returns correct text for week", () => {
      expect(getCalendarText("week")).toBe("週");
    });

    it("returns correct text for month", () => {
      expect(getCalendarText("month")).toBe("月");
    });
  });

  describe("#calendar >  getWeekDays", () => {
    it("should return correct order of days when startDay is 0 (Sunday)", () => {
      expect(getWeekDays(0)).toEqual([
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
      ]);
    });

    it("should return correct order of days when startDay is 1 (Monday)", () => {
      expect(getWeekDays(1)).toEqual([
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "日",
      ]);
    });
  });
});
