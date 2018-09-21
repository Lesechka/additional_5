function isOpened(element, bracketsConfig) {
  return bracketsConfig.some(pair => pair[0] === element);
}
function isClosed(element, bracketsConfig) {
  return bracketsConfig.some(pair => pair[1] === element);
}
function getOpposite(element, bracketsConfig) {
  const first = bracketsConfig.find((config) => config[0] === element);
  const second = bracketsConfig.find((config) => config[1] === element);
  return (first && first[1]) || (second && second[0]);
}
module.exports = function check(str, bracketsConfig) {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const bracket = str[i];
    const last = stack[stack.length-1];

    if (!last) {
      stack.push(bracket);
      continue;
    }
    const isClosedBracket = isClosed(bracket, bracketsConfig);
    const isOpenedBracket = isOpened(bracket, bracketsConfig);
    const opposite = getOpposite(bracket, bracketsConfig);

    if (opposite === bracket && last === bracket) {
      stack.pop();
      continue;
    }
    if (isOpenedBracket) {
      stack.push(bracket);
      continue;
    }
    if (isClosedBracket) {
      if (getOpposite(last, bracketsConfig) !== bracket) {
        return false;
      } else {
        stack.pop();
        continue;
      }
  }
}
return stack.length === 0;
}
