import { mobgurl, pcbgurl } from '@const'
import { create } from 'zustand'
import { getFile } from './blob'

export interface NodeState {
  node: HTMLDivElement | null
  setNode: (newNode: HTMLDivElement | null) => void
}

const useBackGroundNode = create<NodeState>((set) => ({
  node: null,
  setNode: (newNode) => set({ node: newNode }),
}))

export default useBackGroundNode

export function setBackgroundImage(
  url: string,
  isMobile: boolean,
  node: HTMLDivElement | null,
) {
  if (node === null) {
    console.error('node is null')
  } else if (url === '') {
    console.log('close BackgroundImage')
    node.style.backgroundImage = 'none'
  } else if (url === 'default') {
    if (isMobile) {
      node.style.backgroundImage = `url(${mobgurl})`
    } else {
      node.style.backgroundImage = `url(${pcbgurl})`
    }
  } else if (url === 'local') {
    getFile('backgroundimage').then((res) => {
      const url = res?.url
      if (url) {
        node.style.backgroundImage = `url(${url})`
      } else {
        console.error('local blob has no background image')
      }
    })
  } else {
    node.style.backgroundImage = `url(${url})`
  }
}
