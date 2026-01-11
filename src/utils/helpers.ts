export const createMatrix = <T>(
  height: number,
  width: number,
  initialValue: T
): T[][] => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => initialValue)
  );
};
