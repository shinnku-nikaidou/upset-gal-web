import { create } from 'zustand'

export interface NodeState {
  node: HTMLDivElement | null
  setNode: (newNode: HTMLDivElement) => void
}

const useBackGroundNode = create<NodeState>((set) => ({
  node: null,
  setNode: (newNode: HTMLDivElement) => set({ node: newNode }),
}))

export default useBackGroundNode
