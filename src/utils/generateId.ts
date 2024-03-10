export const uniqueId = (length: number = 6) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace(".", ""),
    10,
  );
};
