import { Item } from '@/types/onedrivelegacy'

export const searchEngine = (value: string, files: Item[]) => {
  value = value.toLowerCase()
  const arrayFile: Item[] = files
  const newArrayFile: Array<[Item, number]> = arrayFile.map((v) => [v, 0])
  for (let x = 0; x < arrayFile.length; x++) {
    for (let y = 0; y < value.length; y++) {
      try {
        const name = decodeURIComponent(arrayFile[x].name).toLowerCase()
        if (
          value[y] !== ' ' &&
          name.substring(0, name.length - 2).includes(value[y])
        ) {
          newArrayFile[x][1] += 1
        }
        // eslint-disable-next-line no-empty
      } catch {}
    }
    for (let y = 0; y < value.length - 2; y++) {
      try {
        const name = decodeURIComponent(arrayFile[x].name).toLowerCase()
        if (name.includes(value.substring(y, y + 2))) {
          newArrayFile[x][1] += 5
        }
        // eslint-disable-next-line no-empty
      } catch {}
    }
  }
  newArrayFile.sort((a, b) => b[1] - a[1])
  return newArrayFile
}
