import { onedriveAccounts } from "../../data/consts";

export const getAccount = () => {
  const index = Math.floor(Math.random() * onedriveAccounts.length);
  return onedriveAccounts[index];
};

const randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffleArray = (arr: any[]) => {
  const len = arr.length;

  for (let i = 0; i < len; ++ i) {
    let idx = randInt(i, len - 1);
    if (idx === i) continue;
    const tmp = arr[i];
    arr[i] = arr[idx];
    arr[idx] = tmp;
  }
};
