import Headline from "@/stories/Typography/Headline";
import Text from "@/stories/Typography/Text";
import Header from "../util/Header";
import HeaderRight from "./HeaderRight";
import { CalendarType } from "../calendar/type";
import { FC } from "react";
import { getCalendarText } from "../calendar";

interface Props {
  order: CalendarType[];
  onChange: () => unknown;
}

const HomeHeader: FC<Props> = ({ order, onChange }) => {
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
        <Headline bold>三月</Headline>
        <Headline bold className="text-soda-100">
          2023
        </Headline>
      </div>
    </Header>
  );
};

export default HomeHeader;
