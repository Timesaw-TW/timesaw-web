"use client";

import { FC, ReactNode } from "react";
import useUser from "@/hooks/user/useUser";

interface Props {
  mustUser: boolean;
  children: ReactNode;
}

const AuthChecker: FC<Props> = ({ mustUser, children }) => {
  const { user } = useUser();

  const render = mustUser === Boolean(user?.emailVerified);
  return render && <>{children}</>;
};

export default AuthChecker;
