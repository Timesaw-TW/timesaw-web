import { FC } from "react";
import Footnote from "@/stories/Typography/Footnote";

interface Props {
  className?: string;
}

const ContentFooter: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Footnote>登入或註冊即代表同意</Footnote>
      <Footnote className="cursor-pointer text-soda-100 " element="a">
        <u>隱私權政策</u>
      </Footnote>
      <Footnote>和</Footnote>
      <Footnote className="cursor-pointer text-soda-100" element="a">
        <u>使用條款</u>
      </Footnote>
    </div>
  );
};

export default ContentFooter;
