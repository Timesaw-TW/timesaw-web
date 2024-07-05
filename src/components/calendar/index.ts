import { CalendarType } from "./type";

export const getCalendarText = (type: CalendarType) => {
  if (type === "day") {
    return "日";
  } else if (type === "week") {
    return "週";
  }
  return "月";
};
