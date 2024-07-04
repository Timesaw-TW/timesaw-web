"use client";

import useModal from "@/hooks/useModal";
import { Modal } from "../util/Modal";
import { merge } from "@/libs/tailwind";
import { FC } from "react";

const ModalProvider: FC = () => {
  const { modal } = useModal();

  return (
    modal && <Modal {...modal} className={merge("z-[500]", modal.className)} />
  );
};

export default ModalProvider;
