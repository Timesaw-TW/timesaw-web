export const bindClass = (type: string, classNames: string[]): string => {
  return classNames.length
    ? classNames.map((className) => `${type}:${className}`).join(" ")
    : "";
};
