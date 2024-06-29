import AuthChecker from "@/components/util/AuthChecker";
import { Landing } from "@/components/util/Landing";

const HomeContainer = () => {
  return (
    <>
      <AuthChecker mustUser={false}>
        <Landing />
      </AuthChecker>
      <AuthChecker mustUser={true}>Home (logged in)</AuthChecker>
    </>
  );
};

export default HomeContainer;
