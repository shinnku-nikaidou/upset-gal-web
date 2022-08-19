import { Item } from "../data/interfaces";

export const searchEngine = (value: string, files: Item[]) => {
  value = value.toLowerCase();
  let arrayFile: Item[] = files;
  let newArrayFile: Array<[Item, number]> = arrayFile.map((v) => [v, 0]);
  for (let x = 0; x < arrayFile.length; x ++) {
    for (let y = 0; y < value.length; y ++) {
      try {
        const name = decodeURIComponent(arrayFile[x].name).toLowerCase();
        if (
          value[y] !== " " &&
          name.substring(0, name.length - 2).includes(value[y])
        ) {
          newArrayFile[x][1] += 1;
        }
      } catch { }
    }
    for (let y = 0; y < value.length - 2; y ++) {
      try {
        let name = decodeURIComponent(arrayFile[x].name).toLowerCase();
        if (name.includes(value.substring(y, y + 2))) {
          newArrayFile[x][1] += 5;
        }
      } catch { }
    }
  }
  newArrayFile.sort((a, b) => b[1] - a[1]);
  return newArrayFile;
};
