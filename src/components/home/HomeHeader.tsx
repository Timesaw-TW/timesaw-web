import { FC } from "react";
import { Dayjs } from "dayjs";
import Headline from "@/stories/Typography/Headline";
import Text from "@/stories/Typography/Text";
import Header from "../util/Header";
import HeaderRight from "./HeaderRight";
import { CalendarType, getCalendarText, MONTH_CHINESE } from "@/libs/calendar";

interface Props {
  order: CalendarType[];
  date: Dayjs;
  onChange: () => unknown;
}

const HomeHeader: FC<Props> = ({ date, order, onChange }) => {
  return (
    <Header
      right={
        <HeaderRight>
          {order.length && (
            <button
              className="w-12 rounded-[2.125rem] bg-soda-40 px-2"
              onClick={onChange}
            >
              <Text>{getCalendarText(order[0])}</Text>
            </button>
          )}
        </HeaderRight>
      }
    >
      <div className="flex gap-1">
        <Headline bold>{MONTH_CHINESE[date.month()]}月</Headline>
        <Headline bold className="text-soda-100">
          {date.year()}
        </Headline>
      </div>
    </Header>
  );
};

export default HomeHeader;
