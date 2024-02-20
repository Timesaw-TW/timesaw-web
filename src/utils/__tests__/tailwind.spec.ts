import { bindClass } from "../tailwind";

describe("#bindClass", () => {
  it("should return empty string if classNames array is empty", () => {
    const result = bindClass("type", []);
    expect(result).toEqual("");
  });

  it("should prepend type to each className in classNames array and join them with a space", () => {
    const classNames = ["class1", "class2", "class3"];
    const result = bindClass("type", classNames);
    expect(result).toEqual("type:class1 type:class2 type:class3");
  });

  it("should handle single className in classNames array", () => {
    const result = bindClass("type", ["singleClass"]);
    expect(result).toEqual("type:singleClass");
  });

  it("should handle classNames with special characters", () => {
    const classNames = ["class-with-hyphen", "class_with_underscore"];
    const result = bindClass("type", classNames);
    expect(result).toEqual("type:class-with-hyphen type:class_with_underscore");
  });
});
