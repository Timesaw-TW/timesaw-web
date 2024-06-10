"use client";

import ButtonIcon from "@/stories/ButtonIcon";
import { IconHomeSolid } from "@/stories/Icons";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();

  return (
    <ButtonIcon
      className="fixed right-5 top-5 w-24 shadow"
      label="Home"
      onClick={() => router.push("/")}
    >
      <IconHomeSolid />
    </ButtonIcon>
  );
};

export default HomeButton;
