import { FC, ReactNode } from "react";
import { IconPuzzlePieceOutline } from "@/stories/Icons";

interface Props {
  children: ReactNode;
}

const HeaderRight: FC<Props> = ({ children }) => (
  <div className="flex items-center">
    {children}
    <button type="button" className="p-3">
      <IconPuzzlePieceOutline />
    </button>
  </div>
);

export default HeaderRight;
