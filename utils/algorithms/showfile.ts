import { FrontItem } from '@/types'
import { OnedriveItemChildren } from '@/types/onedrive'

export const sizeUnit = [
  ['B', Math.pow(2, 0)],
  ['KB', Math.pow(2, 10)],
  ['MB', Math.pow(2, 20)],
  ['GB', Math.pow(2, 30)],
  ['TB', Math.pow(2, 40)],
  ['PB', Math.pow(2, 50)],
  ['EB', Math.pow(2, 60)],
  ['ZB', Math.pow(2, 70)],
  ['YB', Math.pow(2, 80)],
]

export function num2size(num: number): string {
  if (num === 0) return '0'
  let size = num
  let i = 0
  for (; i < sizeUnit.length; ++i) {
    const t = num / (sizeUnit[i][1] as number)
    if (t > 1) size = t
    else break
  }
  return `${size.toFixed(2)} ${sizeUnit[i - 1][0]}`
}

export function showfiles(childs: OnedriveItemChildren) {
  const frontItems: Array<FrontItem> = []
  childs.value.forEach((child) =>
    frontItems.push({
      '@type': child.hasOwnProperty('folder') ? 'folder' : 'file',
      date: child.lastModifiedDateTime,
      name: child.name,
      size: num2size(child.size),
    }),
  )
  return frontItems
}
