import { merge } from "@/libs/tailwind";
import SubHeadline from "@/stories/Typography/SubHeadline";
import { Dayjs } from "dayjs";
import { FC } from "react";

interface Props {
  value: Dayjs;
  searchDate: Dayjs;
  onChange: (date: Dayjs) => unknown;
  className?: string;
}

const getWeekData = (date: Dayjs) => {
  const result = [];
  let startDate = date;
  for (let i = 0; i < 7; i++) {
    result.push(startDate);
    startDate = startDate.add(1, "day");
  }
  return result;
};

const CalendarPickerWeek: FC<Props> = ({
  value,
  searchDate,
  onChange,
  className,
}) => {
  const weekData = getWeekData(searchDate.startOf("week"));

  return (
    <tr className={merge("flex justify-between py-2", className)}>
      {weekData.map((date) => (
        <td
          className={merge(
            "h-8 w-8 cursor-pointer",
            "flex items-center justify-center",
            date.isSame(value, "date") && "rounded-[50%] bg-soda-80",
            "hover:rounded-[50%] hover:bg-soda-40"
          )}
          key={date.toString()}
          onClick={() => onChange(date)}
        >
          <SubHeadline>{date.date()}</SubHeadline>
        </td>
      ))}
    </tr>
  );
};

export default CalendarPickerWeek;
