"use client";

import ButtonIcon from "@/stories/ButtonIcon";
import { IconHomeSolid } from "@/stories/Icons";
import Link from "next/link";

const HomeButton = () => {
  return (
    <Link href="/">
      <ButtonIcon className="fixed right-5 top-5 w-24 shadow" label="Home">
        <IconHomeSolid />
      </ButtonIcon>
    </Link>
  );
};

export default HomeButton;
