import { render } from "@testing-library/react";
import AuthChecker from "../AuthChecker";
import useUser from "@/hooks/user/useUser";

const ChildComponent = () => <div>Children Component</div>;

jest.mock("@/hooks/user/useUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("#AuthChecker", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render children when mustUser is true and user emailVerified pass", () => {
    (useUser as unknown as jest.Mock).mockReturnValue({
      user: {
        emailVerified: true,
      },
    });

    const { getByText } = render(
      <AuthChecker mustUser>
        <ChildComponent />
      </AuthChecker>
    );

    expect(getByText("Children Component")).toBeInTheDocument();
  });

  it("should not render children when mustUser is true and user emailVerified not pass", () => {
    (useUser as unknown as jest.Mock).mockReturnValue({
      user: {
        emailVerified: false,
      },
    });

    const { queryByText } = render(
      <AuthChecker mustUser>
        <ChildComponent />
      </AuthChecker>
    );

    expect(queryByText("Children Component")).not.toBeInTheDocument();
  });

  it("should render children when mustUser is false and user not exist", () => {
    (useUser as unknown as jest.Mock).mockReturnValue({
      user: null,
    });

    const { getByText } = render(
      <AuthChecker mustUser={false}>
        <ChildComponent />
      </AuthChecker>
    );

    expect(getByText("Children Component")).toBeInTheDocument();
  });

  it("should not render children when mustUser is false and user exist", () => {
    (useUser as unknown as jest.Mock).mockReturnValue({
      user: {
        emailVerified: true,
      },
    });

    const { queryByText } = render(
      <AuthChecker mustUser={false}>
        <ChildComponent />
      </AuthChecker>
    );

    expect(queryByText("Children Component")).not.toBeInTheDocument();
  });
});
