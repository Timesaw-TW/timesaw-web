import AuthChecker from "@/components/util/AuthChecker";
import { Landing } from "@/components/util/Landing";
import Home from "./Home";

const HomeChecker = () => {
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
};

export default HomeChecker;
