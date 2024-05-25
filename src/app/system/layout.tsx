import ServerHealth from "@/components/util/ServerHealth";
import { merge } from "@/utils/tailwind";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div className={merge("h-[50px] w-[200px]", "fixed bottom-10 right-10")}>
        <ServerHealth />
      </div>
    </>
  );
}
