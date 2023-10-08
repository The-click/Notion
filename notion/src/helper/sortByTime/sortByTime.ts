export const sortByTime = (a: number, b: number) => {
    return a > 0 && b > 0 ? a - b : -(a - b);
};
