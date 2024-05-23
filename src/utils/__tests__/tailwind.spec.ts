import { ClassValue } from "clsx";
import { merge } from "../tailwind";

describe("#merge", () => {
  it("should merge class names correctly", () => {
    const result = merge("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  it("should handle conditional class names", () => {
    const condition = true;
    const result = merge("class1", condition && "class2");
    expect(result).toBe("class1 class2");
  });

  it("should filter out falsy values", () => {
    const result = merge("class1", false, null, undefined, 0, "", "class2");
    expect(result).toBe("class1 class2");
  });

  it("should handle array of class names", () => {
    const result = merge(["class1", "class2"], "class3");
    expect(result).toBe("class1 class2 class3");
  });

  it("should handle nested arrays of class names", () => {
    const result = merge(["class1", ["class2", "class3"]], "class4");
    expect(result).toBe("class1 class2 class3 class4");
  });

  it("should handle tailwind-merge functionality", () => {
    const result = merge("p-4", "p-2");
    expect(result).toBe("p-2");
  });

  it("should handle empty input", () => {
    const result = merge();
    expect(result).toBe("");
  });

  it("should handle non-string inputs gracefully", () => {
    const result = merge("class1", 123 as unknown as ClassValue, "class2");
    expect(result).toBe("class1 123 class2");
  });
});
