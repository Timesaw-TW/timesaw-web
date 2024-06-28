"use client";

import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useJWT from "@/hooks/useJWT";
import useUser from "@/hooks/user/useUser";
import LoginPanel from "@/components/auth/login/LoginPanel";
import Button from "@/stories/Button";
import Headline from "@/stories/Typography/Headline";
import Text from "@/stories/Typography/Text";
import { User } from "@/gql-requests/user/user";
import useLogin from "@/hooks/user/useLogin";

const UserInfo = () => {
  const { token } = useJWT();
  const { user } = useUser();
  const { logout } = useLogin();
  const [copying, setCopying] = useState<boolean>(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (copying) {
      timeout = setTimeout(() => {
        setCopying(false);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [copying, setCopying]);

  if (!token || !user) {
    return <LoginPanel />;
  }

  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-2">
        <Headline bold>User Info</Headline>
        {Object.keys(user).map((key) => {
          return (
            <Text key={key}>
              {key}: {user[key as keyof User]}
            </Text>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <CopyToClipboard text={token}>
          <Button
            className="h-[3rem] w-[8rem]"
            onClick={() => setCopying(true)}
          >
            {copying ? "Copy!" : "Copy JWT"}
          </Button>
        </CopyToClipboard>
        <Button className="h-[3rem] w-[8rem] bg-red-400" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
