import { render } from "@testing-library/react";
import ContentFooter from "../ContentFooter";

jest.mock("@/stories/Typography/Footnote", () => ({
  __esModule: true,
  default: jest.fn(({ children, className, element }) => {
    const Element = element || "div";
    return <Element className={className}>{children}</Element>;
  }),
}));

describe("#LoginContentFooter", () => {
  it("should render correctly", () => {
    render(<ContentFooter />);
  });

  it("should apply className prop to the container div", () => {
    const testClassName = "test-class";
    const { getByText } = render(<ContentFooter className={testClassName} />);
    const container = getByText("登入或註冊即代表同意").parentElement;
    expect(container).toHaveClass(testClassName);
  });
});
