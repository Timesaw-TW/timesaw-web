import ThemeToggle from "@/components/util/ThemeToggle";
import Text from "@/stories/Typography/Text";
import Title from "@/stories/Typography/Title";
import { merge } from "@/libs/tailwind";
import {
  ClientSideHealthCheck,
  ServerSideHealthCheck,
} from "@/components/util/HealthCheck";
import HomeButton from "./HomeButton";

export const dynamic = "force-dynamic";

export default function System() {
  return (
    <>
      <div>
        <Title bold className="m-5 text-center" element="div">
          System Testing
        </Title>
      </div>
      <div
        className={merge(
          "m-5 rounded-md p-5",
          "border-[2px] border-soda-100",
          "flex flex-col gap-5"
        )}
      >
        <ServerSideHealthCheck />
        <ClientSideHealthCheck />
      </div>
      <div
        className={merge("m-5 rounded-md p-5", "border-[2px] border-soda-100")}
      >
        <div className={merge("flex gap-3")}>
          <Text>Current Theme:</Text>
          <ThemeToggle className="rounded-md border border-secondary px-1" />
        </div>
      </div>

      <HomeButton />
    </>
  );
}
