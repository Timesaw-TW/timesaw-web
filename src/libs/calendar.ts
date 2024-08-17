export type CalendarType = "day" | "week" | "month";

export const MONTH_CHINESE = [
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

export const getCalendarText = (type: CalendarType) => {
  if (type === "day") {
    return "日";
  } else if (type === "week") {
    return "週";
  }
  return "月";
};

export const getWeekDays = (startDay: number) => {
  const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];

  if (startDay < 0 || startDay > 6) {
    return [];
  }
  const result = daysOfWeek
    .slice(startDay)
    .concat(daysOfWeek.slice(0, startDay));
  return result;
};
