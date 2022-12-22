type CheckBrackets = (str: string) => boolean;

const OPEN_BRACKETS = ["(", "[", "{"];

export const checkBrackets: CheckBrackets = (str) => {
  const stack: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const lastElementInStack = stack[stack.length - 1];

    if (OPEN_BRACKETS.includes(str[i])) {
      stack.push(str[i]);
    } else if (
      (lastElementInStack === "(" && str[i] === ")") ||
      (lastElementInStack === "[" && str[i] === "]") ||
      (lastElementInStack === "{" && str[i] === "}")
    ) {
      stack.pop();
    }
  }

  return !stack.length;
};
