import AuthChecker from "@/components/util/AuthChecker";
import { Landing } from "@/components/util/Landing";
import Home from "@/components/home/Home";

export default function HomePage() {
  return (
    <>
      <AuthChecker mustUser={false}>
        <Landing />
      </AuthChecker>
      <AuthChecker mustUser={true}>
        <Home />
      </AuthChecker>
    </>
  );
}
